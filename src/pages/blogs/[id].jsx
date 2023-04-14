import Head from "next/head";
import Image from "next/image";
import React from "react";

export default function Blog() {
  return (
    <>
      <Head>
        <title>PSTU CSE CLUB - An non-profit organization</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="blog">
        <main className="blog__contents">
          <div className="blog__coverimg__wrapper">
            {" "}
            <Image
              className="blog__coverimg"
              src={"/images/blog/blog_cover.webp"}
              alt="blog cover image"
              fill
            />
          </div>
          <div className="blog__info">
            <h6 className="blog__catagory__label">/ Competative Programming</h6>
            <h2 className="blog__title">
              5 tips to become a great competative programmer
            </h2>
            <div className="blog__info__bottom">
              <div className="blog__info__bottom__left">
                <div className="blog__info__author">
                  <div className="blog__info__author__avatar__wrapper">
                    <Image
                      className="blog__info__author__avatar"
                      src={"/images/blog/avatar.jpg"}
                      alt="avatar"
                      fill
                    />
                  </div>

                  <div className="blog__info__author__details">
                    <span className="blog__info__author__name">
                      Aiasha Sharma
                    </span>
                    <span className="blog__info__author__job">Student</span>
                  </div>
                </div>
              </div>
              <div className="blog__info__bottom__right">
                <span className="blog__info__date">March 09,2023</span>
                <span className="blog__info__dash">-</span>
                <span className="blog__info__duration">4 Mnute Read</span>
              </div>
            </div>
          </div>
          <article className="blog__article">
            <p>
              <span>T</span>hese days, we use devices and input our data in them
              all the time. However, it seems that we are not aware that when a
              device is connected to the Internet, it can be hacked. People’s
              information is stored in databases all over the world, and all
              those databases are vulnerable to cybercrimes. Furthermore, as
              each day goes by, hackers grow more hi-tech and malicious.
              Therefore, nowadays, the importance of having someone in charge of
              our organization’s cybersecurity is crucial. Here are the top
              reasons why you should come to Harbour.Space and study Cyber
              Security.
            </p>
            <h3>Topics you need to know:</h3>
            <ol>
              <li>Binary Search</li>
              <li>Binary Search</li>
              <li>Binary Search</li>
              <li>Binary Search</li>
              <li>Binary Search</li>
              <li>Binary Search</li>
              <li>Binary Search</li>
              <li>Binary Search</li>
              <li>Binary Search</li>
              <li>Binary Search</li>
            </ol>
            <a href="www.google.com">More on this</a>
            <h3>Peoples are trying this also</h3>
            <ul>
              <li>C#</li>
              <li>C#</li>
              <li>C#</li>
              <li>C#</li>
              <li>C#</li>
              <li>C#</li>
              <li>C#</li>
              <li>C#</li>
            </ul>
            <h3>See an example:</h3>
            <h4>First See an example</h4>
            <img src="/images/blog/blog_cover.webp" alt="blog_cover" />
          </article>
        </main>
      </div>
    </>
  );
}