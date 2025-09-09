import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function PrivateRoute({ children }) {
  const { state } = useAppContext()
  const location = useLocation()
  if (!state.auth.isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return children
}
