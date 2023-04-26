import React, { useState } from "react";
import Usermenu from "../usermenu";

export default function AdminTopBar() {
  return (
    <div className="admin__topbar">
      <div className="admin__topbar__left">
        <div className="admin__topbar__logo">Logo</div>
        <div className="admin__topbar__title">Admin Panel</div>
      </div>
      <div className="admin__topbar__right">
        <Usermenu />
      </div>
    </div>
  );
}
