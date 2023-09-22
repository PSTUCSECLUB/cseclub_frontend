"use client";
const { useRouter } = require("next/navigation");

export function useIsAdmin() {
  let router = useRouter();
  let token = sessionStorage.getItem("adminToken");
  if (!token) router.replace("/admin/signin");
}
