import AdminLeftBar from "@/components/admin/adminLeftBar";
import AdminTopBar from "@/components/admin/adminTopBar";
import React from "react";

export default function Admin() {
  return (
    <div className="admin">
      <AdminTopBar />
      <AdminLeftBar />
    </div>
  );
}
