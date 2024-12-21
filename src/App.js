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
import ClientPortal from './clientPortal';
import ErrorBoundary from './components/ErrorBoundary';
import CourseSignup from './CourseSignup';
import AssessmentTests from './AssessmentTests';
import PaymentGateway from './PaymentGateway';
import TestRules from './TestRules';

function App() {
  
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <NavBar/>
        <main>
          <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/gallery' element={<Gallery/>}/>
            <Route path='/members' element={<Members/>}/>
            <Route path='/clients' element={<ClientPortal/>}/>
            <Route path='/course-signup' element={<CourseSignup/>}/>
            <Route path='/assessment' element={<AssessmentTests/>}/>
            <Route path='/payment' element={<PaymentGateway/>}/>
            <Route path='/test-rules' element={<TestRules/>}/>
          </Routes>
        </main>
        
        <Footer/>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
