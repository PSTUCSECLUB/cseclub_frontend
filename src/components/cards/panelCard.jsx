import Image from "next/image";
import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export default function PanelCard({
  imgUrl,
  title,
  extra,
  handleAction = () => {},
}) {
  const [showAlert, setShowAlert] = useState(false);
  const handleClickDefaultBtn = () => {
    setShowAlert(true);
  };

  return (
    <div className="panel-card">
      <div className="panel-card__default">
        <div className="panel-card__default__left">
          <Image
            className="panel-card__default__img"
            src={imgUrl}
            alt=""
            width={60}
            height={40}
          />
          <h3 className="panel-card__default__title">{title}</h3>
          <p className="panel-card__default__extra">{extra}</p>
        </div>
        <div className="panel-card__default__right">
          <button
            onClick={handleClickDefaultBtn}
            className="panel-card__action-btn"
          >
            <ModeEditIcon fontSize="large" />
          </button>
          <button
            onClick={handleClickDefaultBtn}
            className="panel-card__action-btn"
          >
            <ClearIcon fontSize="large" />
          </button>
        </div>
      </div>
      <div
        className={`panel-card__alert ${
          showAlert && "panel-card__alert--show"
        }`}
      >
        <div className="panel-card__alert__left">
          <button
            onClick={() => {
              setShowAlert(false);
            }}
            className="panel-card__alert__cancel-btn"
          >
            <ClearIcon fontSize="medium" />
          </button>
          <p className="panel-card__alert__msg">Are you sure !</p>
        </div>
        <div className="panel-card__alert__right">
          <button
            onClick={handleAction}
            className="panel-card__alert__btn panel-card__alert__btn--primary"
          >
            Yes
          </button>
          <button
            onClick={() => {
              setShowAlert(false);
            }}
            className="panel-card__alert__btn panel-card__alert__btn--secondary"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}