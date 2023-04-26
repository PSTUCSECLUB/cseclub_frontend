import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
export default function AdminLeftBar({
  expanded,
  setExpanded,
  selectedTab,
  setSelectedTab,
}) {
  function handleExpand() {
    setExpanded((expanded) => !expanded);
  }
  function handleBtnClick(label) {
    setSelectedTab(label.toLowerCase());
  }
  return (
    <div
      className={`admin__leftbar ${
        !expanded && "admin__leftbar" + "--collapse"
      }`}
    >
      <button onClick={handleExpand} className="admin__leftbar__exp-btn">
        {expanded ? "<<" : ">>"}
      </button>
      <ul className="admin__leftbar__list">
        <li className="admin__leftbar__list__item">
          <ListButton
            expanded={expanded}
            label={"Dashboard"}
            onHandleClick={handleBtnClick}
            icon={<DashboardIcon fontSize="large" />}
            selectedTab={selectedTab}
          />
        </li>
        <li className="admin__leftbar__list__item">
          <ListButton
            expanded={expanded}
            label={"Events"}
            onHandleClick={handleBtnClick}
            icon={<EventIcon fontSize="large" />}
            selectedTab={selectedTab}
          />
        </li>
        <li className="admin__leftbar__list__item">
          <ListButton
            expanded={expanded}
            label={"Blogs"}
            onHandleClick={handleBtnClick}
            icon={<ArticleIcon fontSize="large" />}
            selectedTab={selectedTab}
          />
        </li>
        <li className="admin__leftbar__list__item">
          <ListButton
            expanded={expanded}
            label={"Users"}
            onHandleClick={handleBtnClick}
            icon={<PeopleAltIcon fontSize="large" />}
            selectedTab={selectedTab}
          />
        </li>
      </ul>
    </div>
  );
}

function ListButton({ label, icon, onHandleClick, expanded, selectedTab }) {
  return (
    <button
      onClick={() => onHandleClick(label)}
      className={`admin__leftbar__list__btn ${
        !expanded && "admin__leftbar__list__btn--collapse"
      } ${
        selectedTab === label.toLowerCase() && "admin__leftbar__selected__btn"
      }`}
    >
      <span className="admin__leftbar__list__btn__label">{label}</span>
      <span className="admin__leftbar__list__btn__icon">{icon}</span>
    </button>
  );
}
