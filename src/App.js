import React, {useState, useEffect, useMemo} from 'react';
import {ApolloProvider} from '@apollo/client';
import {ToastContainer} from 'react-toastify';
import client from './config/apollo';
import Auth from './pages/Auth';
import Navigation from './routes/Navigation';
import AuthContext from './context/AuthContext';
import { getToken,removeToken,decodeToken } from './utils/token';

export default function App() {
  const [auth, setAuth] = useState(undefined);
  //Se ejecuta este método cada vez que el componente se renderiza
  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth(decodeToken(token));
    } else {
      setAuth(null);
    }
  }, []);

  const logout = () => {
    removeToken();
    setAuth(null);
  };

  const setUser = (user) => {
    setAuth(user);
  };
  /*
    Una función que guarda datos o funciones la primera vez y cada vez que se renderiza la variable
    compara los datos nuevos con los actuales, si hay cambios se actualiza la función y se renderiza el
    componente, si no, no se renderiza el componente y no se actualizan los valores de la función
  */
  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        {!auth ? <Auth /> : <Navigation />}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}
