import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LandingSection from "../components/LandingSection";
import MainContent from "../components/MainContent";

export default function Home() {
  return (
    <div>
      <main>
        <div className="flex flex-col h-screen bg-gradient-to-br from-cyan-500 to-blue-500 text-white">
          <div className="flex">
            <Header />
          </div>
          <div className="flex flex-grow">
            <LandingSection />
          </div>
        </div>
        <MainContent />
        <Footer />
      </main>
    </div>
  );
}
