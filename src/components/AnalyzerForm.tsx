import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface AnalyzerFormProps {
  role: string;
  year: string;
  branch: string;
  minor: string;
  onRoleChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onBranchChange: (value: string) => void;
  onMinorChange: (value: string) => void;
}

const roles = [
  "Software Engineer",
  "Data Analyst",
  "Product Manager",
  "ML Engineer",
  "Backend Engineer",
  "Frontend Engineer",
  "DevOps Engineer",
  "QA Engineer",
  "Business Analyst",
  "Consultant",
];

const years = ["1", "2", "3", "4", "5 – Dual"];

const branches = [
  "CSE",
  "ECE",
  "EE",
  "ME",
  "CE",
  "CHE",
  "BIO",
  "MSc Eco",
  "MSc Math",
];

const minors = ["Finance"];

const AnalyzerForm = ({
  role,
  year,
  branch,
  minor,
  onRoleChange,
  onYearChange,
  onBranchChange,
  onMinorChange,
}: AnalyzerFormProps) => {
  return (
    <div className="space-y-5">
      {/* Desired Role */}
      <div className="space-y-2">
        <Label htmlFor="role" className="text-sm font-medium text-foreground">
          Desired Role
        </Label>
        <Select value={role} onValueChange={onRoleChange}>
          <SelectTrigger id="role" className="w-full h-12 rounded-xl bg-background">
            <SelectValue placeholder="Select your target role" />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border z-50">
            {roles.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Academic Year */}
      <div className="space-y-2">
        <Label htmlFor="year" className="text-sm font-medium text-foreground">
          Academic Year
        </Label>
        <Select value={year} onValueChange={onYearChange}>
          <SelectTrigger id="year" className="w-full h-12 rounded-xl bg-background">
            <SelectValue placeholder="Select your year" />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border z-50">
            {years.map((y) => (
              <SelectItem key={y} value={y}>
                Year {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Branch */}
      <div className="space-y-2">
        <Label htmlFor="branch" className="text-sm font-medium text-foreground">
          Branch
        </Label>
        <Select value={branch} onValueChange={onBranchChange}>
          <SelectTrigger id="branch" className="w-full h-12 rounded-xl bg-background">
            <SelectValue placeholder="Select your branch" />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border z-50">
            {branches.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Minor */}
      <div className="space-y-2">
        <Label htmlFor="minor" className="text-sm font-medium text-foreground">
          Minor
        </Label>
        <Select value={minor} onValueChange={onMinorChange}>
          <SelectTrigger id="minor" className="w-full h-12 rounded-xl bg-background">
            <SelectValue placeholder="Select your minor (if any)" />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border z-50">
            {minors.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AnalyzerForm;
