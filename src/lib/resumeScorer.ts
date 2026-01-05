import * as pdfjsLib from "pdfjs-dist";

// Set up the PDF worker with a reliable CDN source
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs`;

export interface ResumeScore {
  score: number;
  strengths: { label: string; icon: string }[];
  missingSkills: string[];
  technicalSkills: string[];
  breakdown: {
    completeness: number;
    roleRelevance: number;
    skillDepth: number;
    formatQuality: number;
  };
}

const roleSkillMap: Record<string, { skills: string[]; keywords: string[] }> = {
  "Software Engineer": {
    skills: [
      "Python", "Java", "C++", "JavaScript", "TypeScript", "React", "Node.js",
      "SQL", "NoSQL", "System Design", "Data Structures", "Algorithms", "OOP",
      "Git", "Docker", "Kubernetes", "CI/CD", "Testing", "NumPy", "Pandas",
      "Matplotlib", "PyTorch", "TensorFlow", "Mathematica", "HTML", "CSS",
      "MongoDB", "PostgreSQL", "AWS", "Azure", "GCP", "REST API", "GraphQL",
    ],
    keywords: [
      "algorithm", "data structure", "design pattern", "software", "development",
      "programming", "backend", "frontend", "full stack", "microservice", "api",
      "rest", "sql", "nosql", "docker", "kubernetes", "ci/cd", "test", "react",
      "node", "python", "java", "c++", "web", "application", "code", "engineer",
    ],
  },
  "Data Analyst": {
    skills: [
      "SQL", "Python", "R", "Excel", "Tableau", "Power BI", "Pandas", "NumPy",
      "Statistics", "Data Visualization", "Matplotlib", "Seaborn", "SAS", "SPSS",
    ],
    keywords: [
      "data analysis", "sql", "python", "pandas", "numpy", "excel", "tableau",
      "power bi", "statistics", "statistical", "sql query", "database",
      "data warehouse", "etl", "analytics", "business intelligence",
      "visualization", "regression", "forecast", "dashboard", "report",
    ],
  },
  "Product Manager": {
    skills: [
      "Product Strategy", "Roadmapping", "User Research", "Analytics",
      "Stakeholder Management", "Communication", "Agile", "Scrum", "Jira",
      "A/B Testing", "Market Research", "Wireframing", "Figma",
    ],
    keywords: [
      "product", "management", "strategy", "user research", "roadmap", "feature",
      "stakeholder", "requirement", "agile", "scrum", "ux", "user experience",
      "product design", "metrics", "kpi", "market", "launch", "mvp",
    ],
  },
  "ML Engineer": {
    skills: [
      "Python", "TensorFlow", "PyTorch", "Scikit-learn", "Machine Learning",
      "Deep Learning", "NLP", "Computer Vision", "Statistics", "Keras",
      "OpenCV", "Hugging Face", "LLM", "Neural Networks", "CNN", "RNN",
    ],
    keywords: [
      "machine learning", "deep learning", "neural network", "nlp",
      "computer vision", "tensorflow", "pytorch", "scikit-learn", "python",
      "ml", "classification", "regression", "clustering", "model", "training",
      "feature engineering", "data preprocessing", "ai", "artificial intelligence",
    ],
  },
};

// Comprehensive skill list for generic detection
const allTechnicalSkills = [
  // Programming Languages
  "python", "javascript", "typescript", "java", "c++", "c#", "go", "golang",
  "rust", "ruby", "php", "swift", "kotlin", "scala", "r", "matlab", "perl",
  // Web Technologies
  "react", "angular", "vue", "vue.js", "next.js", "nextjs", "node", "node.js",
  "express", "django", "flask", "spring", "spring boot", "laravel", "rails",
  "html", "css", "sass", "scss", "tailwind", "bootstrap", "jquery",
  // Databases
  "sql", "mysql", "postgresql", "postgres", "mongodb", "redis", "elasticsearch",
  "oracle", "sqlite", "dynamodb", "cassandra", "firebase", "supabase",
  // Cloud & DevOps
  "aws", "azure", "gcp", "google cloud", "docker", "kubernetes", "k8s",
  "jenkins", "gitlab", "github actions", "terraform", "ansible", "ci/cd",
  // Data Science & ML
  "pandas", "numpy", "scipy", "matplotlib", "seaborn", "tensorflow", "pytorch",
  "keras", "scikit-learn", "sklearn", "opencv", "nlp", "machine learning",
  "deep learning", "data science", "artificial intelligence", "ai",
  // Tools
  "git", "jira", "confluence", "figma", "sketch", "adobe", "photoshop",
  "excel", "tableau", "power bi", "looker", "jupyter", "vscode",
  // Concepts
  "rest api", "graphql", "microservices", "agile", "scrum", "kanban",
  "oop", "tdd", "unit testing", "integration testing", "api",
];

export async function analyzeResume(
  file: File,
  role: string,
  year: string,
  branch: string
): Promise<ResumeScore> {
  try {
    const resumeText = await extractResumeText(file);
    const lowerText = resumeText.toLowerCase();

    console.log("=== EXTRACTED RESUME TEXT ===");
    console.log("Text length:", resumeText.length);
    console.log("First 500 chars:", resumeText.substring(0, 500));
    console.log("=== END EXTRACTED TEXT ===");

    if (resumeText.length < 50) {
      console.warn("Very short resume text extracted, may indicate parsing issue");
    }

    const sections = extractSections(resumeText);
    const completeness = calculateCompleteness(sections);
    const roleRelevance = calculateRoleRelevance(lowerText, role);
    const skillDepth = calculateSkillDepth(lowerText, role);
    const formatQuality = calculateFormatQuality(sections, resumeText);

    const baseScore = completeness + roleRelevance + skillDepth + formatQuality;
    const score = Math.min(100, Math.max(35, baseScore));

    const strengths = identifyStrengths(lowerText, role, sections);
    const missingSkills = identifyMissingSkills(lowerText, role);

    // Extract ALL technical skills found in resume
    const technicalSkills = extractAllTechnicalSkills(lowerText, role);

    console.log("=== EXTRACTED SKILLS ===");
    console.log("Technical Skills Found:", technicalSkills);
    console.log("Strengths:", strengths);
    console.log("=== END SKILLS ===");

    return {
      score: Math.round(score),
      strengths,
      missingSkills,
      technicalSkills,
      breakdown: {
        completeness,
        roleRelevance,
        skillDepth,
        formatQuality,
      },
    };
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return {
      score: 65,
      strengths: [{ label: "Valid Resume", icon: "briefcase" }],
      missingSkills: [],
      technicalSkills: [],
      breakdown: {
        completeness: 15,
        roleRelevance: 15,
        skillDepth: 20,
        formatQuality: 15,
      },
    };
  }
}

async function extractResumeText(file: File): Promise<string> {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  console.log("Processing file:", fileName, "Type:", fileType);

  // Handle text files
  if (fileType === "text/plain" || fileName.endsWith(".txt")) {
    return await file.text();
  }

  // Handle PDF files
  if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
    return await extractPdfText(file);
  }

  // Handle Word documents - extract as text if possible
  if (
    fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileName.endsWith(".docx")
  ) {
    // For docx, try to read as text (may not work perfectly)
    try {
      const text = await file.text();
      // Extract readable text from XML structure
      const cleanText = text
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (cleanText.length > 100) {
        return cleanText;
      }
    } catch (e) {
      console.warn("Could not parse docx as text");
    }
  }

  // Fallback: try to read as text
  try {
    return await file.text();
  } catch (e) {
    console.error("Failed to read file as text:", e);
    return "";
  }
}

async function extractPdfText(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();

    // Ensure worker is set
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs`;
    }

    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      useSystemFonts: true,
      standardFontDataUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/standard_fonts/',
    });

    const pdf = await loadingTask.promise;
    let fullText = "";

    console.log("PDF loaded, number of pages:", pdf.numPages);

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      try {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();

        // Better text extraction with position awareness
        const textItems = textContent.items as Array<{ str: string; transform?: number[] }>;
        
        let lastY: number | null = null;
        let pageText = "";

        for (const item of textItems) {
          const str = (item.str || "").replace(/\u00A0/g, " ");
          if (!str.trim()) continue;

          // Check if we're on a new line based on Y position
          const currentY = item.transform ? item.transform[5] : null;
          if (lastY !== null && currentY !== null && Math.abs(currentY - lastY) > 5) {
            pageText += "\n";
          } else if (pageText.length > 0 && !pageText.endsWith(" ") && !pageText.endsWith("\n")) {
            pageText += " ";
          }

          pageText += str;
          lastY = currentY;
        }

        fullText += pageText.trim() + "\n\n";
      } catch (pageErr) {
        console.warn(`Could not extract text from page ${pageNum}:`, pageErr);
      }
    }

    const cleanedText = fullText
      .replace(/\n{3,}/g, "\n\n")
      .replace(/\s+/g, " ")
      .replace(/\n /g, "\n")
      .trim();

    console.log("Extracted text length:", cleanedText.length);

    if (cleanedText.length < 50) {
      console.warn("Very little text extracted from PDF");
    }

    return cleanedText;
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    return "";
  }
}

