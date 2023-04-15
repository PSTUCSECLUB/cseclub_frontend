import React from "react";

export default function PageCover({
  title = "Stay curious",
  subTitle = " Discover stories, thinking, and expertise from your friends",
}) {
  return (
    <div className="page__cover">
      <h2 className="page__cover__title">{title}</h2>
      <p className="page__cover__subtitle">{subTitle}</p>
    </div>
  );
}
