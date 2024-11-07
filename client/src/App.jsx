import { createBrowserRouter, Outlet, redirect, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import VotePage from './pages/VotePage';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

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
      <div style={{ minHeight: '100vh' }}>
        <Navbar />
        <Outlet />
      </div>
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
    <div style={{ minHeight: '100vh' }}>
      <LanguageProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </LanguageProvider>
    </div>
  );
}

export default App;
