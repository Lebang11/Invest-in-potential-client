import { useState } from 'react';
import axios from 'axios';


const AddUser = () => {
    const [showAdd, setShowAdd] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phonenumber, setPhone] = useState('');
    const [points, setPoints] = useState('');


    const addUser = async () => {
        axios.post('https://investing-in-potential.onrender.com', 
        {
            name,
            surname,
            phonenumber,
            points
        }
        )
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return ( 
        <div className="container-md">
            <button onClick={()=> {
                if (showAdd===false) {
                    setShowAdd(true)
                } else {
                    setShowAdd(false)
                }
                }} className="btn btn-lg btn-success">
                Add User
            </button>
            {showAdd && 
            <div className="container mt-3 border p-4">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    addUser()
                    }} className="form">
                    <label For="name">Name:</label>
                    <input onChange={(e) => setName(e.target.value)} type="text" className="form-control my-1" placeholder='Name'/>
                    <label For="name">Surname:</label>
                    <input onChange={(e) => setSurname(e.target.value)} type="text" className="form-control my-1" placeholder='Surname'/>
                    <label For="name">Phone Number:</label>
                    <input onChange={(e) => setPhone(e.target.value)} type="text" className="form-control my-1" placeholder='Phone number'/>
                    <label For="name">Points:</label>
                    <input onChange={(e) => setPoints(e.target.value)} type="text" className="form-control my-1" placeholder='Points'/>
                    <button type='submit' className="btn btn-primary">Submit</button>
                </form>
                    
            </div>
            
            }
        </div>
    );
}
 
export default AddUser;