function extractAllTechnicalSkills(lowerText: string, role: string): string[] {
  const foundSkills = new Set<string>();

  // First, check role-specific skills
  const roleData = roleSkillMap[role];
  if (roleData) {
    for (const skill of roleData.skills) {
      const lowerSkill = skill.toLowerCase();
      // Check for exact match or word boundary match
      const regex = new RegExp(`\\b${escapeRegex(lowerSkill)}\\b`, "i");
      if (regex.test(lowerText) || lowerText.includes(lowerSkill)) {
        foundSkills.add(skill);
      }
    }
  }

  // Then, check all technical skills
  for (const skill of allTechnicalSkills) {
    const regex = new RegExp(`\\b${escapeRegex(skill)}\\b`, "i");
    if (regex.test(lowerText)) {
      // Capitalize properly
      const capitalized = skill
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      foundSkills.add(capitalized);
    }
  }

  // Also look for common skill patterns like "Proficient in X" or "Experience with X"
  const skillPatterns = [
    /(?:proficient|experienced|skilled|expertise|knowledge)\s+(?:in|with|of)\s+(\w+(?:\.\w+)?)/gi,
    /(?:worked|work|working)\s+(?:with|on)\s+(\w+(?:\.\w+)?)/gi,
  ];

  for (const pattern of skillPatterns) {
    const matches = lowerText.matchAll(pattern);
    for (const match of matches) {
      const skill = match[1];
      if (skill && skill.length > 1 && skill.length < 20) {
        const capitalized = skill.charAt(0).toUpperCase() + skill.slice(1);
        // Only add if it looks like a tech skill
        if (allTechnicalSkills.some((s) => s.includes(skill.toLowerCase()))) {
          foundSkills.add(capitalized);
        }
      }
    }
  }

  return Array.from(foundSkills).slice(0, 25);
}

