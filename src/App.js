import React, { useState } from 'react';
import './App.css';

function App() {
  const [getdata, setgetdata] = useState('')
  const [storeData, setStoredata] = useState([])
  const [editData, setEditData] = useState('')

  const textData = (even) => {
    setgetdata(even.target.value)
  }

  const getValue = () => {
    const duplicate = storeData.some((obj) => obj.text.toLowerCase() === getdata.trim().toLowerCase());
    if(!duplicate){
      const array = { id: Date.now(), text: getdata, status: false }
      setStoredata([...storeData, array])
      setgetdata('')
    }
    else{
      alert('This item already exists in the list!')
    }
    
  }

  const deleteValue = (id)=>{
    const newData = storeData.filter((obj)=>{
      return obj.id !== id
    })
    setStoredata(newData)
  }

  const statusChange = (id)=>{
    const newData = storeData.map((obj)=>{
      if(obj.id === id){
        return {...obj,status: !obj.status }
      }
      else{
        return obj
      }
    })
    setStoredata(newData)
  }

  const editValue =(id)=>{
    const newData = storeData.find((obj)=> obj.id === id) 
    if(newData){
      setgetdata(newData.text)
      setEditData(id)
    }

  }

  const handleAction = ()=>{
    if(editData){
      const updatedData  = storeData.map((obj)=>{
        if(obj.id === editData){
          return{...obj,text:getdata}
        }
        return obj
      })
      setStoredata(updatedData)
      setEditData('')
      setgetdata('')
    }
  }


  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
      </div>
      <div className="input">
        <input onChange={textData} value={getdata} type="text" placeholder="🖊️ Add item..." />
        {editData ?(<i className="fas fa-save" onClick={handleAction}></i>):(<i className="fas fa-plus" onClick={getValue}></i>)}
      </div>
      <div className="todos">
        {storeData.map((obj) => (
          <div className="todo">
            <div className="left">
              <input value={obj.status} onChange={()=>statusChange(obj.id)} type="checkbox" name="" id="" />
              {obj.status  === true ?
              (<p style={{ color: 'red', textDecoration: 'line-through' }} >{obj.text}</p>)
              :(<p>{obj.text}</p>)}
            </div>
            <div className="right">
              <i className="fas fa-edit" onClick={()=>editValue(obj.id)}></i>
              <i className="fas fa-times" onClick={()=>deleteValue(obj.id)}></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;