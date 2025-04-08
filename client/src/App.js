import './App.css';
import User from './getUser/User';
import AddUser from './addUser/AddUser';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Update from './updateUser/Update';
import Title from './titlePage/Title';
import Signin from './Signin';
import Signup from './Signup';
import {AuthContextProvider} from "./AuthContext.jsx"
import PrivateRoute from './PrivateRoute.jsx';

function App() {
  const route = createBrowserRouter([
    {
      path:"/",
      element:<Signup/>,
    },
    {
      path:"/dashboard",
      element:<PrivateRoute><User/></PrivateRoute>,
    },
    {
      path:"/signup",
      element:<Signup/>,
    },
    {
      path:"/signin",
      element:<Signin/>,
    },
    {
      path:"/add",
      element:<AddUser/>,
    },
    {
      path:"/update/:id",
      element:<Update/>,
    },
  ]);
  return (
    <div className="App">
      <Title mainTitle="MindLog" subTitle="Track your mood daily and see your journey!" />
      <AuthContextProvider>
        <RouterProvider router={route}></RouterProvider>
      </AuthContextProvider>
      
    </div>
  );
}

export default App;
