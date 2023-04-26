import Image from "next/image";
import React, { useState } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function Usermenu() {
  const [expand, setExpand] = useState(false);
  return (
    <div className="usermenu">
      <button
        onClick={() => {
          setExpand((expand) => !expand);
        }}
        className="usermenu__avatar"
      >
        <Image
          src={"/images/blog/avatar.jpg"}
          height={40}
          width={40}
          className="usermenu__img"
          alt="usermenu image"
        />
      </button>
      {expand && (
        <div className="usermenu__card">
          <div className="usermenu__card__img__wrapper">
            <Image
              className="usermenu__card__img"
              src={"/images/blog/avatar.jpg"}
              alt="usermenu image"
              fill
            />
          </div>
          <div className="usermenu__card__descriptions">
            <h5 className="usermenu__card__title">Anika Bissas</h5>
            <p className="usermenu__card__subtitle">Admin</p>
          </div>
          <div className="usermenu__card__actions">
            <button className="usermenu__card__btn">
              <ExitToAppIcon fontSize="large" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
