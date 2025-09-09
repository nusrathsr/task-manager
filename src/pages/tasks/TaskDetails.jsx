import React from 'react';
import { useParams, Link, useNavigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Card, Button, Form, Badge } from 'react-bootstrap';

export default function TaskDetails() {
  const { id } = useParams();
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const task = state.tasks.find(t => t.id.toString() === id);

  if (!task) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="alert alert-warning shadow-sm rounded-3">Task not found.</div>
      </div>
    );
  }

  // Toggle completed status
  const toggleCompleted = () => {
    dispatch({ type: 'TOGGLE_TASK', payload: task.id });
  };

  // Delete task and navigate back to task list
  const deleteTask = () => {
    dispatch({ type: 'DELETE_TASK', payload: task.id });
    navigate('/tasks');
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ padding: '20px', minHeight: '60vh' }}>
      <Card className="p-4 shadow-lg rounded-4" style={{ maxWidth: '600px', width: '100%', backgroundColor: 'rgba(255,255,255,0.95)' }}>
        <Card.Body>
          <Card.Title className="mb-3">
            <Form.Check
              type="checkbox"
              checked={task.completed}
              onChange={toggleCompleted}
              label={
                <span style={{ 
                  textDecoration: task.completed ? 'line-through' : 'none',
                  fontSize: '1.25rem',
                  color: task.completed ? '#6c757d' : '#000'
                }}>
                  {task.title}
                </span>
              }
            />
          </Card.Title>
          <Card.Text className="mb-3 text-muted">{task.description || 'No description provided'}</Card.Text>
          <Badge
            bg={task.completed ? 'success' : 'warning'}
            text={task.completed ? 'light' : 'dark'}
            className="mb-3"
          >
            {task.completed ? '✅ Completed' : '⏳ Pending'}
          </Badge>
          <div className="d-flex gap-2 mb-3 flex-wrap">
            <Link
              to="edit"
              className="btn btn-sm flex-grow-1"
              style={{
                backgroundColor: '#667eea',
                borderColor: '#667eea',
                color: '#fff',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={e => (e.target.style.backgroundColor = '#556cd6')}
              onMouseOut={e => (e.target.style.backgroundColor = '#667eea')}
            >
              Edit
            </Link>

            <Button
              variant="danger"
              size="sm"
              className="flex-grow-1"
              onClick={deleteTask}
            >
              Delete
            </Button>

            <Button
              variant="secondary"
              size="sm"
              className="flex-grow-1"
              onClick={() => navigate('/tasks')}
            >
              Back
            </Button>
          </div>
          <Outlet />
        </Card.Body>
      </Card>
    </div>
  );
}
