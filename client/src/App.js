import './App.css';

import InputPost from "./Posts/InputPost"
import ListPosts from './Posts/ListPosts';


function App() {
  return (
    <div className="container">
      <InputPost />
      <ListPosts />
    </div>
  );
}

export default App;
