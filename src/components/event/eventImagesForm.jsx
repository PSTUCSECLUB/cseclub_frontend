import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function EventImagesForm(props) {
  const [image, setImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  function handleChange(event) {
    if (event.target.files && event.target.files[0]) {
      const selectedImage = event.target.files[0];
      setImage(selectedImage);
    }
  }

  function handleCoverChange(event) {
    if (event.target.files && event.target.files[0]) {
      const selectedImage = event.target.files[0];
      setCoverImage(selectedImage);
    }
  }

  return (
    <div className="event-images-form">
      <div className="form__controls">
        <label htmlFor="imageInput">
          Select Event Photo: <AddPhotoAlternateIcon fontSize="large" />
        </label>
        <input
          type="file"
          accept="image/*"
          name="image"
          id="imageInput"
          onChange={handleChange}
          className="form__img__input"
        />
        {image && (
          <div className="event-images-form__success">
            <CheckCircleIcon htmlColor="#6a4bc5" fontSize="medium" />
            <span className="event-images-form__success__label">
              Event photo is selected successfully
            </span>
          </div>
        )}
      </div>
      <div className="form__controls">
        <label htmlFor="coverImage">
          Select Event Cover Photo: <AddPhotoAlternateIcon fontSize="large" />
        </label>
        <input
          type="file"
          accept="image/*"
          name="coverImage"
          id="coverImage"
          onChange={handleCoverChange}
          className="form__img__input"
        />
        {coverImage && (
          <div className="event-images-form__success">
            <CheckCircleIcon htmlColor="#6a4bc5" fontSize="medium" />
            <span className="event-images-form__success__label">
              Event cover photo is selected successfully
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventImagesForm;
