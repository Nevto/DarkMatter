import { createBrowserRouter } from 'react-router-dom';
import { NotFound } from './src/components/Notfound';
import { Homepage } from './src/components/Homepage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: '/transactions',
        element: <Transactions />,
      },
      {
        path: '/mine',
        element: <Contact />,
      },
    ],
  },
]);
