import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getList, addFetchData, deleteFetchData, updateFetchData } from '../reduxs/actions/action'

const GetTodoList = () => {
    const [inPut, setInPut] = useState("");
    const [state, setState] = useState(0);
    const dispatch = useDispatch()
    const datafromredux = useSelector(state => state.fetchReducer)

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        fetch('http://localhost:3000/posts')
            .then(response => response.json())
            .then(data => {
                dispatch(getList(data))
            })
    }

    const handleAddTodo = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/posts', {
            method: 'POST',
            body: JSON.stringify({ name: inPut }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch(addFetchData(data))
            });
        setInPut("")
    }

    const handleDeleteData = (objId) => {
        try {
            fetch(`https://example.com/delete-item/${objId}`, { method: 'DELETE' }).then(() => {
                dispatch(deleteFetchData(objId))
            });
        } catch (err) {
            console.log(err);
        }
    }

    const EditInputButton = (data, id) => {
        setState(id)
        setInPut(data)
    }

    const UpdateDataButton = () => {
        fetch(`http://localhost:3000/posts/${state}`, {
            method: 'PUT',
            body: JSON.stringify({ name: inPut }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())
            .then((data) => {
                dispatch(updateFetchData(data))
                getData()
            })
        setInPut("")
        setState(0)
    }

    return (
        <>
            <div className='App'>
                <div className="container my-3">
                    <h1 className='text-white'>Welcome To Todo List</h1>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-white">ADD A NOTE</h5>
                            <div className="form-group">
                                <textarea
                                    className="form-control my-2"
                                    value={inPut}
                                    onChange={event => setInPut(event.target.value)}
                                    id="addTxt"
                                    rows="3"></textarea>
                                <input type="hidden" id="saveIndex" />
                            </div>
                            {state ?
                                (<button className="btn btn-success" onClick={UpdateDataButton}>UpDate Note</button>) :
                                (<button className="btn btn-success" onClick={handleAddTodo}>ADD NOTE</button>)
                            }
                        </div>
                    </div>
                    <div>
                        <h1 className='text-white'>Your Notes</h1>
                        <hr />
                    </div>
                </div>
            </div>
            <div className="row container-fluid">
                {datafromredux.map((val, ind) => {
                    return (
                        <div className="card mx-2 my-2" style={{ width: "18rem" }} key={ind}>
                            <div className="card-body">
                                <h5 className="card-title text-white">Note ID {val.id}</h5>
                                <p className="card-text text-white">{val.name}</p>
                                <button className='btn btn-danger mx-2' onClick={() => handleDeleteData(val.id)}>Delete Data</button>
                                <button className='btn btn-secondary' onClick={() => EditInputButton(val.name, val.id)}>Edit Data</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default GetTodoList
