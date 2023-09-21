"use client";

import * as React from "react";
import useScript from "./useScript";
import MyProfile from "./components/MyProfile";

const useEnhancedEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export default function JoyOrderDashboardTemplate() {
  const status = useScript(`https://unpkg.com/feather-icons`);

  useEnhancedEffect(() => {
    // Feather icon setup: https://github.com/feathericons/feather#4-replace
    // @ts-ignore
    if (typeof feather !== "undefined") {
      // @ts-ignore
      feather.replace();
    }
  }, [status]);

  return <h1>Dashboard</h1>;
}
