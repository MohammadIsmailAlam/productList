import React, { useEffect } from "react";
import styles from "../../Style/ProductForm.module.css";

const ProductForm = ({ product, onCreate, onUpdate, onClose }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    price: 0,
    category: "Electronics",
    isTaxable: "yes",
    isActive: true,
  });

  const categories = ["Electronics", "Clothing", "Jewellery"];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        category: product.category || "Electronics",
        isTaxable: product.isTaxable ? "yes" : "no",
        isActive: product.isActive !== false,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        category: "Electronics",
        isTaxable: "yes",
        isActive: true,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert form data to proper types
    const submissionData = {
      ...formData,
      price: parseFloat(formData.price),
      isTaxable: formData.isTaxable === "yes",
    };

    if (product) {
      // Update existing product
      onUpdate({ ...submissionData, id: product.id });
    } else {
      // Create new product
      onCreate(submissionData);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Edit Product</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.textarea}
                rows="3"
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Price
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={styles.input}
                min="0"
                step="0.01"
                required
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Category
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={styles.select}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={styles.formGroup}>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Taxable</legend>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="isTaxable"
                    value="yes"
                    checked={formData.isTaxable === "yes"}
                    onChange={handleChange}
                    className={styles.radio}
                  />
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="isTaxable"
                    value="no"
                    checked={formData.isTaxable === "no"}
                    onChange={handleChange}
                    className={styles.radio}
                  />
                  No
                </label>
              </div>
            </fieldset>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className={styles.checkbox}
              />
              Active Product
            </label>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
