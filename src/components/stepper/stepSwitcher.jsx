import React from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CheckIcon from "@mui/icons-material/Check";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
export default function StepSwitcher({ steps, setStep, excepts = [] }) {
  const handleClick = (step) => {
    // is Previous step is validated
    let isPrevValidated = true;
    steps.forEach((s) => {
      if (s.no < step.no) {
        if (!s.validated) {
          isPrevValidated = false;
          return;
        }
      }
    });
    if (excepts.includes(step.no)) isPrevValidated = true;
    if (isPrevValidated && step.validated) {
      setStep(step.no);
      return;
    }
  };
  return (
    <div className="step-switcher">
      {steps?.map((step, i) => {
        return (
          <div key={i} className="step-switcher__item">
            <button
              onClick={() => {
                handleClick(step);
              }}
              className={`step-switcher__btn   ${
                step.validated && "step-switcher__btn--validated"
              }
                  `}
            >
              <span
                className={`step-switcher__btn__icon step-switcher__btn__icon--${
                  step.validated ? "validated" : "not-validated"
                }`}
              >
                {step.validated ? (
                  <CheckIcon htmlColor="#fff" fontSize="medium" />
                ) : (
                  <QuestionMarkIcon htmlColor="#fff" fontSize="medium" />
                )}
              </span>
              {step.title}
            </button>
          </div>
        );
      })}
    </div>
  );
}
