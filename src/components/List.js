import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';

export default function List(){

  const [users , setUsers] = useState([]);

  useEffect(() => {
    getusers();
  } , []);

   function getusers(){
     axios.get('http://localhost/React_CRUD/api/').then(function(response){
       console.log(response.data);
       setUsers(response.data);
      });
    }

    const deleteUser = (id) => {
      axios.delete(`http://localhost/React_CRUD/api/${id}`).then(function(response){
        console.log(response.data);
        getusers();
      })
    }

  return(
    <div className="ListDiv">
        <h1>List</h1>
        <table border={1} cellSpacing={0}>
          <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Action</th>
            </tr>
          </thead>
          <tbody>
                  {Array.isArray(users)
                  ? users.map((user, key) => 
                  
                    <tr key={key}>
                        <td>{key +1 }</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>
                          <Link to={`user/${user._id["$oid"]}/edit`} style={{ marginRight:"10px" }}>Edit</Link>
                          <button onClick={() => deleteUser(user._id["$oid"])}>Delete</button>
                        </td>
                    </tr>
                  )
                : <tr><td colSpan={5}>Please Create User</td></tr>}
          </tbody>
        </table>
    </div>
  )
}