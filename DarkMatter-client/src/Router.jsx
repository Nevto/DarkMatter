import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './pages/Layout';
import Home from './pages/Home';
import { Transactions } from './pages/Transaction';
import { GetDarkMatterBlocks } from './pages/Blocks';
import { AboutUsHandler } from './pages/AboutUs';


export const darkMatterRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'transaction',
                element: <Transactions />
            },

            {
                path: 'blocks',
                element: <GetDarkMatterBlocks />
            },
            {
                path: 'aboutus',
                element: <AboutUsHandler />
            }
        ]
    }
]);
