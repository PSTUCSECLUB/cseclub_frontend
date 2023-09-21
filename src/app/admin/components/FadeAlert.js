import { Alert } from "@mui/joy";
import React, { useEffect, useState } from "react";

export default function FadeAlert({ msg }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, []);
  return show && <Alert color="danger">{msg}</Alert>;
}
