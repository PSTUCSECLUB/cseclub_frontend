import { getBlogs } from "@/actions/blog";
import { getEvents } from "@/actions/event";
import { getUsers } from "@/actions/user";
import * as React from "react";

const AdminContext = React.createContext();

// let initialState = localStorage.getItem("pstu_cse_club_admin")
//   ? localStorage.getItem("pstu_cse_club_admin")
//   : {
//       isLoading: false,
//       events: [],
//       blogs: [],
//       users: [],
//     };

const initialState = {
  error: false,
  loading: true,
  events: [],
  blogs: [],
  users: [],
};

function adminReducer(state, action) {
  switch (action.type) {
    case "start_loading": {
      return { ...state, loading: true };
    }
    case "end_loading": {
      return { ...state, loading: false };
    }
    case "error": {
      return { ...state, error: true, loading: false };
    }
    case "get_events": {
      return { ...state, events: action.payload, loading: false };
    }
    case "add_event": {
      return { ...state, events: [...state.events, action.payload] };
    }
    case "delete_event": {
      let afterDelete = state.events.filter((e) => e._id !== action.payload.id);
      return { ...state, events: afterDelete };
    }
    case "get_blogs": {
      return { ...state, blogs: action.payload, loading: false };
    }
    case "add_blog": {
      return { ...state, blogs: [...state.blogs, action.payload] };
    }
    case "delete_blog": {
      let afterDelete = state.blogs.filter((e) => e._id !== action.payload.id);
      return { ...state, blogs: afterDelete };
    }
    case "get_users": {
      return {
        ...state,
        isLoading: false,
        users: action.payload,
        loading: false,
      };
    }

    // case "update_event": {
    //   return { count: state.count - 1 };
    // }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AdminProvider({ children }) {
  const [state, dispatch] = React.useReducer(adminReducer, initialState);
  console.log("in provider");
  console.log(state.events);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  React.useEffect(() => {
    getEvents(dispatch);
    getBlogs(dispatch);
    getUsers(dispatch);
  }, []);

  const value = { state, dispatch };
  return (
    <AdminContext.Provider value={value}>
      {children}
      {console.log(state.events)}
    </AdminContext.Provider>
  );
}

function useAdmin() {
  const context = React.useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within a AdminProvider");
  }
  return context;
}

export { AdminProvider, useAdmin };
