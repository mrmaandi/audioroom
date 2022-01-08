import Head from "next/head";
import React from "react";
import Center from "../components/Center";
import Header from "../components/Header";
import MainContent from "../components/MainContent";

export default function Home() {
  return (
    <div className="h-screen bg-slate-50">
    
        <Head>
          <title>Audiorooms</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <Header />
          <MainContent />
        </main>
    </div>
  );
}
