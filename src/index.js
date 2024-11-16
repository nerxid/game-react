import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './UserContext'; 
import Normal from './component/Normal/Normal';
import Easy from './component/Easy/Easy';
import Hard from './component/Hard/Hard';
import HighScoresTable  from './component/HighScoresTable';
import 'bootstrap/dist/css/bootstrap.min.css';


import Menu from './component/Menu/Menu';
import App from './component/App';
import Signup from './component/Signup';
import reportWebVitals from './reportWebVitals';
import Home from './component/Home/Home';
import Admin from './component/Admin/Admin';

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/Signup", element: <Signup /> },
  { path: "/Menu", element: <Menu /> },
  { path: "/Easy", element: <Easy /> },
  { path: "/Hard", element: <Hard /> },
  { path: "/HighScoresTable", element: <HighScoresTable /> },
  { path: "/Home", element: <Home /> },
  { path: "/Admin", element: <Admin /> },

  { path: "/Normal", element: <Normal /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);

reportWebVitals();
