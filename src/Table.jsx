import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function Table ()  {
    const [data, setData] = useState([])
    const [name ,setName] = useState('')
    const [email ,setEmail] = useState('')
    const [uname ,usetName] = useState('')
    const [uemail ,usetEmail] = useState('')
    const [editId, setEditID] = useState(-1)

    useEffect(()=>{
        axios.get('http://localhost:3000/users')
        .then(res=>setData(res.data))
        .catch(er => console.log(er));
    },[])

    const handleSubmit = (event) =>{
        event.preventDefault();
        const id = data.length + 1;
        axios.post('http://localhost:3000/users', {id: id,name: name,email: email})
        .then(res => {
            location.reload()
        })
        .catch(er => console.log(er));
    }

    const handleEdit = (id) => {
        axios.get('http://localhost:3000/users/'+id)
        .then(res=>{console.log(res.data);
         usetName(res.data.name)
         usetEmail(res.data.email)
        })
        .catch(er => console.log(er))
      setEditID(id)
    }

    const handleUpdate = () =>{
        axios.put('http://localhost:3000/users/'+editId, {id: editId, name: uname, email: uemail})
        .then(res=>{
            console.log(res);
            location.reload();
            setEditID(-1);
         }).catch(err => console.log(err))
    }

    const handleDelete = (id) =>{
        axios.delete('http://localhost:3000/users/'+id)
        .then(res=>{
         location.reload();
        }).catch(er => console.log(er))
    }
  return (
    <div className='container'>
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter Name' onChange={e => setName(e.target.value)} />
                <input type="text" placeholder='Enter Email' onChange={e => setEmail(e.target.value)}/>
                <button>Add</button>
            </form>
        </div>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ACTION</th>
            </tr>
        </thead>
        <tbody style={{ }}>
           {
            data.map((users,index) => (
                users.id === editId ?
                <tr>
                    <td>{users.id}</td>
                    <td><input type="text" value={uname} onChange={e => usetName(e.target.value)}/></td>
                    <td><input type="text" value={uemail} onChange={e => usetEmail(e.target.value)}/></td>
                    <td><button onClick={handleUpdate}>Update</button></td>
                </tr>
                :
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{users.name}</td>
                    <td>{users.email}</td>
                    <td>
                        <button onClick={() => handleEdit(users.id)}>edit</button>
                        <button onClick={() => handleDelete(users.id)}>delete</button>
                    </td>
                </tr>
            ))
           }
        </tbody>
    </table>
    </div>
  )
}

export default Table