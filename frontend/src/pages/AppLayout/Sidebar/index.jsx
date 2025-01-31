import { useState } from "react";
import { NavLink } from "react-router";
import { TbSmartHome } from "react-icons/tb";
import { HiOutlineLink } from "react-icons/hi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { IoMenu, IoClose } from "react-icons/io5";

import { useApp } from "./../../../contexts/AppContext";
import styles from "./Sidebar.module.css";

function Sidebar() {
  const { isMobile } = useApp();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavClick = () => {
    if (isMobile) setIsNavOpen((is) => !is);
  };

  return (
    <aside className={`${styles.sidebar} ${isNavOpen && styles.navOpen}`}>
      {isMobile && (
        <button
          className={styles.mobileMenu}
          onClick={() => setIsNavOpen((is) => !is)}
          aria-label={isNavOpen ? "Close menu" : "Open menu"}
        >
          {isNavOpen ? <IoClose size="2rem" /> : <IoMenu size="2rem" />}
        </button>
      )}

      <nav className={styles.mainNav}>
        <img src="/logo.png" alt="Cuvette Logo" className={styles.logo} />

        <ul className={styles.nav}>
          <li>
            <NavLink
              to="/app/dashboard"
              className={styles.navItem}
              onClick={handleNavClick}
            >
              <TbSmartHome size="2rem" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/links"
              className={styles.navItem}
              onClick={handleNavClick}
            >
              <HiOutlineLink size="2rem" />
              <span>Links</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/analytics"
              className={styles.navItem}
              onClick={handleNavClick}
            >
              <FaArrowTrendUp size="2rem" />
              <span>Analytics</span>
            </NavLink>
          </li>
        </ul>

        <ul className={`${styles.nav} ${styles.bottomNav}`}>
          <li>
            <NavLink
              to="/app/settings"
              className={styles.navItem}
              onClick={handleNavClick}
            >
              <FiSettings size="2rem" />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
