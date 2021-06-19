import React,{useState,useEffect} from 'react';
import {Search as SearchSUI,Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {size} from 'lodash';
import useAuth from '../../../hooks/useAuth';
import {useQuery} from '@apollo/client';
import {SEARCH} from '../../../gql/user';
import ImageNoFound from '../../../assets/png/avatar.png';
import './Search.scss';

export default function Search() {
    const [search, setSearch] = useState('');
    const [result, setresult] = useState('')
    const {data,loading} = useQuery(SEARCH,{
        variables: {search}
    });
    useEffect(()=>{
        if(size(data?.search) > 0){
            const users = [];
            data.search.forEach((user,index) => {
                users.push({
                    key: index,
                    title: user.name,
                    username: user.username,
                    avatar: user.avatar
                });
            });
            setresult(users);
        }else{
            setresult([]);
        }
    },[data]); //Se ejecuta cada que data actualiza su valor

    const onChange = (e) => {
        if(e.target.value) setSearch(e.target.value);
        else setSearch(undefined);
    }

    const handleResultSelect = () => {
        setSearch(null);
        setresult([]);
    }
    return (
        <SearchSUI 
            className="search-users" 
            fluid
            loading={loading}
            value={search ? search : ''}
            input={{ icon: "search", iconPosition: "left"}}
            placeholder="Buscador..."
            onSearchChange={onChange}
            results={result ? result : []}
            resultRenderer={(e) => <ResultSearch data={e} />}
            onResultSelect={handleResultSelect}
        />

    );
}

function ResultSearch(props){
    const {data} = props;
    for(let i = 0; i<data.length;i++){
        if(useAuth.username === data[i].username) delete data[i]
    }
    return (
        <Link className="search-users__item" to={`/${data.username}`}>
            <Image src={data.avatar ? data.avatar : ImageNoFound} />
            <div className="direction">
                <p>{data.title}</p>
                <p>{data.username}</p>
            </div>
        </Link>
    );
}
