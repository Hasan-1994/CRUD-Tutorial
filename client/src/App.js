import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
function App() {

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [nameList, setNameList] = useState([]);

  const [newName, setNewName] = useState('')
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) =>{
      setNameList(response.data)
    });


  }, []);


  const sumbitFunction = () => {
    Axios.post("http://localhost:3001/api/insert", { name: name, surname: surname })
    setNameList([
      ...nameList, {name: name, surname:surname},
    ]);
  };

  const deleteFunc = (name) =>{
    Axios.delete('http://localhost:3001/api/delete/'+name);
    console.log("deleted " + name)
  }
  const updateFunc = (name) =>{
    Axios.delete('http://localhost:3001/api/update/', {
      name: name,
      surname: surname
    });
    setNewName("")
  }


  return (
    <div className="App">
      <h1>
        CRUD - APPLICATION
     </h1>

      <div className="form">
        <label>
          Name:
       </label>
        <input type="text" name="name" onChange={(e) => {
          setName(e.target.value)
        }} />
        <label>
          Surname:
       </label>
        <input type="text" name="surname" onChange={(e) => {
          setSurname(e.target.value)
        }} />

        <button onClick={sumbitFunction}>Sumbit</button>

       
      </div>
      {nameList.map((val) =>{
          return(
            <div>
              <h1>Name:   {val.name}</h1>
              <p>Surname:   {val.surname}</p>
              <button onClick={()=> {deleteFunc(val.name)}}>delete</button>
              <input type="text" id="updateInput" onChange={(e)=>{
                setNewName(e.target.value)
              }}></input>
              <button onClick={()=>{updateFunc(val.name)}}>update</button>
            </div> 
          )
        })}
    </div>

  );
}

export default App;
