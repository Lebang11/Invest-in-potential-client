import './App.css';
import Users from './User';
import AddUser from './AddUser';
import Cookies from 'js-cookie';



function Members() {
    console.log(Cookies.get('token_id'));
    console.log(Cookies.get('token_username'));
    console.log(Cookies.get('token_email'));

    

    
  return (
    <div className="App">
    {/*  simple start of table */}
    {Cookies.get('token_id') && Cookies.get('token_username') && Cookies.get('token_email') && 
        <p className='text-center text-success'>Admin mode: <cite>{Cookies.get('token_username')}</cite></p>

            }
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
          <div className='mb-4'>
          {Cookies.get('token_id') && Cookies.get('token_username') && Cookies.get('token_email') && 
              <AddUser/>
            }
          </div>
            
        </div>
    </div>
  );
}

export default Members;
