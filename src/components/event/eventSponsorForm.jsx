import React, { useState } from "react";
import { Remove, AddPhotoAlternate, CheckCircle } from "@mui/icons-material";
function EventSponsorForm() {
  const [sponsors, setSponsors] = useState([]);
  const [name, setName] = useState("");
  const [site, setSite] = useState("");
  const [img, setImg] = useState("");

  function handleName(e) {
    setName(e.target.value);
  }
  function handleSite(e) {
    setSite(e.target.value);
  }
  function handleImg(event) {
    if (event.target.files && event.target.files[0]) {
      const selectedImage = event.target.files[0];
      setImg(selectedImage);
    }
  }

  function handleAddSponsor() {
    if (name && img) {
      setSponsors([
        ...sponsors,
        {
          name,
          site,
          img,
        },
      ]);
      setName("");
      setSite("");
      setImg("");
    }
  }

  function handleDeleteSponsor(index) {
    const newSponsors = [...sponsors];
    newSponsors.splice(index, 1);
    setSponsors(newSponsors);
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
            onChange={handleImg}
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
        </div>
      </div>
      <button className="schedule__btn" onClick={handleAddSponsor}>
        Add Sponsor
      </button>
      <ul className="schedule__list">
        {sponsors.map((sponsor, index) => (
          <li className="schedule__list__item" key={index}>
            <span className="schedule__list__item__title">{sponsor.name}</span>
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
