import './App.css';

function App() {
  return (
    // simple start of table
    <div className="App">
        <div className="container">
          <table className="table table-light">
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Name</th>
                <th scope='col'>Surname</th>
                <th scope='col'>Phone Number</th>
                <th scope='col'>Points</th>
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
