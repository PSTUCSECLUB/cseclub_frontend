import Image from "next/image";
import React from "react";

export default function ExecutiveCard({
  imgUrl = "/images/blog/avatar.jpg",
  title = "Aisha Sharma",
  position = "President",
}) {
  return (
    <div className="executive-card">
      <div className="executive-card__img__wrapper">
        <Image
          className="executive-card__img"
          fill
          src={imgUrl}
          alt="executive member image"
        />
      </div>
      <div className="executive-card__details">
        <h3 className="executive-card__title">{title}</h3>
        <p className="executive-card__position">{position}</p>
      </div>
    </div>
  );
}
