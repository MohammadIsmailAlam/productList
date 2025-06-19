import React from "react";
import { NavLink } from "react-router-dom";
import { FiPackage, FiLogOut, FiMenu } from "react-icons/fi";
import styles from "../../Style/Sidebar.module.css";

const Sidebar = ({ collapsed, toggleCollapse }) => {
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/login";
  };

  console.log(collapsed);

  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <div className={styles.brand}>
        {!collapsed && <h2>Admin Panel</h2>}
        <button onClick={toggleCollapse} className={styles.toggleButton}>
          <FiMenu />
        </button>
      </div>

      <nav className={styles.nav}>
        <NavLink
          to="/dashboard/products"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <FiPackage className={styles.navIcon} />
          {!collapsed && <span className={styles.navText}>Products</span>}
        </NavLink>
      </nav>

      <div className={styles.footer}>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <FiLogOut className={styles.logoutIcon} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
