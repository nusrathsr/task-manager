// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useAppContext } from '../../context/AppContext';
// import { Form, Button, Card } from 'react-bootstrap';

// export default function TaskEdit() {
//   const { id } = useParams();
//   const { state, dispatch } = useAppContext();
//   const navigate = useNavigate();

//   const task = state.tasks.find(t => t.id.toString() === id);

//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   useEffect(() => {
//     if (task) {
//       setTitle(task.title);
//       setDescription(task.description || '');
//     }
//   }, [task]);

//   if (!task) {
//     return <div className="alert alert-warning mt-4">Task not found.</div>;
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!title.trim() || !description.trim()) return alert('Please fill all fields');

//     dispatch({
//       type: 'UPDATE_TASK',
//       payload: {
//         id: task.id,
//         title,
//         description
//       }
//     });

//     navigate(`/tasks/${task.id}`);
//   };

//   return (
//     <Card className="mt-4">
//       <Card.Body>
//         <Card.Title>Edit Task</Card.Title>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Title</Form.Label>
//             <Form.Control
//               type="text"
//               value={title}
//               onChange={e => setTitle(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               value={description}
//               onChange={e => setDescription(e.target.value)}
//             />
//           </Form.Group>

//           <Button type="submit" variant="primary">Save</Button>
//           <Button
//             variant="secondary"
//             className="ms-2"
//             onClick={() => navigate(`/tasks/${task.id}`)}
//           >
//             Cancel
//           </Button>
//         </Form>
//       </Card.Body>
//     </Card>
//   );
// }


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Form, Button, Card, Alert } from 'react-bootstrap';

export default function TaskEdit() {
  const { id } = useParams();
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const task = state.tasks.find(t => t.id.toString() === id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
    }
  }, [task]);

  if (!task) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="alert alert-warning shadow-sm rounded-3">Task not found.</div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim() || !description.trim()) {
      setError('Please fill all fields');
      return;
    }

    dispatch({
      type: 'UPDATE_TASK',
      payload: {
        id: task.id,
        title,
        description
      }
    });

    setSuccess('Task updated successfully!');
    setTimeout(() => navigate(`/tasks/${task.id}`), 1000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ padding: '20px'}}>
      <Card className="p-4 shadow-lg rounded-4" style={{ maxWidth: '600px', width: '100%', backgroundColor: 'rgba(255,255,255,0.95)' }}>
        <Card.Body>
          <h3 className="text-center mb-4 fw-bold" style={{ color: '#333' }}>Edit Task</h3>

          {error && <Alert variant="danger" className="shadow-sm">{error}</Alert>}
          {success && <Alert variant="success" className="shadow-sm">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="rounded-3"
                placeholder="Enter task title"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="rounded-3"
                placeholder="Enter task description"
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button
                type="submit"
                className="fw-semibold flex-grow-1"
                style={{
                  backgroundColor: '#667eea',
                  borderColor: '#667eea',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={e => (e.target.style.backgroundColor = '#556cd6')}
                onMouseOut={e => (e.target.style.backgroundColor = '#667eea')}
              >
                Save
              </Button>
              <Button
                variant="secondary"
                className="flex-grow-1"
                onClick={() => navigate(`/tasks/${task.id}`)}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
