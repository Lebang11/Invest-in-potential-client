import './App.css';
// axios for sending requests to our backend
import axios from 'axios';
import Users from './User';
import AddUser from './AddUser';


function App() {
  return (
    <div className="App">
    {/* navbar */}
    <nav class="navbar navbar-light bg-light mb-5 justify-content-center align-items-center">
      <span class="navbar-brand  h1">Investing in Potential</span>
    </nav>
    {/*  simple start of table */}
    
        <div className="container">
          <h1 className="display-4 text-muted">
            Members
          </h1>
          <table className="table table-light table-striped-columns">
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Name</th>
                <th scope='col'>Surname</th>
                <th scope='col'>Phone Number</th>
                <th className='text-info' scope='col'>Points</th>
              </tr>
            </thead>
            <tbody>
              <Users/>
            </tbody>
          </table>
              <AddUser/>
        </div>
    </div>
  );
}

export default App;
