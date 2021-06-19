//Load pages 
import Home from '../pages/Home';
import User from '../pages/User';
import Error404 from '../pages/Error404';
//Layouts
import LayoutMenu from '../layouts/LayoutMenu';

const routes = [
    {
        path: '/', 
        layout: LayoutMenu,
        component: Home,
        exact: true
    },
    {
        path: '/:username',
        layout: LayoutMenu,
        component: User,
        exact: true
    },
    {
        layout: LayoutMenu,
        component: Error404
    }
];

export default routes;