import React from "react";
import styles from "../../Style/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          © {new Date().getFullYear()} Admin Panel. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
