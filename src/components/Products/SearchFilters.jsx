import React, { useState, useEffect, useRef } from "react";
import { FaFileExport, FaFilePdf, FaFileExcel } from "react-icons/fa";
import styles from "../../Style/SearchFilters.module.css";
import { exportToExcel, exportToPDF } from "../../services/exportService";

const SearchFilters = ({ onFilterChange, products }) => {
  const [searchKey, setSearchKey] = useState("");
  const [category, setCategory] = useState("");
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowExportDropdown(false);
      }
    };

    if (showExportDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showExportDropdown]);

  const handleSearchChange = (e) => {
    setSearchKey(e.target.value);
    onFilterChange({ searchKey: e.target.value, category });
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    onFilterChange({ searchKey, category: e.target.value });
  };

  const toggleExportDropdown = (e) => {
    e.stopPropagation();
    setShowExportDropdown(!showExportDropdown);
  };

  return (
    <div className={styles.actionBar}>
      <div className={styles.searchGroup}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchKey}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.filterGroup}>
        <select
          value={category}
          onChange={handleCategoryChange}
          className={styles.filterSelect}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Jewellery">Jewellery</option>
        </select>
      </div>

      <div className={styles.exportGroup} ref={dropdownRef}>
        <button className={styles.exportToggle} onClick={toggleExportDropdown}>
          <FaFileExport /> Export
        </button>
        {showExportDropdown && (
          <div className={styles.exportDropdown}>
            <button
              className={`${styles.exportOption} ${styles.pdfOption}`}
              onClick={() => {
                exportToPDF(products);
                setShowExportDropdown(false);
              }}
            >
              <FaFilePdf /> PDF
            </button>
            <button
              className={`${styles.exportOption} ${styles.excelOption}`}
              onClick={() => {
                exportToExcel(products);
                setShowExportDropdown(false);
              }}
            >
              <FaFileExcel /> Excel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
