
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Monitor, Navigation, Check, PlayCircle } from "lucide-react"; // Added Check, PlayCircle
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"; // Use Card for consistent container

const ComingSoonFeatures = () => {
  return (
    <section className="py-20 sm:py-28 bg-secondary overflow-hidden"> {/* Updated background */}
      <div className="container-custom">
        <div className="text-center mb-12">
          {/* Updated Badge */}
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mb-4 px-4 py-1.5 text-sm font-semibold">
            Launching Soon
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4"> {/* Updated text color */}
            What's Next for FeatureScribe?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"> {/* Updated text color */}
            We're constantly innovating. Here's a sneak peek at powerful features coming soon.
          </p>
        </div>

        <Tabs defaultValue="demo-videos" className="w-full max-w-5xl mx-auto">
          {/* Ensure TabsList uses theme colors */}
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="demo-videos" className="py-3 text-sm sm:text-base">
              <Monitor className="mr-2 h-5 w-5" />
              AI Demo Videos
            </TabsTrigger>
            <TabsTrigger value="guided-tours" className="py-3 text-sm sm:text-base">
              <Navigation className="mr-2 h-5 w-5" />
              Interactive Guided Tours
            </TabsTrigger>
          </TabsList>

          {/* Use Card for consistent styling */}
          <Card className="overflow-hidden shadow-lg">
            <TabsContent value="demo-videos" className="m-0"> {/* Remove default padding */}
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-10 flex flex-col justify-center order-2 md:order-1">
                  <div className="text-primary mb-4"> {/* Updated icon color */}
                    <Sparkles className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4"> {/* Updated text color */}
                    Generate Custom Demo Videos
                  </h3>
                  <p className="text-muted-foreground mb-6"> {/* Updated text color */}
                    Create personalized walkthrough videos that adapt to different user personas and automatically update when your UI changes.
                  </p>
                  {/* Updated list styling */}
                  <ul className="space-y-3 mb-6 text-muted-foreground">
                    <li className="flex items-center">
                      <span className="bg-primary/10 p-1 rounded-full mr-3 flex-shrink-0">
                        <Check className="h-4 w-4 text-primary" />
                      </span>
                      Persona-based customization
                    </li>
                    <li className="flex items-center">
                       <span className="bg-primary/10 p-1 rounded-full mr-3 flex-shrink-0">
                        <Check className="h-4 w-4 text-primary" />
                      </span>
                      Dynamic UI updates
                    </li>
                    <li className="flex items-center">
                       <span className="bg-primary/10 p-1 rounded-full mr-3 flex-shrink-0">
                        <Check className="h-4 w-4 text-primary" />
                      </span>
                      Easy editing capabilities
                    </li>
                  </ul>
                  {/* Updated Button */}
                  <Button className="mt-2 w-fit">
                    Join Waitlist
                  </Button>
                </div>
                {/* Updated Placeholder Graphic */}
                <div className="bg-gradient-to-br from-primary/80 to-primary p-8 flex items-center justify-center order-1 md:order-2 min-h-[300px] md:min-h-0">
                  <div className="relative w-full max-w-md aspect-video bg-primary-foreground/10 rounded-lg backdrop-blur-sm border border-primary-foreground/20 shadow-xl">
                    <div className="absolute top-0 left-0 w-full h-8 bg-card/50 rounded-t-lg flex items-center">
                      <div className="flex space-x-1.5 ml-3">
                        <div className="w-2.5 h-2.5 bg-muted rounded-full"></div>
                        <div className="w-2.5 h-2.5 bg-muted rounded-full"></div>
                        <div className="w-2.5 h-2.5 bg-muted rounded-full"></div>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
                         <PlayCircle className="h-8 w-8 text-primary-foreground" /> {/* Updated icon */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="guided-tours" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-10 flex flex-col justify-center order-2 md:order-1">
                  <div className="text-primary mb-4"> {/* Updated icon color */}
                    <Navigation className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4"> {/* Updated text color */}
                    Interactive Guided Tours
                  </h3>
                  <p className="text-muted-foreground mb-6"> {/* Updated text color */}
                    Create step-by-step guided tours directly within your app that help users learn effortlessly. Tours automatically adapt to UI changes.
                  </p>
                   {/* Updated list styling */}
                  <ul className="space-y-3 mb-6 text-muted-foreground">
                    <li className="flex items-center">
                      <span className="bg-primary/10 p-1 rounded-full mr-3 flex-shrink-0">
                        <Check className="h-4 w-4 text-primary" />
                      </span>
                      In-app interactive guidance
                    </li>
                    <li className="flex items-center">
                       <span className="bg-primary/10 p-1 rounded-full mr-3 flex-shrink-0">
                        <Check className="h-4 w-4 text-primary" />
                      </span>
                      Adapts to UI changes automatically
                    </li>
                    <li className="flex items-center">
                       <span className="bg-primary/10 p-1 rounded-full mr-3 flex-shrink-0">
                        <Check className="h-4 w-4 text-primary" />
                      </span>
                      No-code tour creation
                    </li>
                  </ul>
                   {/* Updated Button */}
                  <Button className="mt-2 w-fit">
                    Join Waitlist
                  </Button>
                </div>
                 {/* Updated Placeholder Graphic */}
                <div className="bg-gradient-to-br from-primary/80 to-primary p-8 flex items-center justify-center order-1 md:order-2 min-h-[300px] md:min-h-0">
                  <div className="relative w-full max-w-sm aspect-[4/3] bg-card rounded-lg shadow-xl overflow-hidden border border-border">
                     <div className="h-full w-full p-4">
                        <div className="h-6 w-3/4 bg-muted rounded mb-2"></div>
                        <div className="h-4 w-1/2 bg-muted rounded mb-4"></div>
                        <div className="h-20 w-full bg-muted rounded mb-4"></div>
                         {/* Simulated tooltip */}
                        <div className="w-2/3 h-16 bg-primary text-primary-foreground p-3 rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/4 -translate-y-1/2 flex flex-col justify-center shadow-xl z-10">
                          <div className="text-sm font-bold mb-1">Step 1: Click here</div>
                          <div className="text-xs opacity-80">This button opens the settings menu.</div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/4 translate-y-8 w-4 h-4 bg-primary rotate-45 z-0"></div> {/* Tooltip arrow */}
                        <div className="h-10 w-1/3 bg-muted rounded absolute bottom-4 right-4"></div>
                     </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Card>
        </Tabs>
      </div>
    </section>
  );
};

export default ComingSoonFeatures;
