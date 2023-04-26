import AdminCover from "@/components/admin/adminCover";
import AdminLeftBar from "@/components/admin/adminLeftBar";
import AdminTopBar from "@/components/admin/adminTopBar";
import React, { useState } from "react";

export default function Admin() {
  const [leftBarExpanded, setLeftBarExpanded] = useState(true);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  return (
    <div className="admin">
      <AdminTopBar />
      <AdminLeftBar
        expanded={leftBarExpanded}
        setExpanded={setLeftBarExpanded}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div
        className={`admin__comps ${
          !leftBarExpanded && "admin__comps--collapse"
        }`}
      >
        <AdminCover
          title={selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
        />
      </div>
    </div>
  );
}
