import { ChevronDownIcon } from "@heroicons/react/outline";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LandingSection from "../components/LandingSection";
import MainContent from "../components/MainContent";

export default function Home() {
  return (
    <div>
      <main>
        <div className="flex flex-col h-screen text-white bg-noiselab bg-fixed bg-no-repeat bg-cover bg-center">
          <div className="flex">
            <Header />
          </div>
          <div className="flex flex-grow">
            <LandingSection />
          </div>
          <div className="flex justify-center py-5">
            <ChevronDownIcon className="animate-bounce h-6" />
          </div>
        </div>
        <MainContent />
        <Footer />
      </main>
    </div>
  );
}
