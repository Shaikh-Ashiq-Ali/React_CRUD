import { useState , useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit(){

  const navigate = useNavigate();

  const [inputs, setinputs] = useState({});

  const {id} = useParams();

  useEffect(() => {
    getuser();
  } , []);

   function getuser(){
     axios.get(`http://localhost/React_CRUD/api/${id}/edit`).then(function(response){
           setinputs(response.data);
          response.data.map((user, key) => 
          setinputs(user),
          );
      });
    }
    
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setinputs(values => ({...values, [name] : value}))
    } 
    const handleSubmit =(event) => {
      event.preventDefault();
      axios.put(`http://localhost/React_CRUD/api/${id}`, inputs).then(function(response){
        navigate('/');
      });
    }


  return(
    <div>
      <h4>Edit User</h4>
      <form onSubmit={handleSubmit}>
        Name
        <input value={inputs.name} type="text" name='name' onChange={handleChange} />
        <br/>
        Email
        <input value={inputs.email}  type="email" name='email' onChange={handleChange} />
        <br/>
        Password
        <input value={inputs.password}  type="password" name='password' onChange={handleChange}/>
        <br/>
        <button>Save</button>
      </form>
    </div>
  )
}