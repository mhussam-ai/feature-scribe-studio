
import React from "react";
import Navbar from "@/components/Navbar";
import ComingSoonFeatures from "@/components/ComingSoonFeatures";
import Footer from "@/components/Footer";

const LaunchingSoon = () => {
  React.useEffect(() => {
    document.title = "Launching Soon - Adapti    Demo Labs";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ComingSoonFeatures />
      </main>
      <Footer />
    </div>
  );
};

export default LaunchingSoon;
