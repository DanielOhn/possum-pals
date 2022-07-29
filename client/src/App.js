import './App.css';

import InputPost from "./Posts/InputPost"
import ListPosts from './Posts/ListPosts';
import SinglePost from './Posts/SinglePost';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/p/:id" element={<SinglePost />} />
      </Routes>


    </BrowserRouter>
  );
}

const Landing = () => {
  return (
    <div className="container">
      <InputPost />
      <ListPosts />
    </div>
  )
}

export default App;
