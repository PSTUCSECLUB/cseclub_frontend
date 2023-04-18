import React, { useState } from "react";
import { Remove, AddPhotoAlternate, CheckCircle } from "@mui/icons-material";
import Image from "next/image";
function EventSponsorForm({ sponsors, onAdd, onDelete }) {
  const [name, setName] = useState("");
  const [site, setSite] = useState("");
  const [img, setImg] = useState(null);

  function handleName(e) {
    setName(e.target.value);
  }
  function handleSite(e) {
    setSite(e.target.value);
  }
  function handleImg(event) {
    console.log(img);
    if (event.target.files && event.target.files[0]) {
      const selectedImage = event.target.files[0];
      setImg(selectedImage);
    }
  }

  function handleAddSponsor() {
    if (name && img) {
      onAdd({ name, site, img });

      setName("");
      setSite("");
      setImg(null);
    }
  }

  function handleDeleteSponsor(index) {
    onDelete(index);
  }

  return (
    <div className="sponsors__form">
      <h2 style={{ marginBottom: "1rem" }}>Event Sponsors</h2>
      <div className="sponsors__inputs">
        <input
          type="text"
          placeholder="Sponsor Name"
          value={name}
          onChange={handleName}
        />
        <input
          type="text"
          placeholder="Sponsor Website Link"
          value={site}
          onChange={handleSite}
        />
        <div className="form__controls">
          <label htmlFor="imageInput">
            Select that sponsor photo: <AddPhotoAlternate fontSize="large" />
          </label>
          <input
            type="file"
            accept="image/*"
            name="img"
            id="imageInput"
            onChange={(e) => {
              console.log("clicked");
              handleImg(e);
            }}
            className="form__img__input"
          />
          {img && (
            <div className="event-images-form__success">
              <CheckCircle htmlColor="#6a4bc5" fontSize="medium" />
              <span className="event-images-form__success__label">
                Sponsor photo is selected successfully
              </span>
            </div>
          )}
          {img && (
            <Image
              src={URL.createObjectURL(img)}
              width={40}
              height={40}
              alt="img"
            />
          )}
        </div>
      </div>
      <button className="schedule__btn" onClick={handleAddSponsor}>
        Add Sponsor
      </button>
      <ul className="schedule__list">
        {sponsors.map((sponsor, index) => (
          <li
            style={{
              flexDirection: "row",
              alignContent: "center",
              gap: "10px",
            }}
            className="schedule__list__item"
            key={index}
          >
            <span className="schedule__list__item__title">{sponsor.name}</span>
            <Image
              src={URL.createObjectURL(sponsor.img)}
              width={40}
              height={40}
              alt="img"
            />
            <button
              className="schedule__delete__btn"
              onClick={() => handleDeleteSponsor(index)}
            >
              <Remove fontSize="large" color="error" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventSponsorForm;
