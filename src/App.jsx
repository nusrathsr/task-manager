import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAppContext } from './context/AppContext'
import Home from './pages/Home'
import Login from './pages/Login'
import TaskView from './pages/tasks/TaskView'
import TaskEdit from './pages/tasks/TaskEdit'
import AddTask from './pages/tasks/AddTask'
import NavbarApp from './components/NavbarApp'
import Signup from './pages/SignUp'
import TaskList from './pages/tasks/taskList'
import TaskDetails from './pages/tasks/taskDetails'

function PrivateRoute({ children }) {
  const { state } = useAppContext()
  return state.auth.isAuthenticated ? children : <Navigate to="/login" />
}

function Layout() {
  return (
    <>
      <NavbarApp />
      <div className="container mt-4">
        <Outlet />
      </div>
    </>
  )
}

export default function App() {
  return (
    <Routes>
      {/* Layout route */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route
          path="tasks"
          element={
            <PrivateRoute>
              <TaskList />
            </PrivateRoute>
          }
        />
        <Route
  path="tasks/add"
  element={
    <PrivateRoute>
      <AddTask />
    </PrivateRoute>
  }
/>
        <Route
          path="tasks/:id"
          element={
            <PrivateRoute>
              <TaskDetails />
            </PrivateRoute>
          }
        >
          <Route index element={<TaskView />} />
          <Route path="edit" element={<TaskEdit />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}
