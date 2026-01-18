import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

function Navbar() {
  let {userLogin, setUserLogin} = useContext(UserContext)
  let {cart} = useContext(CartContext)
  const [open, setOpen] = useState(false);

  const navigate = useNavigate()
  function logOut() {
    localStorage.removeItem('userToken');
    setUserLogin(null);
    navigate('/login')
  }
  return (
    <>
      <nav className="bg-gray-200">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/src/assets/logo.png"
              alt="Logo"
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-6">
            {userLogin && (
              <>
                <NavLink className="nav-link px-4 py-2 rounded" to="/">Home</NavLink>
                <NavLink className="nav-link px-4 py-2 rounded" to="/products">Products</NavLink>
                <NavLink className="nav-link px-4 py-2 rounded" to="/brands">Brands</NavLink>
                <NavLink className="nav-link px-4 py-2 rounded" to="/cart">Cart</NavLink>
              </>
            )}
          </div>

          {/* Desktop Right */}
          <div className="hidden sm:flex items-center gap-4">
            {userLogin ? (
              <button
                onClick={logOut}
                className="text-gray-600 hover:text-white cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink className="nav-link" to="/login">Login</NavLink>
                <NavLink className="nav-link" to="/register">Register</NavLink>
              </>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative text-white">
              <i className="fa-solid fa-basket-shopping text-xl"></i>
              {cart?.numOfCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.numOfCartItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden text-gray-300 hover:text-white cursor-pointer"
          >
            <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars"} text-gray-500 text-2xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="sm:hidden bg-gray-200 px-4 py-3 space-y-3 flex flex-col">
          {userLogin && (
            <>
              <NavLink onClick={() => setOpen(false)} className="mobile-link w-fit px-2 py-1 rounded" to="/">Home</NavLink>
              <NavLink onClick={() => setOpen(false)} className="mobile-link w-fit px-2 py-1 rounded" to="/products">Products</NavLink>
              <NavLink onClick={() => setOpen(false)} className="mobile-link w-fit px-2 py-1 rounded" to="/brands">Brands</NavLink>
              <NavLink onClick={() => setOpen(false)} className="mobile-link w-fit px-2 py-1 rounded" to="/cart">Cart</NavLink>
            </>
          )}

          <hr className="border-gray-600" />

          {userLogin ? (
            <button
              onClick={() => {
                logOut();
                setOpen(false);
              }}
              className="mobile-link text-left"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink onClick={() => setOpen(false)} className="mobile-link" to="/login">Login</NavLink>
              <NavLink onClick={() => setOpen(false)} className="mobile-link" to="/register">Register</NavLink>
            </>
          )}
        </div>
      )}
    </nav>
    </>
  );
}

export default Navbar;
