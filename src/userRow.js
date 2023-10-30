import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"

const UserRow = (props) => {
    const [users, setUsers] = useState([]);
    const [addedPoints, setPoints] = useState(0);


    const editPoints = (id, points) => {
        axios.post('https://investing-in-potential.onrender.com/points',
        {   
            id, 
            points
        }
        )
        .then(res => alert(`${addedPoints} added/removed`))
        .then(res => {
            setPoints(0);
            })
        .then(res => props.getUsers())
        .catch(err=>console.log(err))
    }

    

    return ( 
        <tr>
            <th scope='row'>{props.count}</th>
            <td>{props.user.name}</td>
            <td>{props.user.surname}</td>
            <td>{props.user.phonenumber}</td>
            <td>{Number(props.user.points) + addedPoints }<span>
                {Cookies.get('token_id') && Cookies.get('token_username') && Cookies.get('token_email') &&
                    <button onClick={()=>setPoints(addedPoints+1)} className='btn btn-info btn-sm rounded-circle ms-3'><i class="bi bi-plus-lg"></i></button>
                }
                {Cookies.get('token_id') && Cookies.get('token_username') && Cookies.get('token_email') &&
                    <button onClick={()=>setPoints(addedPoints-1)} className='btn btn-danger btn-sm rounded-circle ms-1'><i class="bi bi-dash"></i></button>   
                }
                </span>
                {(addedPoints>0 || addedPoints<0) && 
                <button onClick={()=>editPoints(props.user._id, Number(props.user.points) + addedPoints)} className="btn btn-sm btn-success mx-2">
                    <i class="bi bi-check2"></i>

                </button>
                }  
            </td>
            
        </tr>
     );
}
 
export default UserRow;