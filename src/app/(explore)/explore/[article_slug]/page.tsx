import React from "react";
import Head from "next/head";

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Welcome to My Next.js App</title>
        <meta name="description" content="A basic Next.js app setup" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold text-center">
          Welcome to My Next.js App!
        </h1>
        <p className="mt-4 text-xl text-center">
          This is a simple page built with Next.js.
        </p>
      </main>
    </div>
  );
};

export default HomePage;
