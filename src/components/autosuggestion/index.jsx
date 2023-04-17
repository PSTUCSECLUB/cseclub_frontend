import React, { useState } from "react";

export default function Autosuggestion({
  value,
  handleInputChange,
  suggestedOptions,
  handleOptionClick,
}) {
  return (
    <div>
      <input
        className="form__autosuggestion"
        type="text"
        value={value}
        onChange={handleInputChange}
      />
      <ul>
        {suggestedOptions.map((option) => (
          <li key={option} onClick={handleOptionClick}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
