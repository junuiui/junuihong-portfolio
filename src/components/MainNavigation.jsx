import { NavLink } from "react-router-dom";

function MainNavigation() {
  return (
    <header className="bg-primary text-main">

      <nav className="flex justify-between mx-20 items-center px-6 py-3 border-b border-white/10">

        {/* Name (left) */}
        <div className="text-xl font-bold">
          Junui Hong
        </div>

        {/* Center */}
        {/* <div>

        </div> */}

        {/* Links (right) */}
        <ul className="flex space-x-6 relative">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `relative transition-all font-semibold text-main 
                                hover:text-[#e5ff00] ${isActive ? "after:block after:h-1 after:w-full after:bg-main after:absolute after:-bottom-2" : ""
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/aboutme"
              className={({ isActive }) =>
                `relative transition-all font-semibold text-main 
                                hover:text-[#e5ff00] ${isActive ? "after:block after:h-1 after:w-full after:bg-main after:absolute after:-bottom-2" : ""
                }`
              }
            >
              About Me
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `relative transition-all font-semibold text-main 
                                hover:text-[#e5ff00] ${isActive ? "after:block after:h-1 after:w-full after:bg-main after:absolute after:-bottom-2" : ""
                }`
              }
            >
              Contact
            </NavLink>
          </li>
          {/* <li>
                        <NavLink
                            to="/external"
                            className={ ({ isActive }) =>
                                `relative transition-all font-semibold text-[#ffffff] 
                                hover:text-[#e5ff00] ${isActive ? "after:block after:h-1 after:w-full after:bg-[#ffffff] after:absolute after:-bottom-2" : ""
                                }`
                            }
                        >
                            External
                        </NavLink>
                    </li> */}
        </ul>

      </nav>
    </header>
  );
}

export default MainNavigation;
