
import React from "react";
import Navbar from "@/components/Navbar";
import ComingSoonFeatures from "@/components/ComingSoonFeatures";
import Footer from "@/components/Footer";

const LaunchingSoon = () => {
  React.useEffect(() => {
    document.title = "Launching Soon - AdaptiDemo Labs";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="py-16 bg-white">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Launching Soon</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're working on some exciting new features that will transform how you create
              product documentation and onboarding experiences.
            </p>
          </div>
        </div>
        <ComingSoonFeatures />
      </main>
      <Footer />
    </div>
  );
};

export default LaunchingSoon;
