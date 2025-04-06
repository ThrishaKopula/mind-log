import './App.css';
import User from './getUser/User';
import AddUser from './addUser/AddUser';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Update from './updateUser/Update';
import Title from './titlePage/Title';

function App() {
  const route = createBrowserRouter([
    {
      path:"/",
      element:<User/>,
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
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
