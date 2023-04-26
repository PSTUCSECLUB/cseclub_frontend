import React from "react";
import DashboardCard from "../cards/dashboardCard";

export default function Dashboard({ setSelected }) {
  return (
    <div className="admin__dashboard admin__tab">
      <div className="admin__dashboard__welcome">
        <h1>
          Hey Anika! 🖖<br></br> Welcome to the dashboard
        </h1>
      </div>
      <div className="admin__dashboard__cards">
        <DashboardCard
          setSelected={setSelected}
          counts={23}
          label={"Events"}
          num={1}
        />
        <DashboardCard
          setSelected={setSelected}
          counts={19}
          label={"Blogs"}
          num={0}
        />
        <DashboardCard
          setSelected={setSelected}
          counts={288}
          label={"Users"}
          num={2}
        />
      </div>
    </div>
  );
}
