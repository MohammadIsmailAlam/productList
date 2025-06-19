import React, { useState, useEffect } from "react";
import ProductList from "../components/Products/ProductList";
import ProductForm from "../components/Products/ProductForm";
import SearchFilters from "../components/Products/SearchFilters";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/api";
import styles from "../Style/ProductPage.module.css"; // Import the styles
import { FaPlus } from "react-icons/fa"; // Import plus icon

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({ searchKey: "", category: "" });
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const loadProducts = React.useCallback(async () => {
    const response = await fetchProducts({
      meta: { page: pagination.page, limit: pagination.limit },
      body: filters,
    });
    setProducts(response.data);
    setPagination((prev) => ({ ...prev, total: response.meta.totalRecords }));
  }, [pagination.page, pagination.limit, filters]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 0 }));
  };

  const handlePaginationChange = (newPage) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleCreate = async (productData) => {
    await createProduct(productData);
    setShowForm(false);
    loadProducts();
  };

  const handleUpdate = async (productData) => {
    await updateProduct(productData);
    setShowForm(false);
    setEditingProduct(null);
    loadProducts();
  };

  const handleDelete = async (productId) => {
    await deleteProduct(productId);
    loadProducts();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Product Management</h1>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className={styles.createButton}
        >
          <FaPlus /> Create Product
        </button>
      </div>

      <div className={styles.content}>
        <SearchFilters
          onFilterChange={handleFilterChange}
          products={products}
        />
        <ProductList
          products={products}
          pagination={pagination}
          onPageChange={handlePaginationChange}
          onEdit={(product) => {
            setEditingProduct(product);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductPage;
