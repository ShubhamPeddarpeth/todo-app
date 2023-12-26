import React, { useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import './App.css'

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    status: 'Not Completed',
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  const addTask = () => {
    if (newTask.name.trim() !== '' && newTask.description.trim() !== '') {
      setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
      setNewTask({ name: '', description: '', status: 'Not Completed' });
    }
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setEditingTaskId(null);
  };

  const startEditing = (taskId, status) => {
    setEditingTaskId(taskId);
    setEditingStatus(status);
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId
        ? { ...task, status: editingStatus }
        : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditingStatus(null);
    setNewTask({ name: '', description: '', status: 'Not Completed' });
  };

  const handleStatusChange = (status) => {
    setEditingStatus(status);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const filteredTasks =
    filterStatus === 'All'
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);

  const cardStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px',
    borderRadius: '5px',
  };

  return (
    <Container className="my-4  ">

      <h1 className="text-center mb-5 text-success" >My Todo App</h1>

      <Row className='mb-3 d-flex justify-content-between mx-auto'>
        <Col>
          <Form>
            <Row className="d-flex flex-row justify-content-between align-items-end">
              <Col>
                <Form.Label>  Task Name:</Form.Label>

                <Form.Control
                  type="text"
                  value={newTask.name}
                  onChange={(e) =>
                    setNewTask({ ...newTask, name: e.target.value })
                  }
                />

              </Col>
              <Col>
                <Form.Label>
                  Description:  </Form.Label>
                <Form.Control
                  type="text"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                />
              </Col>
              <Col>  <Button onClick={addTask}>Add</Button></Col>

            </Row>
          </Form>
        </Col>

      </Row>

      <Row className="mb-3 d-flex justify-content-between">
        <Col><p>My Todos</p></Col>
        <Col>

          <label>Status Filter:</label>
          <select

            value={filterStatus}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Not Completed">Not Completed</option>
            <option value="Completed">Completed</option>
          </select>

        </Col>
      </Row>

      <Row className=' d-flex justify-content-between'>
        {filteredTasks.map((task) => (
          <Card style={{ width: '18rem', background: '#00FFFF' }}>
            <Card.Body>
              {editingTaskId === task.id ? (
                <>
                  <label>
                    Task Name:
                    <input
                      type="text"
                      value={newTask.name}
                      onChange={(e) =>
                        setNewTask({ ...newTask, name: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    Description:
                    <input
                      type="text"
                      value={newTask.description}
                      onChange={(e) =>
                        setNewTask({
                          ...newTask,
                          description: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label>
                    Status:
                    <select
                      value={editingStatus}
                      onChange={(e) => handleStatusChange(e.target.value)}
                    >
                      <option value="Not Completed">Not Completed</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </label>
                  <button className='btm btn-info' onClick={updateTask}>Update</button>
                </>
              ) : (
                <>
                  <div>
                    <strong>Name:</strong> {task.name}
                  </div>
                  <div>
                    <strong>Description:</strong> {task.description}
                  </div>
                  {/* <div>
                  <strong>Status:</strong>{' '}
                  <span
                    style={{ cursor: 'pointer', color: 'blue' }}
                    onClick={() => startEditing(task.id, task.status)}
                  >
                    {task.status}
                  </span>
                </div> */}
                  <div>
                    <strong>Status:</strong>{' '}

                    <select
                      value={task.status}
                      onChange={(e) =>
                        startEditing(task.id, e.target.value)
                      }
                    >
                      <option value="Not Completed">Not Completed</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <Col className='d-flex flex-row justify-content-between mt-2'>


                    <button className='btn btn-info' onClick={() => startEditing(task.id, task.status)}>
                      Edit
                    </button>
                    <button className='btn btn-warning' onClick={() => removeTask(task.id)}>Delete</button>
                  </Col>
                </>
              )}
            </Card.Body>
          </Card>
        ))}
      </Row>

    </Container>
  );
};



export default App;
