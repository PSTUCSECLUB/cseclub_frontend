import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function EventImagesForm({
  img,
  coverImgLand,
  coverImgPort,
  handleCoverLandChange,
  handleCoverPortChange,
  handleImgChange,
}) {
  return (
    <div className="event-images-form">
      <div className="form__controls">
        <label htmlFor="imageInput">
          Select Event Image: <AddPhotoAlternateIcon fontSize="large" />
        </label>
        <input
          type="file"
          accept="image/*"
          name="image"
          id="imageInput"
          onChange={handleImgChange}
          className="form__img__input"
        />
        {img && (
          <div className="event-images-form__success">
            <CheckCircleIcon htmlColor="#6a4bc5" fontSize="medium" />
            <span className="event-images-form__success__label">
              Event image is selected successfully
            </span>
          </div>
        )}
      </div>
      <div className="form__controls">
        <label htmlFor="coverImage">
          Select Events Landscape Cover Photo:{" "}
          <AddPhotoAlternateIcon fontSize="large" />
        </label>
        <input
          type="file"
          accept="image/*"
          name="coverImage"
          id="coverImage"
          onChange={handleCoverLandChange}
          className="form__img__input"
        />
        {coverImgLand && (
          <div className="event-images-form__success">
            <CheckCircleIcon htmlColor="#6a4bc5" fontSize="medium" />
            <span className="event-images-form__success__label">
              Event cover landscape photo is selected successfully
            </span>
          </div>
        )}
      </div>
      <div className="form__controls">
        <label htmlFor="coverImagePort">
          Select Events Portrait Cover Photo:{" "}
          <AddPhotoAlternateIcon fontSize="large" />
        </label>
        <input
          type="file"
          accept="image/*"
          name="coverImage"
          id="coverImagePort"
          onChange={handleCoverPortChange}
          className="form__img__input"
        />
        {coverImgPort && (
          <div className="event-images-form__success">
            <CheckCircleIcon htmlColor="#6a4bc5" fontSize="medium" />
            <span className="event-images-form__success__label">
              Event cover portrait photo is selected successfully
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventImagesForm;
