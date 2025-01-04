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
import WeeklyOutline from './components/WeeklyOutline';
import AdminPortal from './AdminPortal';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import PaymentStatus from './components/PaymentStatus';

function App() {
  
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <NavBar/>
          <main>
            <Routes>
              <Route path='/' element={<Landing/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/gallery' element={<Gallery/>}/>
              <Route path='/members' element={
                <ProtectedRoute requireAdmin={true}>
                  <Members/>
                </ProtectedRoute>
              }/>
              <Route path='/clients' element={
                <ProtectedRoute>
                  <ClientPortal/>
                </ProtectedRoute>
              }/>
              <Route path='/course-signup' element={
                <ProtectedRoute>
                  <CourseSignup/>
                </ProtectedRoute>
              }/>
              <Route path='/assessment' element={
                <ProtectedRoute>
                  <AssessmentTests/>
                </ProtectedRoute>
              }/>
              <Route path='/payment' element={
                <ProtectedRoute>
                  <PaymentGateway/>
                </ProtectedRoute>
              }/>
              <Route path='/payment/status' element={
                <ProtectedRoute>
                  <PaymentStatus/>
                </ProtectedRoute>
              }/>
              <Route path='/test-rules' element={
                <ProtectedRoute>
                  <TestRules/>
                </ProtectedRoute>
              }/>
              <Route path='/weekly-outline' element={<WeeklyOutline/>}/>
              <Route path='/admin' element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminPortal />
                </ProtectedRoute>
              }/>
            </Routes>
          </main>
          
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
