import React, {useState, useEffect} from 'react'

const API = process.env.REACT_APP_API;

const Clientes = () => {
    const [plan_asociado, setPlan_asociado] = useState('')
    const [status, setStatus] = useState('')
    const [fecha_suscripcion, setFecha_suscripcion] = useState('')
    const [fecha_vigencia, setFecha_vigencia] = useState('')
    const [edit, setEdit] = useState(false)
    const [clientes, setClientes] = useState([])
    const [editId, setEditId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!edit){
            const res = await fetch(`${API}/clientes`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    plan_asociado,
                    status,
                    fecha_suscripcion,
                    fecha_vigencia
                })
            })
            const data = await res.json();
            console.log(data);
        } else {
            const res = await fetch(`${API}/clientes/${editId}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    plan_asociado,
                    status,
                    fecha_suscripcion,
                    fecha_vigencia
                })
            })
            const data = await res.json();
            console.log(data);
            setEdit(false);
            setEditId('');
        }
        setPlan_asociado('');
        setStatus('');
        setFecha_suscripcion('');
        setFecha_vigencia('');
    }

    const getClientes = async () => {
        const res = await fetch(`${API}/clientes`);
        const data = await res.json();
        setClientes(data);
    }

    const deleteCliente = async (id) => {
        const userResponse = window.confirm('queres eliminar este cliente?')
        if (userResponse === true){
        const res = await fetch(`${API}/clientes/${id}`,{
            method: 'DELETE'
        });
        const data = await res.json();
        console.log(data);
    }
    }

    const editCliente = async (id) => {
        const res = await fetch(`${API}/clientes/${id}`)
        const data = await res.json();
        setEdit(true);
        setEditId(id)
        setPlan_asociado(data.plan_asociado);
        setStatus(data.status);
        setFecha_suscripcion(data.fecha_suscripcion);
        setFecha_vigencia(data.fecha_vigencia);
    }

    useEffect(()=> {
        getClientes();
    },[clientes])

    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input 
                        type="text" 
                        onChange={e => setPlan_asociado(e.target.value)} 
                        value ={plan_asociado}
                        className="form-control"
                        placeholder="Plan asociado"
                        autoFocus
                        />
                    </div>

                    <div className="form-group my-4">
                        <input 
                        type="text" 
                        onChange={e => setStatus(e.target.value)} 
                        value ={status}
                        className="form-control"
                        placeholder="status"
                        />
                    </div>

                    <div className="form-group mb-4">
                        <input 
                        type="text" 
                        onChange={e => setFecha_suscripcion(e.target.value)} 
                        value ={fecha_suscripcion}
                        className="form-control"
                        placeholder="Fecha de suscripción"
                        autoFocus
                        />
                    </div>

                    <div className="form-group mb-4">
                        <input 
                        type="text" 
                        onChange={e => setFecha_vigencia(e.target.value)} 
                        value ={fecha_vigencia}
                        className="form-control"
                        placeholder="Fecha de vigencia"
                        autoFocus
                        />
                    </div>

                    <button className="btn btn-primary btn-block mb-4">
                        {edit? 'Update' : 'Create'}
                    </button>
                </form>
            </div>
            <div className="col-md-8">
                <table className="table table-responsive table-striped border mw-100">
                    <thead>
                        <tr>
                            <th>Plan Asociado</th>
                            <th>Status</th>
                            <th>Suscripcion</th>
                            <th>Vigencia</th>
                            <th className="">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                    {clientes.map(cliente => (
                    <tr key={cliente._id}>
                        <td>{cliente.plan_asociado}</td>
                        <td>{cliente.status}</td>
                        <td>{cliente.fecha_suscripcion}</td>
                        <td>{cliente.fecha_vigencia}</td>
                        <td>
                        <button 
                        className="btn btn-secondary btn-sm btn-block w-100"
                        onClick={() => editCliente(cliente._id)}
                        >
                            Edit
                        </button>
                        <button 
                        className="btn btn-danger btn-sm btn-block w-100"
                        onClick={() => deleteCliente(cliente._id)}
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

export default Clientes
