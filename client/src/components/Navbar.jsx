import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Navbar() {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const handleLogout = () => {
    // localStorage.removeItem("user");
    localStorage.removeItem('user_id');
    navigate('/login');
  };
  return (
    <nav
      className="border-2 shadow-lg"
      style={{
        backgroundColor: theme.data[theme.currentTheme].cardBox,
        border: theme.data[theme.currentTheme].buttonBorder,
      }}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex" style={{ color: theme.data[theme.currentTheme].cardText }}>
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="vote.png" className="h-8" alt="Hacktiv-pemilu" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">Hacktiv Pemilu</span>
          </Link>
          <Link to={'/vote'} className="self-center text-2xl mx-5 font-semibold whitespace-nowrap">
            Vote
          </Link>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-4">
          <select
            style={{
              backgroundColor: theme.data[theme.currentTheme].backgroundColor,
              color: theme.data[theme.currentTheme].fontColor,
            }}
            value={theme.currentTheme}
            onChange={(e) => theme.setCurrentTheme(e.target.value)}
            className="font-medium rounded-lg text-sm px-4 py-2"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <button type="button" onClick={handleLogout} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
