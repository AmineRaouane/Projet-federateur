import "./Header.css";
import { FaBars } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ACCESS_TOKEN } from "../../../constants";

const Header = () => {
  const [navActive, setNavActive] = useState(false); //? State to toggle the navbar/sidebar
  const [isAuthorized, setIsAuthorized] = useState(null); //? State to check if the user is authorized
  const navigate = useNavigate();

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => { //? Check if the user is authorized
    const checkAuth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      setIsAuthorized(!!token); //? Set authorization based on the presence of a token
    };
    checkAuth();
    //? Add event listener to update auth status when localStorage changes
    const handleStorageChange = () => checkAuth(); //? Check auth status when localStorage changes
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange); //? Remove event listener when component unmounts to prevent memory leaks and bugs
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setIsAuthorized(false);
    navigate("/login"); // Redirect to login page after logout
    
    // Notify that the user has logged out
    window.dispatchEvent(new Event('storage'));
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>; // Show loading state while checking auth status
  }

  return (
    <header className="header center">
      <div className="container around">
        {/* Button to toggle the navbar/sidebar */}
        <div className="menubar" onClick={toggleNav}>
          <FaBars />
        </div>
        {/* Brand/logo */}
        <div className="brand">
          <NavLink to="/">
            <h1 className="text-3xl uppercase px-8 py-4 font-bold text-center">
              Flex Gym
            </h1>
          </NavLink>
        </div>
        {/* Navigation */}
        <nav className={`navbar center ${navActive ? "nav-active" : ""}`}>
          <div className="container center">
            <ul className="navlist center">
              {/* Navigation links */}
              <li
                className="list-item"
                onClick={() => {
                  setNavActive(false);
                  scrollToTop();
                }}
              >
                <NavLink to="/" className="navlink p-2 mx-2">
                  Home
                </NavLink>
              </li>
              
              <li
                className="list-item"
                onClick={() => {
                  setNavActive(false);
                  scrollToTop();
                }}
              >
                <NavLink to="/classes" className="navlink p-2 mx-2">
                  Partners
                </NavLink>
              </li>
              <li
                className="list-item"
                onClick={() => {
                  setNavActive(false);
                  scrollToTop();
                }}
              >
                <NavLink to="/TopProducts" className="navlink p-2 mx-2">
                  Products
                </NavLink>
              </li>
              <li
                className="list-item"
                onClick={() => {
                  setNavActive(false);
                  scrollToTop();
                }}
              >
                <NavLink to="/about" className="navlink p-2 mx-2">
                  About
                </NavLink>
              </li>
              <li
                className="list-item"
                onClick={() => {
                  setNavActive(false);
                  scrollToTop();
                }}
              >
                <NavLink to="/contact" className="navlink p-2 mx-2">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        {/* Button for joining */}
        <div className="header-btn">
          {isAuthorized ? (
            <button
              className="joinus-btn uppercase px-8 py-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login">
              <button
                className="joinus-btn uppercase px-8 py-4 rounded"
                onClick={scrollToTop}
              >
                Login
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
