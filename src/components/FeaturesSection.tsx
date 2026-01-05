import { FileSearch, Target, Lightbulb, Zap, Shield, Heart } from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Smart Resume Analysis",
    description: "Our intelligent system scans your resume and identifies key strengths based on your academic background and goals.",
  },
  {
    icon: Target,
    title: "Role-Specific Insights",
    description: "Get tailored feedback based on your target role, whether it's Software Engineer, Data Analyst, or Product Manager.",
  },
  {
    icon: Lightbulb,
    title: "Skill Gap Detection",
    description: "Discover what skills you're missing and get actionable recommendations to make your profile stand out.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "No waiting around. Get comprehensive feedback on your resume in seconds, not days.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your resume data is analyzed securely and never stored or shared. Your privacy matters to us.",
  },
  {
    icon: Heart,
    title: "Student-Friendly",
    description: "Designed specifically for college students. No confusing jargon, just clear and helpful guidance.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything you need to <span className="text-primary">level up</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Skillbridge is packed with features designed to help you transition from classroom to career with confidence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-medium transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
