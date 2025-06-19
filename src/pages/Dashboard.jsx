import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "../Style/Dashboard.module.css";
import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/SideBar";
import Footer from "../components/Layout/Footer";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar collapsed={sidebarCollapsed} toggleCollapse={toggleSidebar} />
      <div
        className={`${styles.mainContent} ${
          sidebarCollapsed ? styles.collapsed : ""
        }`}
      >
        <Header />
        <div className={styles.contentArea}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
