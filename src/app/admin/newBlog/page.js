"use client";
import { useIsAdmin } from "@/app/hooks/isAdmin";
import React from "react";

export default function index() {
  useIsAdmin();
  return <div>We are working on that!</div>;
}
