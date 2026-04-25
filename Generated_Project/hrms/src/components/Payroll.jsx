import React, { useState, useEffect } from 'react';
import { Card, Table, Container, Row, Col } from 'react-bootstrap';
import { payrollHistory } from '../mockData/payrollData';

/**
 * Payroll component displays a history of payroll records.
 * It loads mock data on mount and renders a summary card followed by
 * individual month cards that contain a table of salary details.
 */
const Payroll = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Simulate fetching payroll data
    setHistory(payrollHistory);
  }, []);

  // Compute totals for the summary card – guard against empty history
  const totals = history.reduce(
    (acc, rec) => {
      acc.baseSalary += rec.baseSalary;
      acc.bonuses += rec.bonuses;
      acc.deductions += rec.deductions;
      acc.netPay += rec.netPay;
      return acc;
    },
    { baseSalary: 0, bonuses: 0, deductions: 0, netPay: 0 }
  );

  return (
    <Container fluid className="my-4">
      <Row className="mb-4">
        <Col>
          <h2>Payroll History</h2>
        </Col>
      </Row>

      {/* Summary Card */}
      {history.length > 0 && (
        <Row className="mb-4">
          <Col>
            <Card bg="light">
              <Card.Body>
                <Card.Title>Summary (Last {history.length} months)</Card.Title>
                <Table striped bordered hover responsive className="mb-0">
                  <thead>
                    <tr>
                      <th>Total Base Salary</th>
                      <th>Total Bonuses</th>
                      <th>Total Deductions</th>
                      <th>Total Net Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>${totals.baseSalary.toLocaleString()}</td>
                      <td>${totals.bonuses.toLocaleString()}</td>
                      <td>${totals.deductions.toLocaleString()}</td>
                      <td>${totals.netPay.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Individual month cards */}
      {history.map((record) => (
        <Row key={record.id} className="mb-4">
          <Col>
            <Card>
              <Card.Header>{record.month}</Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <tbody>
                    <tr>
                      <th>Base Salary</th>
                      <td>${record.baseSalary.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <th>Bonuses</th>
                      <td>${record.bonuses.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <th>Deductions</th>
                      <td>${record.deductions.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <th>Net Pay</th>
                      <td>${record.netPay.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default Payroll;
