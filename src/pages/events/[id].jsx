import Head from "next/head";
import Image from "next/image";
import React from "react";

export default function Event() {
  return (
    <>
      <Head>
        <title>PSTU CSE CLUB - An non-profit organization</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="event">
        <div className="event__coverimg__wrapper">
          {" "}
          <Image
            className="event__coverimg"
            src={"/images/event/event_cover.jpg"}
            alt="event cover image"
            fill
          />
        </div>
        <main className="event__contents">
          <article className="event__article">
            <h3>Description:</h3>
            <p>
              SWE Society, SUST will host “Brain Station 23 Hackathon” which
              will be a 36 hour long collaborative programming contest to build
              new web and mobile services. This will be an onsite hackathon held
              on the premises of Shahjalal University of Science and Technology.
              The main contest will start at 10:00 PM on January 26, 2023. The
              main contest will consist of 3 categories- Education, Online
              Sustainability and Industry 4.0. Participants will be given a
              problem statement for each of the 3 categories, and they will try
              to solve any one of the problems with mobile services or web
              services. The registration fee for the contest is 3000 taka and
              the total prize money is 80K taka, which will be distributed among
              the Top 3 teams.
            </p>
            <h3>Selection Process</h3>
            <ul>
              <li>There may or may not be a selection round.</li>
              <li>
                If there is a selection round all teams that have registered
                will be notified.
              </li>
              <li>
                Teams that will not be qualified for the final round will get a
                refund of their registration fee in 3-4 working days.
              </li>
              <li>
                Teams that are selected will participate in the final round.
              </li>
              <li>Heap Sort</li>
            </ul>
            <h3>Hackathon Judgement</h3>
            <ul>
              <li>There may or may not be a selection round.</li>
              <li>
                If there is a selection round all teams that have registered
                will be notified.
              </li>
              <li>
                Teams that will not be qualified for the final round will get a
                refund of their registration fee in 3-4 working days.
              </li>
              <li>
                Teams that are selected will participate in the final round.
              </li>
              <li>Heap Sort</li>
            </ul>
            <a href="www.google.com">More on this</a>
            <h3>Langueages you need to know</h3>
            <ul>
              <li>C#</li>
              <li>C++</li>
              <li>Go</li>
              <li>Python</li>
              <li>Java</li>
              <li>Typescript</li>
            </ul>
            <h3>See an example:</h3>

            <img src="/images/blog/blog_cover.webp" alt="blog_cover" />
            <h4>First See an example</h4>
          </article>
        </main>
      </div>
    </>
  );
}