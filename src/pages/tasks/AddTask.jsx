import React, { useState } from "react";
import { Form, Button, Spinner, Card, Alert } from "react-bootstrap";
import { useAppContext } from "../../context/AppContext";

const AddTask = () => {
  const { dispatch } = useAppContext();
  const [task, setTask] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!task.title || !task.description) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      dispatch({
        type: "ADD_TASK",
        payload: { ...task, id: Date.now(), completed: false },
      });

      setTask({ title: "", description: "" }); 
      setLoading(false); 
      setSuccess("Task added successfully!");
    }, 500);
  };

  return (
    <Card className="p-4 shadow-lg rounded-4" style={{ maxWidth: "600px", margin: "20px auto", backgroundColor: "rgba(255,255,255,0.95)" }}>
      <Card.Body>
        <h3 className="text-center mb-4 fw-bold" style={{ color: "#333" }}>Add New Task</h3>

        {error && <Alert variant="danger" className="shadow-sm">{error}</Alert>}
        {success && <Alert variant="success" className="shadow-sm">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task title"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="rounded-3"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter task description"
              name="description"
              value={task.description}
              onChange={handleChange}
              className="rounded-3"
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100 py-2 fw-semibold"
            style={{ backgroundColor: "#667eea", borderColor: "#667eea", transition: "all 0.3s ease" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#556cd6")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#667eea")}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Adding...
              </>
            ) : (
              "Add Task"
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddTask;
