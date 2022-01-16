import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LandingSection from "../components/LandingSection";
import MainContent from "../components/MainContent";

export default function Home() {
  return (
    <div>
      <main>
        <div className="flex flex-col text-white bg-noiselab bg-no-repeat bg-cover bg-center">
          <div className="pt-4">
            <Header isMain />
          </div>
          <LandingSection />
        </div>
        <MainContent />
      </main>
    </div>
  );
}
