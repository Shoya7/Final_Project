import React from "react";
import "./ClassCard.css";

const ClassCard = ({ className, role, description }) => {
  return (
    <div className="class-card">
      <h3 className="class-name">{className}</h3>
      <span className="class-role">{role}</span>
      <p className="class-description">{description}</p>
    </div>
  );
};

export default ClassCard;
