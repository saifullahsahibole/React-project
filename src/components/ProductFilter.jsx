import React from 'react';

const ProductFilter = ({ filters, setFilters, selectedTab, setSelectedTab, categories }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setFilters({ title: '', brand: '', category: '' }); 
  };

  return (
    <div className="filter-container d-flex justify-content-between mb-4">
      <div className="tabs">
        <button onClick={() => handleTabChange('ALL')} className={`btn ${selectedTab === 'ALL' ? 'btn-primary' : 'btn-outline-dark'}`}>
          ALL
        </button>
        <button onClick={() => handleTabChange('Laptops')} className={`btn ${selectedTab === 'Laptops' ? 'btn-primary' : 'btn-outline-dark'}`}>
          Laptops
        </button>
      </div>
      <div className="filters d-flex align-items-center">
        <input
          type="text"
          name="title"
          placeholder="Search by Title"
          value={filters.title}
          onChange={handleInputChange}
          className="form-control mr-2 filter-input"
        />
        <input
          type="text"
          name="brand"
          placeholder="Search by Brand"
          value={filters.brand}
          onChange={handleInputChange}
          className="form-control mr-2 filter-input"
        />
        <select
          name="category"
          value={filters.category}
          onChange={handleInputChange}
          className="form-control filter-input"
        >
          <option value="">Select Category</option>
          {categories.length > 0 && categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;
