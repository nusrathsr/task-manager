import React from 'react'
import { Spinner as RBSpinner } from 'react-bootstrap'

export default function Spinner() {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <RBSpinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </RBSpinner>
    </div>
  )
}
