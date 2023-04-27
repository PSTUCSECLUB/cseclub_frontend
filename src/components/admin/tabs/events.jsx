import PanelCard from "@/components/cards/panelCard";
import React from "react";

export default function Events({ events }) {
  return (
    <div className="admin__tab admin__events">
      <div className="admin__events__wrapper">
        {events.map((e, i) => {
          return (
            <PanelCard
              key={i}
              title={e.title}
              imgUrl={e.image}
              extra={new Date(e.createdAt).toDateString()}
            />
          );
        })}
      </div>
    </div>
  );
}
