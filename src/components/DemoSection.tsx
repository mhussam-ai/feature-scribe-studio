import React from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
const DemoSection = () => {
  return <section id="how-it-works" className="py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">See How AdaptiDemo Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch our demo to see how quickly you can turn your UI videos into
            comprehensive collaterals like documentation and customer decks
          </p>
        </div>

        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl relative">
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/Jk8AbWd5IuM"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-blue-600 text-5xl font-bold mb-4">93%</div>
            <p className="text-gray-800">Reduction in documentation time for new features</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-blue-600 text-5xl font-bold mb-4">20%</div>
            <p className="text-gray-800">Uptick in lead funnel conversion</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-blue-600 text-5xl font-bold mb-4">56%</div>
            <p className="text-gray-800">Improvement in customer onboarding success</p>
          </div>
        </div>
      </div>
    </section>;
};
export default DemoSection;
