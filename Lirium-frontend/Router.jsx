import { createBrowserRouter } from 'react-router-dom';
import { NotFound } from './src/components/Notfound';
import { Homepage } from './src/components/Homepage';
import RetrieveLiriumBlocks from './src/components/getLiriumBlocks';
import { Layout } from './src/components/Layout';
import SendTransaction  from './src/components/SendTransaction';

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
        element: <RetrieveLiriumBlocks />,
      },
      {
        path: '/sendtransaction',
        element: <SendTransaction />,
      },
    ],
  },
]);
