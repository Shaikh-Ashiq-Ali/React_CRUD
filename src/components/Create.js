import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Create(){

  const navigate = useNavigate();

const handleSubmit =(event) => {
  event.preventDefault();
  axios.post('http://localhost/React_CRUD/api/', inputs).then(function(response){
    console.log(response.data);
    navigate('/');
  });
}

const [inputs, setinputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setinputs(values => ({...values, [name] : value}))
  } 

  return(
    <div>
      <h4>Create User</h4>
      <form onSubmit={handleSubmit}>
        {/* <h4 style={{ color : "green" }}>sasdasd</h4> */}
        Name
        <input type="text" name='name' onChange={handleChange} />
        <br/>
        Email
        <input  type="email" name='email' onChange={handleChange} />
        <br/>
        Password
        <input  type="password" name='password' onChange={handleChange}/>
        <br/>
        <button>Save</button>
      </form>
    </div>
  )
}