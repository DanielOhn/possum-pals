import './App.css';

import InputPost from "./Posts/InputPost"
import ListPosts from './Posts/ListPosts';
import SinglePost from './Posts/SinglePost';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Banner from './Banner';

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
      <Banner />
      <InputPost />
      <ListPosts />
    </div>
  )
}

export default App;