function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractSections(text: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const lowerText = text.toLowerCase();

  const sectionHeaders = {
    education: ["education", "academic", "qualification", "degree", "university", "college"],
    experience: ["experience", "work history", "employment", "professional", "work experience", "internship"],
    skills: ["skills", "technical skills", "competencies", "expertise", "technologies", "tools"],
    projects: ["projects", "portfolio", "achievements", "accomplishments", "work samples"],
    certifications: ["certifications", "certificates", "credentials", "awards", "honors"],
  };

  for (const [sectionName, headers] of Object.entries(sectionHeaders)) {
    for (const header of headers) {
      const headerIndex = lowerText.indexOf(header);
      if (headerIndex !== -1) {
        // Find where this section ends (next section header or end of text)
        let endIndex = text.length;
        for (const otherHeaders of Object.values(sectionHeaders)) {
          for (const otherHeader of otherHeaders) {
            if (otherHeader !== header) {
              const otherIndex = lowerText.indexOf(otherHeader, headerIndex + header.length + 10);
              if (otherIndex !== -1 && otherIndex < endIndex) {
                endIndex = otherIndex;
              }
            }
          }
        }
        const sectionContent = text.substring(headerIndex, Math.min(endIndex, headerIndex + 1000));
        if (sectionContent.length > (sections[sectionName]?.length || 0)) {
          sections[sectionName] = sectionContent;
        }
        break;
      }
    }
  }

  return sections;
}

function calculateCompleteness(sections: Record<string, string>): number {
  let score = 0;
  const requiredSections = ["education", "experience", "skills"];
  const optionalSections = ["projects", "certifications"];

  for (const section of requiredSections) {
    if (sections[section] && sections[section].length > 50) {
      score += 6;
    } else if (sections[section] && sections[section].length > 20) {
      score += 3;
    } else {
      score += 1;
    }
  }

  for (const section of optionalSections) {
    if (sections[section] && sections[section].length > 30) {
      score += 3;
    }
  }

  return Math.min(25, score);
}

function calculateRoleRelevance(lowerText: string, role: string): number {
  const roleData = roleSkillMap[role];
  if (!roleData) return 12;

  let relevanceScore = 10;
  const keywords = roleData.keywords;

  const foundKeywords = keywords.filter((keyword) => {
    const regex = new RegExp(`\\b${escapeRegex(keyword)}\\b`, "i");
    return regex.test(lowerText);
  });

  const keywordCoverage = (foundKeywords.length / keywords.length) * 100;
  relevanceScore += Math.min(20, (keywordCoverage / 100) * 25);

  const multipleOccurrences = foundKeywords.filter((keyword) => {
    const regex = new RegExp(`\\b${escapeRegex(keyword)}\\b`, "gi");
    return (lowerText.match(regex) || []).length > 1;
  }).length;

  relevanceScore += Math.min(5, multipleOccurrences);

  return Math.min(30, relevanceScore);
}

