import AdminCover from "@/components/admin/adminCover";
import AdminLeftBar from "@/components/admin/adminLeftBar";
import AdminTopBar from "@/components/admin/adminTopBar";
import Blogs from "@/components/admin/tabs/blogs";
import Dashboard from "@/components/admin/tabs/dashboard";
import Events from "@/components/admin/tabs/events";
import Users from "@/components/admin/tabs/users";
import React, { useState } from "react";

export default function Admin() {
  const [leftBarExpanded, setLeftBarExpanded] = useState(true);
  const [selectedTab, setSelectedTab] = useState("dashboard");

  function chooseComp(selectedTab) {
    if (selectedTab === "dashboard")
      return <Dashboard setSelected={setSelectedTab} />;
    if (selectedTab === "events") return <Events />;
    if (selectedTab === "blogs") return <Blogs />;
    if (selectedTab === "users") return <Users />;
  }

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
        {chooseComp(selectedTab)}
      </div>
    </div>
  );
}
