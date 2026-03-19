import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();

  //  show navbar ONLY on login & register
  if (pathname !== "/login" && pathname !== "/register") {
    return null;
  }

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 px-6 py-4 flex justify-end">
      <div className="space-x-6 text-slate-200">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
