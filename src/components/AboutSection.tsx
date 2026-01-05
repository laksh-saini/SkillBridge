import { GraduationCap, Users, Award } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "Students helped" },
  { icon: GraduationCap, value: "50+", label: "Colleges covered" },
  { icon: Award, value: "95%", label: "Satisfaction rate" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        {/* How it works */}
        <div id="how-it-works" className="max-w-3xl mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-left">
            How it <span className="text-primary">works</span>
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0">
                1
              </div>
              <div className="pt-2">
                <h4 className="font-semibold text-foreground text-lg mb-2">Upload your resume</h4>
                <p className="text-muted-foreground">Drop your PDF or Word doc — it only takes a second.</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0">
                2
              </div>
              <div className="pt-2">
                <h4 className="font-semibold text-foreground text-lg mb-2">Tell us your goals</h4>
                <p className="text-muted-foreground">Select your target role and academic details.</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0">
                3
              </div>
              <div className="pt-2">
                <h4 className="font-semibold text-foreground text-lg mb-2">Get personalized insights</h4>
                <p className="text-muted-foreground">Receive actionable feedback tailored just for you.</p>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Built by students, <span className="text-primary">for students</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              We know the struggle. You've got the skills from your coursework, but translating them into a resume that impresses recruiters feels like a different game entirely.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              That's why we built Skillbridge — a friendly guide that helps you see your resume through a recruiter's eyes, without the intimidating jargon or confusing scores.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-left">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl" />
            <div className="relative bg-gradient-to-br from-accent to-primary/5 rounded-2xl p-8 md:p-10 border border-primary/10">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Your career starts here
                </h3>
                <p className="text-muted-foreground">
                  Join thousands of students who've used Skillbridge to land their dream internships and jobs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