function calculateSkillDepth(lowerText: string, role: string): number {
  const roleData = roleSkillMap[role];
  if (!roleData) return 10;

  let skillScore = 5;
  const skills = roleData.skills;

  const foundSkills = skills.filter((skill) => {
    const lowerSkill = skill.toLowerCase();
    const regex = new RegExp(`\\b${escapeRegex(lowerSkill)}\\b`, "i");
    return regex.test(lowerText);
  });

  skillScore += (foundSkills.length / skills.length) * 15;

  const depthIndicators = [
    "architected", "designed", "optimized", "implemented", "developed",
    "built", "created", "engineered", "deployed", "improved", "enhanced",
    "led", "managed", "spearheaded", "initiated", "established",
  ];

  const depthCount = depthIndicators.filter((indicator) =>
    lowerText.includes(indicator)
  ).length;

  skillScore += Math.min(7, depthCount * 1.5);

  return Math.min(25, skillScore);
}

function calculateFormatQuality(sections: Record<string, string>, fullText: string): number {
  let score = 0;

  const hasSectionHeaders = Object.values(sections).filter((s) => s.length > 50).length >= 3;
  if (hasSectionHeaders) score += 5;

  if (fullText.length > 500) score += 3;
  if (fullText.length > 1000) score += 3;
  if (fullText.length > 2000) score += 3;

  const hasNumbers = /\d+\+?/.test(fullText);
  if (hasNumbers) score += 3;

  const actionVerbs = ["led", "managed", "increased", "improved", "reduced", "created", "launched"];
  const verbCount = actionVerbs.filter((verb) => fullText.toLowerCase().includes(verb)).length;
  if (verbCount >= 3) score += 3;

  return Math.min(20, score);
}

function identifyStrengths(
  lowerText: string,
  role: string,
  sections: Record<string, string>
): { label: string; icon: string }[] {
  const strengths: { label: string; icon: string }[] = [];
  const roleData = roleSkillMap[role];

  if (roleData) {
    const foundSkills = roleData.skills.filter((skill) => {
      const lowerSkill = skill.toLowerCase();
      const regex = new RegExp(`\\b${escapeRegex(lowerSkill)}\\b`, "i");
      return regex.test(lowerText);
    });

    for (const skill of foundSkills.slice(0, 4)) {
      strengths.push({ label: skill, icon: "code" });
    }

    if (foundSkills.length === 0) {
      const allFound = extractAllTechnicalSkills(lowerText, role);
      for (const g of allFound.slice(0, 4)) {
        if (strengths.length >= 4) break;
        strengths.push({ label: g, icon: "code" });
      }
    }
  }

  if (sections.education && sections.education.length > 80 && strengths.length < 4) {
    strengths.push({ label: "Strong Academic Background", icon: "graduation" });
  }

  if (sections.experience && sections.experience.length > 200 && strengths.length < 4) {
    strengths.push({ label: "Solid Work Experience", icon: "briefcase" });
  }

  if (sections.projects && sections.projects.length > 50 && strengths.length < 4) {
    strengths.push({ label: "Notable Projects", icon: "briefcase" });
  }

  const impactWords = ["led", "managed", "launched", "increased", "improved", "directed"];
  const impactCount = impactWords.filter((word) => lowerText.includes(word)).length;
  if (impactCount >= 2 && strengths.length < 4) {
    strengths.push({ label: "Leadership Experience", icon: "star" });
  }

  if (strengths.length === 0) {
    strengths.push({ label: "Well-Structured Resume", icon: "briefcase" });
  }

  return strengths.slice(0, 4);
}

function identifyMissingSkills(lowerText: string, role: string): string[] {
  const roleData = roleSkillMap[role];
  if (!roleData) return [];

  const missingSkills = roleData.skills.filter((skill) => {
    const lowerSkill = skill.toLowerCase();
    const regex = new RegExp(`\\b${escapeRegex(lowerSkill)}\\b`, "i");
    return !regex.test(lowerText);
  });

  return missingSkills.slice(0, 5);
}

export function detectGenericSkills(lowerText: string): string[] {
  const found = allTechnicalSkills.filter((s) => {
    const regex = new RegExp(`\\b${escapeRegex(s)}\\b`, "i");
    return regex.test(lowerText);
  });
  return found.slice(0, 10).map((s) =>
    s.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  );
}
