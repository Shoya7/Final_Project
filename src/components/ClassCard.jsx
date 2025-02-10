import React from "react";
import "./ClassCard.css";

const ClassCard = ({ className, role, description }) => {
  return (
    <div className="class">
      <h3 className="class__name">{className}</h3>
      <span className="class__role">{role}</span>
      <p className="class__description">{description}</p>
    </div>
  );
};

export default ClassCard;
