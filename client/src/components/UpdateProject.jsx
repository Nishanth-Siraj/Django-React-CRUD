import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleProject } from '../redux-toolkit/features/projects/projectsSlice'; // Update the import path to your projectsSlice.js
import FormUpdate from './FormUpdate';
  
const UpdateProject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Fetch the single project based on the ID when the component mounts
  useEffect(() => {
    dispatch(getSingleProject(id));
  }, [dispatch, id]);

  // Get the single project from the Redux store
  const singleProject = useSelector((state) => state.projects.project);


  return (
    <div className='container mt-4 mb-4 pd-3'>
    <h1>Update Project id:{id}</h1>
    <hr />
    <div>

        <FormUpdate singleProject={singleProject} />

    </div>
</div>
  )
}

export default UpdateProject