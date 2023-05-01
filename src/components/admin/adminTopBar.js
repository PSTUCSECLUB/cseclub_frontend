import React, { useState } from "react";
import Usermenu from "../usermenu";
import Link from "next/link";

export default function AdminTopBar() {
  return (
    <div className="admin__topbar">
      <div className="admin__topbar__left">
        <div className="admin__topbar__logo">Logo</div>
        <Link href={"/admin"} className="admin__topbar__title">
          Admin Panel
        </Link>
      </div>
      <div className="admin__topbar__right">
        <Usermenu />
      </div>
    </div>
  );
}
