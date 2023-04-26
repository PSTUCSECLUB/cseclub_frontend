import { getEvents } from "@/actions/event";
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
  isLoading: false,
  events: [],
  blogs: [],
  users: [],
};

function adminReducer(state, action) {
  switch (action.type) {
    case "start_loading": {
      return { ...state, isLoading: true };
    }
    case "get_event": {
      return { ...state, isLoading: false, events: action.payload };
    }
    case "add_event": {
      return { ...state, events: [...state.events, action.payload] };
    }
    case "delete_event": {
      let afterDelete = state.events.filter((e) => e._id !== action.payload.id);
      return { ...state, events: afterDelete };
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
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  React.useEffect(() => {
    dispatch({ type: "start_loading" });
    getEvents(dispatch);
  }, []);

  const value = { state, dispatch };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

function useAdmin() {
  const context = React.useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { AdminProvider, useAdmin };
