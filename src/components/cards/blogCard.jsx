import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
let description = ` description is the world of beautiful friends and world of wonderful
man is full of shits. world of beautiful friends and world of
wonderful man is full of shits`;
export default function BlogCard() {
  let router = useRouter();
  return (
    <div
      className="blog-card"
      onClick={() => {
        router.push("/blogs/234");
      }}
    >
      <div className="blog-card__img__wrapper">
        <Image
          fill
          src="/images/blog/thumbnail.jpg"
          alt="blog thumbnail"
          className="blog-card__img"
        />
      </div>
      <div className="blog-card__contents">
        <div className="blog-card__contents__top">
          <h6 className="blog-card__catagory">Competative Programming</h6>
          <h3 className="blog-card__title">
            How to earn 5 start badge in codeforces
          </h3>
        </div>
        {/* <div className="blog-card__contents__mid">
          <p>{description.slice(0, 120) + " ..."}</p>
        </div> */}
        <div className="blog-card__contents__bottom">
          <div className="blog-card__author">
            <Image
              height={40}
              width={40}
              src="/images/blog/avatar.jpg"
              alt="blog_author_image"
              className="blog-card__author__img"
            />
            <div className="blog-card__author__details">
              <span className="blog-card__author__name">Aysha Sharma</span>
              <span className="blog-card__author__job">Student</span>
            </div>
          </div>
          <span className="blog-card__duration">7 min read</span>
          {/* <button className="blog-card__btn">Read</button> */}
        </div>
      </div>
    </div>
  );
}
