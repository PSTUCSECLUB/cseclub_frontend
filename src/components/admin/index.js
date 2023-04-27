import { getBlogs } from "@/actions/blog";
import { getEvents } from "@/actions/event";
import { getUsers } from "@/actions/user";
import AdminCover from "@/components/admin/adminCover";
import AdminLeftBar from "@/components/admin/adminLeftBar";
import AdminTopBar from "@/components/admin/adminTopBar";
import Blogs from "@/components/admin/tabs/blogs";
import Dashboard from "@/components/admin/tabs/dashboard";
import Events from "@/components/admin/tabs/events";
import Users from "@/components/admin/tabs/users";
import { AdminProvider, useAdmin } from "@/contexts/adminContext";
import Image from "next/image";
import React, { useState } from "react";
import { MutatingDots } from "react-loader-spinner";

export default function Admin() {
  const [leftBarExpanded, setLeftBarExpanded] = useState(false);
  const [selectedTab, setSelectedTab] = useState("dashboard");

  const { dispatch, state } = useAdmin();
  const { error, loading, events, blogs, users } = state;
  function chooseComp(selectedTab) {
    if (selectedTab === "dashboard")
      return (
        <Dashboard
          adminData={getDashboardData()}
          setSelected={setSelectedTab}
        />
      );
    if (selectedTab === "events") return <Events events={events} />;
    if (selectedTab === "blogs") return <Blogs />;
    if (selectedTab === "users") return <Users />;
  }

  function getDashboardData() {
    return {
      eventCounts: events.length,
      blogCounts: blogs.length,
      userCounts: users.length,
    };
  }
  function retryFetching() {
    dispatch({ type: "start_loading" });
    getEvents(dispatch);
    getBlogs(dispatch);
    getUsers(dispatch);
  }
  return (
    <div className="admin">
      <AdminProvider>
        <AdminTopBar />
        {loading && (
          <div className="admin__loading">
            <div className="admin__loading__wrapper">
              <div className="admin__loading__spinner">
                <MutatingDots
                  height="100"
                  width="100"
                  color="#4fa94d"
                  secondaryColor="#4fa94d"
                  radius="12.5"
                  ariaLabel="mutating-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
              <p className="admin__loading__msg">
                please wait! it will take some times to load whole data
              </p>
            </div>
          </div>
        )}
        {!loading && error && (
          <div className="admin__error">
            <div className="admin__error__wrapper">
              <Image
                src={"/images/error.svg"}
                alt="error"
                height={100}
                width={100}
                className="admin__error__img"
              ></Image>
              <p className="admin__error__msg">
                Failed to fetch data from the server. <br></br>
                Please check your internet connection!
              </p>
              <button onClick={retryFetching} className="admin__error__btn">
                Retry again!
              </button>
            </div>
          </div>
        )}
        {!loading && !error && (
          <>
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
                title={
                  selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)
                }
              />
              {chooseComp(selectedTab)}
            </div>
          </>
        )}
      </AdminProvider>
    </div>
  );
}
