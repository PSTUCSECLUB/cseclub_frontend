import React from "react";
import EventIcon from "@mui/icons-material/Event";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

function chooseIcon(label) {
  let lowerCaseLabel = label.toLowerCase();
  if (lowerCaseLabel === "events") return <EventIcon fontSize="large" />;
  if (lowerCaseLabel === "blogs") return <ArticleIcon fontSize="large" />;
  if (lowerCaseLabel === "users") return <PeopleAltIcon fontSize="large" />;
}
export default function DashboardCard({ num = 0, label, counts, setSelected }) {
  return (
    <div
      className={`admin__dashboard__card ${
        "admin__dashboard__card" + "--" + num
      }`}
    >
      <h2 className="admin__dashboard__card__title">
        {chooseIcon(label)} Total {label}:
      </h2>
      <h1 className="admin__dashboard__card__num">{counts}</h1>
      <button
        onClick={() => {
          setSelected(label.toLowerCase());
        }}
        className="admin__dashboard__card__btn"
      >
        Browse {label}
      </button>
    </div>
  );
}
