import PanelCard from "@/components/cards/panelCard";
import Paginate from "@/components/paginate/paginate";
import React, { useState } from "react";

export default function Events({ events, itemsPerPage = 8 }) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentEvents = events.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(events.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % events.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div className="admin__tab admin__events">
      <div className="admin__events__wrapper">
        {currentEvents.map((e, i) => {
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
      <div className="admin__events__paginate__wrapper">
        <Paginate handlePageClick={handlePageClick} pageCount={pageCount} />
      </div>
    </div>
  );
}
