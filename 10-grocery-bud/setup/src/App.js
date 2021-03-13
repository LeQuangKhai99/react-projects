import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false, 
    msg: 'hello', 
    type: 'success'
  
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      // dispaly alert
      setAlert({
        show: true,
        msg: "Name is empty",
        type: 'error'
      });
    }
    else if(name && isEditing) {

    }
    else {
      // show alert
      const newItem = {id: new Date().getTime().toString(),
      title: name}
      setList([...list, newItem]);
      setName('');
      setAlert({
        show: true,
        msg: "Name is empty",
        type: 'error'
      });
    }
  }
  return <section className="section-center">
    <form className="grocery-form" onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert}/>}
      <h3>grocery bud</h3>
      <div className="form-control">
        <input type="text" 
        className="grocery" 
        placeholder="e.g. eggs"
        value={name}
        onChange={(e)=>{setName(e.target.value)}}
        />
        <button type="submit" className="submit-btn">
          {isEditing ? 'edit' : 'submit'}
        </button>
      </div>
    </form>
    <div className="grocery-container">
      <List items={list}/>
      <button className="clear-btn">clear items</button>
    </div>
  </section>
}

export default App
