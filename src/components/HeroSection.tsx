import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Target, TrendingUp } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent to-background pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            Built for college students
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Skillbridge today.{" "}
            <span className="text-primary">Impress your recruiters</span> tomorrow.
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Bridge the gap between your coursework and career-ready skills. 
            Get personalized insights to make your resume stand out.
          </p>

          {/* CTA */}
          <Button 
            variant="hero" 
            size="xl" 
            onClick={() => navigate("/analyze")}
            className="group"
          >
            Try for free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Preview Card */}
        <div className="mt-16 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
            
            {/* Preview card */}
            <div className="relative bg-card rounded-2xl shadow-medium border border-border overflow-hidden">
              <div className="p-4 bg-muted/50 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left: Upload preview */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Resume Uploaded</p>
                        <p className="text-sm text-muted-foreground">john_doe_resume.pdf</p>
                      </div>
                    </div>
                    <div className="h-32 bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border">
                      <p className="text-muted-foreground text-sm">Resume preview area</p>
                    </div>
                  </div>

                  {/* Right: Results preview */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                        <Target className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Resume Strength</p>
                        <p className="text-sm text-muted-foreground">78/100</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-[78%] bg-primary rounded-full" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Python</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">React</span>
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">+4 more</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span>Personalized recommendations included</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
