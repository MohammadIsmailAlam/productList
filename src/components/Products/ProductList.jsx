import React, { useState } from "react";
import styles from "../../Style/Products.module.css";
import ConfirmationModal from "./../Layout/ConfirmationModal";
import Pagination from "../Pagination";

const ProductList = ({
  products,
  pagination,
  onPageChange,
  onEdit,
  onDelete,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // const totalPages = Math.ceil(pagination.total / pagination.limit);

  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(productToDelete);
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handlePaginationChange = (newMeta) => {
    onPageChange(newMeta.page);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.cardGrid}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.cardHeader}>
                <h3>{product.name}</h3>
                <div className={styles.cardActions}>
                  <button
                    onClick={() => onEdit(product)}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product.id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className={styles.cardBody}>
                <p className={styles.cardDescription}>{product.description}</p>

                <div className={styles.cardDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Price:</span>
                    <span>${product.price.toFixed(2)}</span>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Category:</span>
                    <span>{product.category}</span>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Taxable:</span>
                    <span>{product.isTaxable ? "Yes" : "No"}</span>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Active:</span>
                    <span>{product.isActive ? "Yes" : "No"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className={styles.tableWrapper}>
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Taxable</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.category}</td>
                <td>{product.isTaxable ? "Yes" : "No"}</td>
                <td>{product.isActive ? "Yes" : "No"}</td>
                <td className={styles.actionCell}>
                  <button
                    onClick={() => onEdit(product)}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product.id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      {pagination.total > 0 && (
        <Pagination
          meta={{
            page: pagination.page,
            limit: pagination.limit,
            totalPageCount: Math.ceil(pagination.total / pagination.limit),
            totalRecords: pagination.total,
          }}
          onPageChanged={handlePaginationChange}
        />
      )}

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this product?"
      />
    </div>
  );
};

export default ProductList;
