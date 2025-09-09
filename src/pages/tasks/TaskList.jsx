import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Spinner, Button, Card, Form, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function TaskList() {
  const { state, dispatch } = useAppContext();
  const tasks = state.tasks;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchTasks = async () => {
      if (tasks.length) return;
      setLoading(true);
      try {
        const res = await fetch(
          'https://jsonplaceholder.typicode.com/todos?_limit=5'
        );
        const data = await res.json();
        const payload = data.map(t => ({
          id: t.id,
          title: t.title || 'Untitled Task',
          description: t.description || 'Sample description',
          completed: t.completed
        }));
        dispatch({ type: 'SET_TASKS', payload });
      } catch (err) {
        setError(err.message || 'Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(
    task =>
      (task.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (task.description?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  )
  .filter(task => {
      if (statusFilter === 'completed') return task.completed;
      if (statusFilter === 'not_completed') return !task.completed;
      return true; // 'all'
    });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-4">{error}</div>;
  }

  if (tasks.length === 0) {
    return <div className="alert alert-info text-center mt-4">No tasks added yet.</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto' }}>
      <h2 className="mb-4 text-center fw-bold" style={{ color: '#1709d6ff' }}>Tasks</h2>

      {/* Search Bar */}
      <Card className="mb-4 shadow-sm rounded-4 p-3 d-flex flex-column flex-md-row gap-2">
        <Form.Control
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="rounded-3"
        />
        <Form.Select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="rounded-3"
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="not_completed">Not Completed</option>
        </Form.Select>
      </Card>

      {filteredTasks.length === 0 && (
        <div className="alert alert-warning text-center shadow-sm rounded-3">
          No tasks match your search.
        </div>
      )}

      {filteredTasks.map(task => (
        <Card
          key={task.id}
          className="mb-3 shadow-lg rounded-4"
          style={{ transition: '0.3s' }}
        >
          <Card.Body className="d-flex justify-content-between align-items-start">
            <div>
              <Form.Check
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
                label={
                  <div>
                    <strong
                      style={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? '#6c757d' : '#000',
                        fontSize: '1.1rem'
                      }}
                    >
                      {task.title || "Untitled Task"}
                    </strong>
                    <p className="mb-0 text-muted">{task.description || "No description"}</p>
                  </div>
                }
              />
            </div>
            <div className="d-flex gap-2">
              <Link
                to={`/tasks/${task.id}`}
                className="btn btn-sm"
                style={{
                  backgroundColor: '#667eea',
                  borderColor: '#667eea',
                  color: '#fff',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={e => (e.target.style.backgroundColor = '#556cd6')}
                onMouseOut={e => (e.target.style.backgroundColor = '#667eea')}
              >
                View
              </Link>
              <Button
                size="sm"
                variant="danger"
                className="rounded-pill"
                onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
              >
                Delete
              </Button>
              {task.completed && <Badge bg="success" className="ms-2">Completed</Badge>}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
