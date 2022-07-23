import './App.css';
import { Fragment } from 'react';

import InputPost from "./InputPost"
import ListPosts from './ListPosts';

function App() {
  return (
    <div className="container">
      <InputPost />
      <ListPosts />
    </div>
  );
}

export default App;
