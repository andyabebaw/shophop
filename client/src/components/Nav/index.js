import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/context/authContext";
import "./nav.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  return (
    <nav>
      <div className="nav-container">
        <ul className="nav-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li></li>
          {user ? (
            <>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login / Signup</Link>
              </li>
            </>
          )}
          <li className="search-container">
            <input type="text" placeholder="Search..." />
          </li>
          {user?.data.isAdmin && (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          )}
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
