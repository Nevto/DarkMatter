import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './pages/Layout';
import Home from './pages/Home';


export const darkMatterRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            // {
            //     path: 'transaction',
            //     element: <Transaction />
            // },
            // {
            //     path: 'register',
            //     element: <Register />
            // },
            // {
            //     path: 'blocks',
            //     element: <GetDarkMatter />
            // }
        ]
    }
]);
