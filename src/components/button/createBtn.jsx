import React from "react";
import AddIcon from "@mui/icons-material/Add";
export default function CreateBtn({ label, onClick }) {
  return (
    <button onClick={onClick} className="form__create__btn">
      <div className="form__create__btn__icon">
        <AddIcon fontSize="large" />
        {label}
      </div>
    </button>
  );
}
