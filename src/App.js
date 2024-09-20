import './App.css';
import Users from './User';
import AddUser from './AddUser';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Members from './Members';
import Register from './register';
import Login from './login';
import NavBar from './navbar';
import Gallery from './gallery';
import Footer from './Footer';
import Landing from './landing';



function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <main>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/gallery' element={<Gallery/>}/>
          <Route path='/members' element={<Members/>}/>
        </Routes>
      </main>
      
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
