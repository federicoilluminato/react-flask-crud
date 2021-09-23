import React, {useState, useEffect} from 'react'

const API = process.env.REACT_APP_API;

const Users = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [edit, setEdit] = useState(false)
    const [users, setUsers] = useState([])
    const [editId, setEditId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!edit){
            const res = await fetch(`${API}/users`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            const data = await res.json();
            console.log(data);
        } else {
            const res = await fetch(`${API}/user/${editId}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            const data = await res.json();
            console.log(data);
            setEdit(false);
            editId('');
        }
        setName('');
        setEmail('');
        setPassword('');
    }

    const getUsers = async () => {
        const res = await fetch(`${API}/users`);
        const data = await res.json();
        setUsers(data);
    }

    const deleteUser = async (id) => {
        const userResponse = window.confirm('Queres eliminar este user?')
        if (userResponse === true){
        const res = await fetch(`${API}/users/${id}`,{
            method: 'DELETE'
        });
        const data = await res.json();
        console.log(data);
    }
    }

    const editUser = async (id) => {
        const res = await fetch(`${API}/user/${id}`)
        const data = await res.json();
        setEdit(true);
        setEditId(id)
        setName(data.name)
        setEmail(data.email)
        setPassword(data.password)
    }

    useEffect(()=> {
        getUsers();
    },[users])

    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input 
                        type="text" 
                        onChange={e => setName(e.target.value)} 
                        value ={name}
                        className="form-control"
                        placeholder="Name"
                        autoFocus
                        />
                    </div>

                    <div className="form-group my-4">
                        <input 
                        type="email" 
                        onChange={e => setEmail(e.target.value)} 
                        value ={email}
                        className="form-control"
                        placeholder="Email"
                        />
                    </div>

                    <div className="form-group">
                        <input 
                        type="password" 
                        onChange={e => setPassword(e.target.value)} 
                        value ={password}
                        className="form-control"
                        placeholder="Password"
                        autoFocus
                        />
                    </div>
                    <button className="btn btn-primary btn-block my-4">
                        {edit? 'Update' : 'Create'}
                    </button>
                </form>
            </div>
            <div className="col-md-6">
                <table className="table table-striped border">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>
                        <button 
                        className="btn btn-secondary btn-sm btn-block w-100"
                        onClick={() => editUser(user._id)}
                        >
                            Edit
                        </button>
                        <button 
                        className="btn btn-danger btn-sm btn-block w-100"
                        onClick={() => deleteUser(user._id)}
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users
