import * as React from "react";

const AdminContext = React.createContext();

let initialState = localStorage.getItem("pstu_cse_club_admin")
  ? localStorage.getItem("pstu_cse_club_admin")
  : {
      isLoading: false,
      events: [],
      blogs: [],
      users: [],
    };

function getInitialData() {}
function adminReducer(state, action) {
  switch (action.type) {
    case "add_event": {
      return { count: state.count + 1 };
    }
    case "delete_event": {
      return { count: state.count - 1 };
    }
    case "update_event": {
      return { count: state.count - 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AdminProvider({ children }) {
  const [state, dispatch] = React.useReducer(adminReducer, initialState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
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
