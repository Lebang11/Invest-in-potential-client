import './App.css';
import Users from './User';
import AddUser from './AddUser';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Members from './Members';
import Register from './register';
import Login from './login';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Members/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
