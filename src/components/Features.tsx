
import React from "react";
import {
  Check,
  Video,
  ScanSearch,
  FileText,
  LayoutTemplate,
  Users,
  GitBranch,
  Sparkles, // Added for AI emphasis
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Import Card components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar

// Updated features array with Lucide icons
const features = [
  {
    icon: <Video className="w-6 h-6" />,
    title: "Video to Docs",
    description:
      "Upload UI recordings, and our AI automatically generates structured, step-by-step documentation.",
  },
  {
    icon: <ScanSearch className="w-6 h-6" />,
    title: "Screenshot Analysis",
    description:
      "Analyze screenshots to get detailed explanations of UI elements, workflows, and functionality.",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Multiple Export Formats",
    description:
      "Export documentation in Markdown, PDF, HTML, and more for seamless integration.",
  },
  {
    icon: <LayoutTemplate className="w-6 h-6" />,
    title: "Customizable Templates",
    description:
      "Use pre-built templates or create your own to perfectly match your brand identity.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Team Collaboration",
    description:
      "Collaborate in real-time with your team, making edits and ensuring documentation stays up-to-date.",
  },
  {
    icon: <GitBranch className="w-6 h-6" />,
    title: "Version Control",
    description:
      "Track changes effortlessly with built-in version control and easily revert to previous revisions.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 sm:py-28 bg-background"> {/* Updated background */}
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4"> {/* Updated text color */}
            Everything You Need, Powered by AI <Sparkles className="inline-block w-8 h-8 text-primary ml-2" />
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"> {/* Updated text color */}
            Save countless hours and deliver polished documentation effortlessly with our intelligent platform.
          </p>
        </div>

        {/* Updated feature grid using Card component */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Adjusted gap */}
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col"> {/* Use Card component */}
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0"> {/* Updated icon style */}
                  {feature.icon}
                </div>
                <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle> {/* Adjusted size */}
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm">{feature.description}</p> {/* Adjusted size */}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Updated Benefits & Testimonial Section */}
        <div className="mt-20 bg-secondary rounded-xl p-8 md:p-12"> {/* Updated background and padding */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"> {/* Use grid for better alignment */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6"> {/* Updated text color */}
                Why Teams Love AdaptiDemo Labs {/* Reverted Name */}
              </h3>
              <ul className="space-y-3">
                {[
                  "Slash documentation time by up to 80%",
                  "Onboard users faster with crystal-clear guides",
                  "Keep docs perfectly synced with UI updates",
                  "Free up developers to focus on building",
                  "Ensure consistency across all documentation",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-primary mt-1 shrink-0" /> {/* Updated color */}
                    <span className="text-muted-foreground">{item}</span> {/* Updated color */}
                  </li>
                ))}
              </ul>
            </div>
            {/* Updated Testimonial using Card */}
            <Card className="bg-card shadow-lg"> {/* Use Card */}
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> {/* Example image */}
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold">CB</AvatarFallback> {/* Updated style */}
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-foreground">Chris Blakely</h4> {/* Updated color */}
                    <p className="text-sm text-muted-foreground">CTO at TechFlow</p> {/* Updated color */}
                  </div>
                </div>
                <blockquote className="text-foreground italic border-l-4 border-primary pl-4"> {/* Updated style */}
                  "AdaptiDemo Labs has been a game-changer. We used to spend days creating docs. Now, we just record a quick video and get professional guides in minutes. Absolutely essential." {/* Reverted Name */}
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
