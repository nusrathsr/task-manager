import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Card, Badge, Button } from 'react-bootstrap';

export default function TaskView() {
  const { id } = useParams();
  const { state } = useAppContext();
  const task = state.tasks.find((t) => String(t.id) === id);

  useEffect(() => {
    console.log(`TaskView mounted for task ${id}`);
    return () => {
      console.log(`TaskView unmounted for task ${id}`);
    };
  }, [id]);

  if (!task) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '60vh' }}
      >
        <div className="alert alert-warning shadow-sm rounded-3">
          Task not found.
        </div>
      </div>
    );
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ padding: '20px', minHeight: '60vh' }}
    >
      <Card
        className="p-4 shadow-lg rounded-4"
        style={{ maxWidth: '600px', width: '100%', backgroundColor: 'rgba(255,255,255,0.95)' }}
      >
        <Card.Body>
          <Card.Title className="mb-3 fw-bold" style={{ color: '#333', fontSize: '1.5rem' }}>
            Task #{task.id}
          </Card.Title>

          <Card.Text className="mb-2">
            <strong>Title:</strong> {task.title}
          </Card.Text>

          <Card.Text className="mb-3">
            <strong>Status:</strong>{' '}
            <Badge
              bg={task.completed ? 'success' : 'warning'}
              text={task.completed ? 'light' : 'dark'}
              className="p-2"
            >
              {task.completed ? '✅ Completed' : '⏳ Pending'}
            </Badge>
          </Card.Text>

          <Link to="/tasks">
            <Button
              variant="primary"
              className="fw-semibold"
              style={{
                backgroundColor: '#667eea',
                borderColor: '#667eea',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#556cd6')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#667eea')}
            >
              Back to Tasks
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}
