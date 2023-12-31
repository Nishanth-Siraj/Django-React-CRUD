import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeProject } from '../redux-toolkit/features/projects/projectsSlice'; // Update the import path to your projectsSlice.js

const FormUpdate = ({ singleProject }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    id,
    title: initialTitle,
    category: initialCategory,
    description: initialDescription,
    demo: initialDemo,
    thumbnail: initialThumbnail,
  } = singleProject;

  const [thumbnail, setThumbnail] = useState(initialThumbnail);
  const [title, setTitle] = useState(initialTitle);
  const [category, setCategory] = useState(initialCategory);
  const [description, setDescription] = useState(initialDescription);
  const [demo, setDemo] = useState(initialDemo);
  const [pathThumbnail, setpathThumbnail] = useState(null);
console.log(pathThumbnail)
const handleThumbnailChange = (e) => {
  const file = e.target.files[0];
  setpathThumbnail(e.target.files[0])
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnail(reader.result); 
    };
    reader.readAsDataURL(file);
  }
}

console.log(pathThumbnail);
  // to clear all data
  const clearData = () => {
    setThumbnail(null);
    setTitle('');
    setCategory('');
    setDescription('');
    setDemo('');
  };
  const projectUpdateSubmitHandler = (e) => {
    e.preventDefault();
    const updatedData = {
      "thumbnail": pathThumbnail,
      "title": title,
      "category": category,
      "description": description,
      "demo": demo
    };
// console.log(pa)

    let data = new FormData();
    if (pathThumbnail){data.append('thumbnail', pathThumbnail);}
      
    data.append('title', title);
    data.append('category', category);
    data.append('description', description);
    data.append('demo', demo);

    // console.log();
    // console.log(JSON.stringify(updatedData));
    // const data = JSON.stringify(updatedData)
    // console.log(title+category+description+demo)
    console.log(data);
    dispatch(changeProject({ id: id ,data: data})); // Dispatch the changeProject action
    clearData();
    navigate('/');
  };
 



  return (
    <Form onSubmit={projectUpdateSubmitHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Group>

        <Form.Select aria-label="Default select example" value={category}   onChange={(e) => setCategory(e.target.value)} required>
            <option defaultValue value={category}>{category}</option>
            <option>--- choose Other categories ----</option>
            <option value="web development">Web Development</option>
            <option value="frontend engineer">Frontend Engineer</option>
            <option value="backend engineer">Backend Engineer</option>
        </Form.Select>

        <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="text" value={demo} onChange={(e) => setDemo(e.target.value)} placeholder="Enter Demo Link" />
        </Form.Group>


        <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Update Thumbnail</Form.Label>
            <Form.Control type="file" onChange={handleThumbnailChange} />
            <img className='mt-2 mb-2 pd-4' src={thumbnail} height='100px' width='150px' />
        </Form.Group>

        <Button variant='success' type='submit'>
                Update Project
        </Button>

    </Form>
  )
}

export default FormUpdate