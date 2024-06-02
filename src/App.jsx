import React from 'react';
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import UserSkills from './components/UserSkills';
import { UserProvider } from './context/UserProvider';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/user-skills",
    element: <UserSkills />,
  },
  {
    path: "/",
    element: <Login />
  }
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App;
