import React from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"; // Import Card components

const DemoSection = () => {
  // Placeholder function for playing video
  const playDemo = () => {
    // In a real app, this would open a modal or embed a player
    alert("Playing demo video!");
  };

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-background"> {/* Updated padding and background */}
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">See AdaptiDemo Labs in Action</h2> {/* Reverted Name */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"> {/* Updated text color */}
            Watch how easily you can transform UI recordings into polished documentation and guides.
          </p>
        </div>

        {/* Enhanced Video Placeholder */}
        <div className="max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl relative border border-border">
          {/* Replace with actual video thumbnail or player */}
          <div className="aspect-video bg-gradient-to-br from-muted/50 to-background flex items-center justify-center relative">
            {/* Optional subtle pattern */}
            {/* <div className="absolute inset-0 opacity-10 bg-[url('/path/to/pattern.svg')]"></div> */}

            {/* Play Button */}
            <Button
              variant="default" // Use default primary styling
              size="icon" // Make it icon-sized
              className="h-20 w-20 rounded-full shadow-lg transform transition-transform hover:scale-105 z-10"
              onClick={playDemo}
              aria-label="Play Demo Video"
            >
              <Play className="h-10 w-10 fill-primary-foreground" /> {/* Ensure icon color contrasts */}
            </Button>

            {/* Optional overlay text */}
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10 bg-black/30 backdrop-blur-sm p-3 rounded-md">
              <h3 className="text-primary-foreground text-lg md:text-xl font-semibold mb-1">
                Demo: Recording to Guide
              </h3>
              <p className="text-primary-foreground/80 text-sm">
                Watch the transformation (2:45)
              </p>
            </div>
             {/* Placeholder image/gradient */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Statistics Section using Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center bg-card">
            <CardContent className="p-6">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">200+</div>
              <p className="text-sm text-muted-foreground">Startups using AdaptiDemo Labs for their documentation</p> {/* Reverted Name */}
            </CardContent>
          </Card>

          <Card className="text-center bg-card">
            <CardContent className="p-6">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">5 min</div>
              <p className="text-sm text-muted-foreground">Typical time from video upload to draft guide</p>
            </CardContent>
          </Card>

          <Card className="text-center bg-card">
            <CardContent className="p-6">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">10+</div>
              <p className="text-sm text-muted-foreground">Supported export formats (MD, PDF, HTML...)</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
