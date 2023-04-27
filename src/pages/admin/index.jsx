import Admin from "@/components/admin";
import { AdminProvider } from "@/contexts/adminContext";
import React, { useState } from "react";

export default function AdminPage() {
  return (
    <AdminProvider>
      <Admin />
    </AdminProvider>
  );
}
