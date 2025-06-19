import axios from 'axios';

const API_BASE = 'https://api-stage.gems.gov.bd/coreservice/public/product';

export const fetchProducts = async (params) => {
  const response = await axios.post(`${API_BASE}/get-list`, params);
  return {
    data: response.data.body,
    meta: response.data.meta
  };
};

export const createProduct = async (product) => {
  await axios.post(`${API_BASE}/create`, {
    ...product,
    isTaxable: product.isTaxable ? 'yes' : 'no'
  });
};

export const updateProduct = async (product) => {
  await axios.put(`${API_BASE}/update`, {
    ...product,
    isTaxable: product.isTaxable ? 'yes' : 'no'
  });
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_BASE}/delete-by-id/${id}`);
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_BASE}/get-by-id/${id}`);
  return response.data;
};