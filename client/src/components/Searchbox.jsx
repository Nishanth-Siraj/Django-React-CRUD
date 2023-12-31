import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSingleProject } from '../redux-toolkit/features/projects/projectsSlice'; // Update the import path
 
const Searchbox = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getSingleProject(input)); // Dispatch the searched action from projectsSlice.js
  };

  return (
    <form onSubmit={handleSubmit}>
        <input
            className="outline-none border-none mr-2"
            type="search"
            name="search"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />
    </form>
  )
}

export default Searchbox