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
          {/* Video Thumbnail/Player would go here in production */}
          <div className="aspect-video bg-gradient-to-tr from-gray-900 to-gray-700 flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 to-transparent"></div>
            
            <Button className="h-16 w-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300" onClick={() => console.log("Play demo video")}>
              <Play className="h-8 w-8 fill-current" />
            </Button>
            
            <div className="absolute bottom-8 left-8">
              <h3 className="text-white text-xl font-semibold mb-1">
                From UI Demo to Documentation
              </h3>
              <p className="text-gray-300">
                See our AI in action (2:45)
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-blue-600 text-5xl font-bold mb-4">x%</div>
            <p className="text-gray-800">Reduction in documentation time for new features</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-blue-600 text-5xl font-bold mb-4">x%</div>
            <p className="text-gray-800">Uptick in lead funnel conversion</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-blue-600 text-5xl font-bold mb-4">x%</div>
            <p className="text-gray-800">Improvement in customer onboarding success</p>
          </div>
        </div>
      </div>
    </section>;
};
export default DemoSection;