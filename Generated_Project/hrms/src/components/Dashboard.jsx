import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import DashboardCard from "./DashboardCard";
// Import icons from react-icons (Font Awesome)
import { FaUserPlus, FaUserCog, FaCalendarCheck, FaMoneyBillWave } from "react-icons/fa";

/**
 * Dashboard component – displays core HR function cards and a summary section.
 */
const Dashboard = () => {
  // Define the core HR function cards
  const cards = [
    {
      title: "Employee Onboarding",
      icon: <FaUserPlus />, // React element
      link: "/onboarding",
      bgColor: "#e8f5e9", // light green background (optional)
    },
    {
      title: "Profile Management",
      icon: <FaUserCog />,
      link: "/profile",
      bgColor: "#e3f2fd", // light blue background
    },
    {
      title: "Attendance Tracking",
      icon: <FaCalendarCheck />,
      link: "/attendance",
      bgColor: "#fff3e0", // light orange background
    },
    {
      title: "Payroll Visibility",
      icon: <FaMoneyBillWave />,
      link: "/payroll",
      bgColor: "#f3e5f5", // light purple background
    },
  ];

  // Dummy summary statistics – can be replaced with real data later
  const summaryStats = [
    { label: "Total Employees", value: 124 },
    { label: "Today's Attendance", value: "112 / 124" },
    { label: "Pending Onboardings", value: 5 },
    { label: "Payroll Runs This Month", value: 1 },
  ];

  return (
    <Container className="main-content mt-4">
      {/* Core HR function cards */}
      <Row className="g-4 mb-5">
        {cards.map((card, idx) => (
          <Col key={idx} md={6} lg={3}>
            <DashboardCard {...card} />
          </Col>
        ))}
      </Row>

      {/* Summary section – placeholder cards */}
      <h3 className="mb-3">Summary</h3>
      <Row className="g-3">
        {summaryStats.map((stat, idx) => (
          <Col key={idx} xs={12} sm={6} md={3}>
            <Card className="text-center h-100">
              <Card.Body>
                <Card.Title>{stat.label}</Card.Title>
                <Card.Text style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{stat.value}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
