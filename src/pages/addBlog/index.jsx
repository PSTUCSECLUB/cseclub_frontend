import Editor from "@/components/editor";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>PSTU CSE CLUB - An non-profit organization</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to the PSTU CSE CLUB WEBSITE</h1>
        <h3>Write the blog in this blog Editor</h3>
        <div className="addBlog__wrapper">
          <Editor />
        </div>
      </main>
    </>
  );
}