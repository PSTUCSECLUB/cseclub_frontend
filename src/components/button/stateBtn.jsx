import React from "react";
import { ProgressBar } from "react-loader-spinner";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// initialLabel, loadingLabel, successLabel, errorLabel, handleAction
// state = 'success', 'error, 'loading','initial'

function getClassName(state) {
  if (state === "success") {
    return "state-btn--success";
  }
  if (state === "error") {
    return "state-btn--error";
  }
  if (state === "loading") {
    return "state-btn--loading";
  }
}
export default function StateBtn({
  label = "added to event page",
  state = "success",
  handleAction = () => {},
}) {
  const handleClick = () => {
    if (state === "loading") return;
    handleAction();
  };
  return (
    <button
      onClick={handleClick}
      className={`state-btn ${getClassName(state)}`}
    >
      {state === "loading" && (
        <ProgressBar
          height="40"
          width="40"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor="#F4442E"
          barColor="#51E5FF"
        />
      )}
      {state === "error" && <RestartAltIcon fontSize="medium" />}
      {state === "success" && <CheckCircleIcon fontSize="large" />} {label}
    </button>
  );
}

// state
