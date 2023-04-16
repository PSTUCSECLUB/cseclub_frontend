import React from "react";

export default function Stepper({ steps = [], step }) {
  return (
    <div className="stepper">
      {steps.length > 0 ? (
        <div className="stepper__top__wrapper">
          <span className="stepper__label"> Step {step} - </span>
          <span className="stepper__value">{steps[step - 1].value}</span>
        </div>
      ) : (
        <p>Please provide steps</p>
      )}
    </div>
  );
}
