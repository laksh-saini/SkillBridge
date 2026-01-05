import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResumeUpload from "@/components/ResumeUpload";
import AnalyzerForm from "@/components/AnalyzerForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import { analyzeResume, type ResumeScore } from "@/lib/resumeScorer";

type AnalysisState = "form" | "loading" | "results";

const AnalyzePage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<AnalysisState>("form");
  const [file, setFile] = useState<File | null>(null);
  const [role, setRole] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [minor, setMinor] = useState("");

  // Mock results
  const [results, setResults] = useState<ResumeScore>({
    score: 0,
    strengths: [],
    missingSkills: [],
    technicalSkills: [],
    breakdown: {
      completeness: 0,
      roleRelevance: 0,
      skillDepth: 0,
      formatQuality: 0,
    },
  });

  const isFormValid = file && role && year && branch;

  const handleAnalyze = async () => {
    setState("loading");
    
    if (!file) return;

    try {
      const analyzeResult = await analyzeResume(file, role, year, branch);
      
      // Simulate network delay
      setTimeout(() => {
        setResults(analyzeResult);
        setState("results");
      }, 2500);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      setState("form");
    }
  };

  const handleReset = () => {
    setState("form");
    setFile(null);
    setRole("");
    setYear("");
    setBranch("");
    setMinor("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground" style={{ fontFamily: "Satoshi, sans-serif" }}>Skillbridge</span>
          </div>

          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {state === "form" && (
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Analyze Your Resume
              </h1>
              <p className="text-muted-foreground text-lg">
                Upload your resume and tell us about yourself. We'll do the rest!
              </p>
            </div>

            <div className="bg-card rounded-2xl shadow-card border border-border p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left: Upload */}
                <ResumeUpload 
                  onFileSelect={setFile}
                  selectedFile={file}
                />

                {/* Right: Form */}
                <AnalyzerForm
                  role={role}
                  year={year}
                  branch={branch}
                  minor={minor}
                  onRoleChange={setRole}
                  onYearChange={setYear}
                  onBranchChange={setBranch}
                  onMinorChange={setMinor}
                />
              </div>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-border">
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full md:w-auto md:min-w-[200px] mx-auto block"
                  disabled={!isFormValid}
                  onClick={handleAnalyze}
                >
                  Analyse
                </Button>
                {!isFormValid && (
                  <p className="text-sm text-muted-foreground text-center mt-3">
                    Please upload a resume and fill in all required fields
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {state === "loading" && (
          <motion.div 
            className="max-w-md mx-auto text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Analysing your resume…
            </h2>
            <p className="text-muted-foreground">
              Hang tight! We're reviewing your profile and preparing personalized insights.
            </p>
            <div className="mt-8 flex justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ 
                    duration: 1.2, 
                    repeat: Infinity, 
                    delay: i * 0.2 
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {state === "results" && (
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ResultsDisplay 
              score={results.score}
              strengths={results.strengths}
              missingSkills={results.missingSkills}
              technicalSkills={results.technicalSkills}
              role={role}
            />

            {/* Actions */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" onClick={handleReset}>
                Analyse Another Resume
              </Button>
              <Button variant="hero" size="lg" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AnalyzePage;
