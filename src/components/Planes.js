import React, {useState, useEffect} from 'react';

const API = process.env.REACT_APP_API;

const Planes = () => {
    const [name, setName] = useState('')
    const [precio, setPrecio] = useState('')
    const [edit, setEdit] = useState(false)
    const [planes, setPlanes] = useState([])
    const [editId, setEditId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!edit){
            const res = await fetch(`${API}/planes`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    precio
                })
            })
            const data = await res.json();
            console.log(data);
        } else {
            const res = await fetch(`${API}/planes/${editId}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    precio
                })
            })
            const data = await res.json();
            console.log(data);
            setEdit(false);
            setEditId('');
        }
        setName('');
        setPrecio('');
    }

    const getPlanes = async () => {
        const res = await fetch(`${API}/planes`);
        const data = await res.json();
        setPlanes(data);
    }

    const deletePlanes = async (id) => {
        const userResponse = window.confirm('Queres eliminar este plan?')
        if (userResponse === true){
        const res = await fetch(`${API}/planes/${id}`,{
            method: 'DELETE'
        });
        const data = await res.json();
        console.log(data);
    }
    }

    const editPlanes = async (id) => {
        const res = await fetch(`${API}/planes/${id}`)
        const data = await res.json();
        setEdit(true);
        setEditId(id)
        setName(data.name)
        setPrecio(data.precio)
    }

    useEffect(()=> {
        getPlanes();
    },[planes])

    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input 
                        type="text" 
                        onChange={e => setName(e.target.value)} 
                        value={name}
                        className="form-control"
                        placeholder="Nombre"
                        autoFocus
                        />
                    </div>

                    <div className="form-group my-4">
                        <input 
                        type="text" 
                        onChange={e => setPrecio(e.target.value)} 
                        value ={precio}
                        className="form-control"
                        placeholder="Precio"
                        />
                    </div>

                    <button className="btn btn-primary btn-block mb-4">
                        {edit? 'Update' : 'Create'}
                    </button>
                </form>
            </div>
            <div className="col-md-6">
                <table className="table table-striped border">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th className="">Operatios</th>
                        </tr>
                    </thead>
                    <tbody>
                    {planes.map(plan => (
                    <tr key={plan._id}>
                        <td>{plan.name}</td>
                        <td>{plan.precio}</td>
                        <td>
                        <button 
                        className="btn btn-secondary btn-sm btn-block w-100"
                        onClick={() => editPlanes(plan._id)}
                        >
                            Edit
                        </button>
                        <button 
                        className="btn btn-danger btn-sm btn-block w-100"
                        onClick={() => deletePlanes(plan._id)}
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

export default Planes
