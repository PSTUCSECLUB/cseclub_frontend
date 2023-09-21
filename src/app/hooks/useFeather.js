"use client";
import { useEffect, useLayoutEffect } from "react";
import useScript from "../admin/useScript";

const useEnhancedEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
export default function useFeather() {
  const status = useScript(`https://unpkg.com/feather-icons`);

  useEnhancedEffect(() => {
    // Feather icon setup: https://github.com/feathericons/feather#4-replace
    // @ts-ignore
    if (typeof feather !== "undefined") {
      // @ts-ignore
      feather.replace();
    }
  }, [status]);
}
