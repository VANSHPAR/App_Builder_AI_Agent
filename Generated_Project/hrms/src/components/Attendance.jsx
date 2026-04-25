import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';
import { attendanceRecords } from '../mockData/attendanceData';
import StatusBadge from './Reusable/StatusBadge';

/**
 * Attendance component displays a list of attendance records in a table.
 * It simulates fetching data by loading mock data on mount.
 */
const Attendance = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Simulate data fetch
    setRecords(attendanceRecords);
  }, []);

  return (
    <Container fluid className="my-4">
      <Row>
        <Col>
          <h2 className="mb-3">Attendance</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Check‑In</th>
                <th>Check‑Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                  <td>{record.checkIn || '-'}</td>
                  <td>{record.checkOut || '-'}</td>
                  <td>
                    <StatusBadge status={record.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Attendance;
