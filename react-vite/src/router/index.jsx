import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from '../components/Splash/Splash';
import Layout from './Layout';
import ItemPage from '../components/ItemPage/ItemPage'
import AllItems from '../components/AllItems/AllItems';
import CreateItem from '../components/CreateItem/CreateItem';
import EditItem from '../components/EditItem/EditItem';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },{
        path:'items/:itemId',
        element: < ItemPage/>
      },{
        path:'all-items',
        element: <AllItems/>
      }, {
        path:'create-item',
        element:< CreateItem/>
      }, {
        path:'items/:itemId/edit',
        element: < EditItem/>
      }
    ],
  },
]);
