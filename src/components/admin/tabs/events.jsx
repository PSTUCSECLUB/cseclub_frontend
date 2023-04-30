import Autosuggestion from "@/components/autosuggestion";
import CreateBtn from "@/components/button/createBtn";
import PanelCard from "@/components/cards/panelCard";
import Paginate from "@/components/paginate/paginate";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import EventCard from "../cards/eventCard";
import { useAdmin } from "@/contexts/adminContext";

//option- id,title

const options = [
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
];
export default function Events({ itemsPerPage = 8 }) {
  const { state } = useAdmin();
  const [processedEvents, setProcessedEvents] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  const router = useRouter();
  const endOffset = itemOffset + itemsPerPage;
  const currentEvents = processedEvents.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(processedEvents.length / itemsPerPage);

  useEffect(() => {
    setProcessedEvents(state.events);
  }, [state.events]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % processedEvents.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    processEvents(e.target.value, selectedDate);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSearchValue("");
    processEvents("", date);
  };
  function processEvents(searchVal, date) {
    console.log(searchVal, date);
    if (searchVal === "" && !date) {
      setProcessedEvents(state.events);
    } else {
      // first find that fall into the year
      let dateFiltered = state.events;
      if (date) {
        const nextYear = new Date(String(Number(date) + 1));

        dateFiltered = dateFiltered.filter((e) => {
          const createdDate = new Date(e.createdAt);
          if (createdDate >= new Date(date) && createdDate < nextYear) {
            return e;
          }
        });
      }
      let filteredEvents = dateFiltered;
      if (searchVal !== "") {
        filteredEvents = filteredEvents.filter((event) =>
          event.title.toLowerCase().startsWith(searchVal.toLowerCase())
        );
      }
      setProcessedEvents(filteredEvents);
    }
  }

  return (
    <div className="admin__tab admin__events">
      <div className="admin__events__container">
        <div className="admin__events__actions">
          <div className="admin__events__actions__left">
            <input
              type="text"
              placeholder="Search event here"
              className="form__input-text"
              value={searchValue}
              onChange={handleSearch}
            />
            <Select
              placeholder="filter by year"
              defaultValue={selectedDate}
              onChange={(e) => {
                handleDateChange(e.value);
              }}
              options={options}
            />
          </div>
          <div className="admin__events__actions__right">
            <CreateBtn
              label={"Add Event"}
              onClick={() => {
                router.push("/admin/addEvent");
              }}
            />
          </div>
        </div>
        {currentEvents.length === 0 ? (
          <p>There is no events</p>
        ) : (
          <div className="admin__events__wrapper">
            {currentEvents.map((e, i) => {
              return <EventCard key={i} event={e} />;
            })}
          </div>
        )}
        <div className="admin__events__paginate__wrapper">
          <Paginate handlePageClick={handlePageClick} pageCount={pageCount} />
        </div>
      </div>
    </div>
  );
}
