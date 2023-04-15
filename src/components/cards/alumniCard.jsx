import Image from "next/image";
import Link from "next/link";
import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function AlumniCard() {
  return (
    <div className="alumni-card">
      <div className="alumni-card__img__wrapper">
        <Image
          src={"/images/blog/avatar.jpg"}
          fill
          className="alumni-card__img"
          alt="alumni card image"
        />
        <div className="alumni-card__badge">15th</div>
      </div>

      <div className="alumni-card__details">
        <h6 className="alumni-card__title">Aisha Sharma</h6>
        <span className="alumni-card__job">Software Engineer</span>
      </div>
      <div className="alumni-card__social__links">
        <Link href={"#"} className="alumni-card__social__link">
          <TwitterIcon fontSize="large" />
        </Link>
        <Link href={"#"} className="alumni-card__social__link">
          <FacebookIcon fontSize="large" />
        </Link>
        <Link href={"#"} className="alumni-card__social__link">
          <LinkedInIcon fontSize="large" />
        </Link>
      </div>
    </div>
  );
}
