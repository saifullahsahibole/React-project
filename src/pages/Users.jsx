import React, { useContext, useEffect, useState, useCallback } from 'react';
import api from '../api'; 
import { GlobalContext } from '../context/GlobalContext';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import PageSizeDropdown from '../components/PageSizeDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Users.css';

const Users = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [gender, setGender] = useState('');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        limit: state.filters.pageSize,
        skip: (currentPage - 1) * state.filters.pageSize,
      };

      if (gender) {
        params.gender = gender;
      }

      const response = await api.get('/users', { params });
      setTotalPages(Math.ceil(response.data.total / state.filters.pageSize));
      dispatch({ type: 'SET_USERS', payload: response.data.users });
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, [state.filters.pageSize, currentPage, gender, dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredUsers = state.users.filter(user => {
    const userValues = Object.values(user).join(' ').toLowerCase();
    return userValues.includes(searchTerm.toLowerCase());
  });

  const handleGenderFilter = async (selectedGender) => {
    
    setGender(selectedGender);
    if (selectedGender !== '') {
      const response = await fetch(`https://dummyjson.com/users/filter?key=gender&value=${selectedGender}&limit=${state.filters.pageSize}`);
      const data = await response.json();
      dispatch({ type: 'SET_USERS', payload: data.users });
    }
  };

  const columns = [
    { key: 'firstName', label: 'FIRST NAME' },
    { key: 'lastName', label: 'LAST NAME' },
    { key: 'maidenName', label: 'MAIDEN NAME' },
    { key: 'age', label: 'AGE' },
    { key: 'gender', label: 'GENDER' },
    { key: 'email', label: 'EMAIL' },
    { key: 'username', label: 'USERNAME' },
    { key: 'birthDate', label: 'BIRTHDATE' },
    { key: 'bloodGroup', label: 'BLOODGROUP' },
    { key: 'eyeColor', label: 'EYECOLOR' }
  ];

  return (
    <div className="container users-container">
      <h5 className="my-4 bodybold">Users</h5>

      <div className="filters d-flex justify-content-between mb-4">
        <PageSizeDropdown 
          currentSize={state.filters.pageSize} 
          onChange={(size) => dispatch({ type: 'SET_FILTERS', payload: { ...state.filters, pageSize: size } })} 
        />
        <div className="d-flex">
          <select onChange={(e) => handleGenderFilter(e.target.value)} value={gender} className="form-select me-2">
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <Search onSearch={handleSearch} />
        </div>

      </div>

      {loading ? <p>Loading...</p> : (
        <>
          <Table columns={columns} data={filteredUsers} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
    </div>
  );
};

export default Users;
