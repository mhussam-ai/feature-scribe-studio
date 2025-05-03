
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import UploadSection from "@/components/UploadSection";
import DemoSection from "@/components/DemoSection";
import Footer from "@/components/Footer";

const Index = () => {
  React.useEffect(() => {
    document.title = "AdaptiDemo Labs - Turn UI Videos into Documentation";
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <DemoSection />
        <UploadSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
