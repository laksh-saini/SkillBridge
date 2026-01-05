import { motion } from "framer-motion";
import { 
  CheckCircle, 
  AlertCircle, 
  Code, 
  Briefcase, 
  GraduationCap, 
  Star,
  TrendingUp,
  Lightbulb
} from "lucide-react";

interface ResultsDisplayProps {
  score: number;
  strengths: { label: string; icon: string }[];
  missingSkills: string[];
  technicalSkills?: string[];
  role: string;
}

const iconMap: Record<string, React.ElementType> = {
  code: Code,
  briefcase: Briefcase,
  graduation: GraduationCap,
  star: Star,
};

const ResultsDisplay = ({ score, strengths, missingSkills, technicalSkills = [], role }: ResultsDisplayProps) => {
  const getScoreColor = () => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-orange-500";
  };

  const getProgressColor = () => {
    if (score >= 75) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-orange-500";
  };

  const getEncouragement = () => {
    if (score >= 80) return "Fantastic! Your resume is looking strong. 🎉";
    if (score >= 60) return "Great foundation! A few tweaks and you'll stand out. 💪";
    if (score >= 40) return "Good start! Let's work on making it shine.";
    return "Every expert was once a beginner. Let's build this up! 🌱";
  };

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-4"
        >
          <TrendingUp className="w-10 h-10 text-primary" />
        </motion.div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Your Resume Analysis
        </h2>
        <p className="text-muted-foreground">
          Based on your profile for <span className="font-semibold text-primary">{role}</span>
        </p>
      </div>

      {/* Resume Strength */}
      <motion.div 
        className="bg-card rounded-2xl p-6 shadow-card border border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Resume Strength
          </h3>
          <span className={`text-3xl font-bold ${getScoreColor()}`}>
            {score}%
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="h-4 bg-muted rounded-full overflow-hidden mb-4">
          <motion.div 
            className={`h-full rounded-full ${getProgressColor()}`}
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Encouragement */}
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-primary" />
          {getEncouragement()}
        </p>
      </motion.div>

      {/* Detected Strengths */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Your Strengths
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {strengths.map((strength, index) => {
            const Icon = iconMap[strength.icon] || Star;
            return (
              <motion.div
                key={strength.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4"
              >
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-medium text-green-800">{strength.label}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Missing Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {/* Technical Skills */}
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Code className="w-5 h-5 text-primary" />
          Technical Skills
        </h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {technicalSkills.length > 0 ? (
            technicalSkills.map((t) => (
              <span key={t} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {t}
              </span>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No technical skills detected</p>
          )}
        </div>

        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          Skills to Add
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          Consider adding these to strengthen your profile:
        </p>
        <div className="flex flex-wrap gap-2">
          {missingSkills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.05 }}
              className="px-4 py-2 bg-orange-50 text-orange-700 border border-orange-200 rounded-full text-sm font-medium"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Tip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-primary-light rounded-2xl p-5 border border-primary/20"
      >
        <p className="text-sm text-primary flex items-start gap-3">
          <span className="text-lg">💡</span>
          <span>
            <strong>Pro tip:</strong> Tailor your resume for each application. 
            Highlight projects and coursework relevant to {role} positions to stand out!
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ResultsDisplay;
