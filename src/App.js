import './App.css';
// axios for sending requests to our backend
import axios from 'axios';


function App() {
  
  // Trying to get users from database, refer to server side
  const getUsers = async () => {
    // learn about promises and async await
    // fetches from our backend as a list of all user jsons
    const users = await fetch('http://localhost:3000')
                  .then(res => res.json())
                  .then(res => console.log(res[0]))
                  .catch(err=>console.log(err))
  }

  return (
    <div className="App">
    {/* navbar */}
    <nav class="navbar navbar-light bg-light mb-5 justify-content-center align-items-center">
      <span class="navbar-brand  h1">Investing in Potential</span>
    </nav>
    <button className="btn-lg" onClick={getUsers}>get users</button>
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
              <tr>
                <th scope='row'>1</th>
                <td>Lebang</td>
                <td>Nong</td>
                <td>0623997680</td>
                <td>4</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default App;
