import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'));
  }
  return [];
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false, 
    msg: 'hello', 
    type: 'success'
  
  });

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
    
  }, [list]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      // dispaly alert
      showAlert(true, 'danger', 'please enter the value');
    }
    else if(name && isEditing) {
      setList(list.map((item) => {
        if(item.id === editID) {
          return {...item, title: name}
        }
        return item;
      }));
      setIsEditing(false);
      setName('');
      showAlert(true, 'success', 'item is edited');
    }
    else {
      // show alert
      const newItem = {id: new Date().getTime().toString(),
      title: name}
      setList([...list, newItem]);
      setName('');
      showAlert(true, 'success', 'item added to the list');
    }
  }

  const removeAlert = () => {
    showAlert();
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({show, msg, type});
  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed the list');
    setList(list.filter((item) => item.id !== id));
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setName(specificItem.title);
    setEditID(id);
    setIsEditing(true);
  }

  return <section className="section-center">
    <form className="grocery-form" onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert={removeAlert}/>}
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
      <List items={list} removeItem={removeItem} editItem={editItem}/>
      <button className="clear-btn" onClick={clearList}>clear items</button>
    </div>
  </section>
}

export default App
