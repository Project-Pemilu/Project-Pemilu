import { createBrowserRouter, Outlet, redirect, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import VotePage from './pages/VotePage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
    loader: () => {
      if (localStorage.getItem('user_id')) {
        return redirect('/');
      }
      return null;
    },
  },
  {
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    loader: () => {
      if (!localStorage.getItem('user_id')) {
        return redirect('/login');
      }
      return null;
    },
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/vote',
        element: <VotePage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
