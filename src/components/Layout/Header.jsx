import React from "react";
import styles from "../../Style/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Admin User</span>
            <div className={styles.avatar}>AU</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
