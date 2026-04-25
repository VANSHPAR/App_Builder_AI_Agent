import React from "react";
import { Card, Button } from "react-bootstrap";

/**
 * DashboardCard component
 * @param {Object} props
 * @param {string} props.title - Title text for the card
 * @param {React.ReactElement|string} props.icon - Icon element or a string classname for an <i> element
 * @param {string} props.link - URL to navigate to when button is clicked
 * @param {string} [props.bgColor] - Optional background color for the card
 */
const DashboardCard = ({ title, icon, link, bgColor }) => {
  const renderIcon = () => {
    if (!icon) return null;
    // If icon is a string, treat it as a classname for an <i> element
    if (typeof icon === "string") {
      return <i className={icon} aria-hidden="true" />;
    }
    // Otherwise assume it is a valid React element
    return icon;
  };

  const handleClick = () => {
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <Card className="text-center h-100" style={{ backgroundColor: bgColor || "#fff" }}>
      <Card.Body>
        {renderIcon() && (
          <div className="mb-3" style={{ fontSize: "2rem" }}>
            {renderIcon()}
          </div>
        )}
        <Card.Title>{title}</Card.Title>
        <Button variant="primary" onClick={handleClick}>
          Go
        </Button>
      </Card.Body>
    </Card>
  );
};

export default DashboardCard;
