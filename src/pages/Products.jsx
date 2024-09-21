import React, { useContext, useEffect, useState, useCallback } from 'react';
import api from '../api';
import { GlobalContext } from '../context/GlobalContext';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import ProductFilter from '../components/ProductFilter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Products.css';
import PageSizeDropdown from '../components/PageSizeDropdown';

const Products = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('ALL');
  const [filters, setFilters] = useState({ title: '', brand: '', category: '' });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/category-list');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setError("Failed to load categories. Please try again.");
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      let response;
      let totalItems = 0; // Initialize total items

      // Fetch products based on the selected tab and category
      if (selectedTab === 'Laptops') {
        // Fetch laptops specifically
        response = await api.get('/products/search', {
          params: {
            q: 'laptop',
            limit: state.filters.pageSize,
            skip: (currentPage - 1) * state.filters.pageSize,
          },
        });
        totalItems = response.data.total;
      } else if (filters.category) {
        // Fetch by selected category
        response = await fetch(`https://dummyjson.com/products/category/${filters.category}?limit=${state.filters.pageSize}&skip=${(currentPage - 1) * state.filters.pageSize}`);
        const data = await response.json();
        dispatch({ type: 'SET_PRODUCTS', payload: data.products });
        totalItems = data.total; // Ensure to get total from fetched data
      } else {
        // Fetch all products
        response = await api.get('/products', {
          params: {
            limit: state.filters.pageSize,
            skip: (currentPage - 1) * state.filters.pageSize,
          },
        });
        totalItems = response.data.total; // Get total items from the general fetch
      }

      setTotalPages(Math.ceil(totalItems / state.filters.pageSize));

      dispatch({ type: 'SET_PRODUCTS', payload: response.data.products });
    } catch (error) {
      // setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedTab, filters.category, state.filters.pageSize, dispatch]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, selectedTab, filters.category]);



  const filteredProducts = state.products.filter(product => {
    const titleMatch = product.title ? product.title.toLowerCase().includes(filters.title.toLowerCase()) : true;
    const brandMatch = product.brand ? product.brand.toLowerCase().includes(filters.brand.toLowerCase()) : true; // Check if brand exists
    const categoryMatch = filters.category ? product.category === filters.category : true;
    return titleMatch && brandMatch && categoryMatch;
  });



  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="container products-container">


      <h5 className="my-4 bodybold">Products</h5>
      <div className="row mb-4">
        
        {error && <div className="alert alert-danger">{error}</div>}

        <ProductFilter
          filters={filters}
          setFilters={setFilters}
          selectedTab={selectedTab}
          setSelectedTab={handleTabChange}
          categories={categories}
        />
        <div className="col-12 col-md-6">
          <PageSizeDropdown
            currentSize={state.filters.pageSize}
            onChange={(size) => dispatch({ type: 'SET_FILTERS', payload: { ...state.filters, pageSize: size } })}
          />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table
            columns={[
              { key: 'srNo', label: 'SR NO' },
              { key: 'title', label: 'TITLE' },
              { key: 'brand', label: 'BRAND' },
              { key: 'category', label: 'CATEGORY' },
              { key: 'price', label: 'PRICE' },
              { key: 'stock', label: 'STOCK' },
            ]}
            data={filteredProducts.map((product, index) => ({
              ...product,
              srNo: index + 1 + (currentPage - 1) * state.filters.pageSize
            }))}
          />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
    </div>
  );
};

export default Products;
