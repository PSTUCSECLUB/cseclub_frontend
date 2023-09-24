"use client";
const { useRouter } = require("next/navigation");

export function useIsAdmin() {
  let router = useRouter();
  if (typeof window !== "undefined") {
    let token = sessionStorage.getItem("adminToken");
    if (!token) router.replace("/admin/signin");
  }
}
