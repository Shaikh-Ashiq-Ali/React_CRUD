import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import List from './components/List';
import Create from './components/Create';
import Edit from './components/Edit';

function App() {
  return (
    <div className="App">
      <h5>React CRUD</h5>

      <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">List User</Link>
          </li>
          <li>
            <Link to="user/create">Create User</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route index element={<List />} />
        <Route path="user/create" element={<Create />} />
        <Route path="user/:id/edit" element={<Edit />} />
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
