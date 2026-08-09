export type SkillLevel = "basic" | "working" | "proficient";

export type EducationRow = {
  id: string;
  exam: string;
  board: string;
  year: string;
  score: string;
  subjects: string;
};

export type ExperienceRow = {
  id: string;
  org: string;
  role: string;
  from: string;
  to: string;
  detail: string;
};

export type LanguageRow = {
  id: string;
  name: string;
  read: boolean;
  write: boolean;
  speak: boolean;
};

export type CertRow = {
  id: string;
  name: string;
  year: string;
  authority: string;
};

export type SkillChip = {
  id: string;
  label: string;
  level: SkillLevel;
};

export type JobPackId =
  | "office"
  | "banking"
  | "teaching"
  | "police"
  | "technical"
  | "field"
  | "driving";

export type BiodataData = {
  fullName: string;
  fatherName: string;
  motherName: string;
  dob: string;
  gender: string;
  category: string;
  nationality: string;
  religion: string;
  maritalStatus: string;
  mobile: string;
  email: string;
  permanentAddress: string;
  district: string;
  state: string;
  pin: string;
  sameAddress: boolean;
  correspondenceAddress: string;
  applyingFor: string;
  objective: string;
  education: EducationRow[];
  experience: ExperienceRow[];
  languages: LanguageRow[];
  computerSkills: SkillChip[];
  jobPacks: JobPackId[];
  packSkills: SkillChip[];
  softSkills: string[];
  typingEnglish: string;
  typingHindi: string;
  stenography: string;
  certifications: CertRow[];
  otherSkills: string;
  height: string;
  weight: string;
  idMarks: string;
  place: string;
  declarationDate: string;
  photoDataUrl: string | null;
};

export const CATEGORIES = ["UR / General", "EWS", "OBC (NCL)", "SC", "ST", "PwBD"] as const;

export const GENDERS = ["Male", "Female", "Other"] as const;

export const MARITAL = ["Unmarried", "Married", "Other"] as const;

export const SOFT_SKILL_OPTIONS = [
  "Communication",
  "Teamwork",
  "Punctuality",
  "Problem solving",
  "Leadership",
  "Time management",
  "Public dealing",
  "Discipline",
] as const;

export const COMPUTER_OPTIONS = [
  "MS Word",
  "MS Excel",
  "MS PowerPoint",
  "Internet & email",
  "Data entry",
  "CCC",
  "O Level / DCA",
  "Google Docs / Sheets",
  "Tally",
] as const;

export const JOB_PACKS: Array<{
  id: JobPackId;
  label: string;
  skills: string[];
}> = [
  {
    id: "office",
    label: "Office / Clerk",
    skills: ["Noting & drafting", "File management", "e-Office basics", "Record keeping", "Diary & dispatch"],
  },
  {
    id: "banking",
    label: "Banking",
    skills: ["Customer service", "Cash handling basics", "Financial awareness", "KYC awareness"],
  },
  {
    id: "teaching",
    label: "Teaching",
    skills: ["Classroom management", "Lesson planning", "CTET / TET", "Student mentoring"],
  },
  {
    id: "police",
    label: "Police / Defence",
    skills: ["Physical fitness", "Drill awareness", "First aid basics", "Law & order awareness"],
  },
  {
    id: "technical",
    label: "Technical / JE",
    skills: ["AutoCAD", "ITI trade skills", "Electrical / civil basics", "Site supervision"],
  },
  {
    id: "field",
    label: "Field / Survey",
    skills: ["Field enumeration", "GPS / mapping basics", "Public interaction", "Survey forms"],
  },
  {
    id: "driving",
    label: "Driving",
    skills: ["LMV licence", "HMV licence", "Safe driving", "Vehicle maintenance basics"],
  },
];

export const EXAM_PRESETS: Array<{
  id: string;
  label: string;
  applyingFor: string;
  packs: JobPackId[];
  computer: string[];
}> = [
  {
    id: "ssc-clerk",
    label: "SSC / Clerk-style",
    applyingFor: "SSC / Clerical cadre posts",
    packs: ["office"],
    computer: ["MS Word", "MS Excel", "Internet & email", "CCC"],
  },
  {
    id: "bank",
    label: "Bank (IBPS / SBI)",
    applyingFor: "Bank PO / Clerk / Associate",
    packs: ["banking", "office"],
    computer: ["MS Word", "MS Excel", "Internet & email", "Data entry"],
  },
  {
    id: "railway",
    label: "Railway",
    applyingFor: "RRB / RRC recruitment",
    packs: ["office", "technical"],
    computer: ["MS Word", "Internet & email"],
  },
  {
    id: "police",
    label: "Police / Constable",
    applyingFor: "Police / Constable / SI posts",
    packs: ["police"],
    computer: ["Internet & email"],
  },
  {
    id: "teaching",
    label: "Teaching",
    applyingFor: "TGT / PGT / PRT / Teacher posts",
    packs: ["teaching"],
    computer: ["MS Word", "MS PowerPoint", "Internet & email"],
  },
];

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function emptyEducation(): EducationRow {
  return { id: uid(), exam: "", board: "", year: "", score: "", subjects: "" };
}

export function emptyExperience(): ExperienceRow {
  return { id: uid(), org: "", role: "", from: "", to: "", detail: "" };
}

export function emptyLanguage(name = ""): LanguageRow {
  return { id: uid(), name, read: true, write: true, speak: true };
}

export function emptyCert(): CertRow {
  return { id: uid(), name: "", year: "", authority: "" };
}

export function createEmptyBiodata(): BiodataData {
  return {
    fullName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "Male",
    category: "UR / General",
    nationality: "Indian",
    religion: "",
    maritalStatus: "Unmarried",
    mobile: "",
    email: "",
    permanentAddress: "",
    district: "",
    state: "",
    pin: "",
    sameAddress: true,
    correspondenceAddress: "",
    applyingFor: "",
    objective: "Seeking a government / public-sector opportunity where I can contribute honestly and grow with responsibility.",
    education: [
      { ...emptyEducation(), exam: "10th / Matric" },
      { ...emptyEducation(), exam: "12th / Intermediate" },
      { ...emptyEducation(), exam: "Graduation" },
    ],
    experience: [],
    languages: [emptyLanguage("Hindi"), emptyLanguage("English")],
    computerSkills: [],
    jobPacks: [],
    packSkills: [],
    softSkills: [],
    typingEnglish: "",
    typingHindi: "",
    stenography: "",
    certifications: [],
    otherSkills: "",
    height: "",
    weight: "",
    idMarks: "",
    place: "",
    declarationDate: new Date().toISOString().slice(0, 10),
    photoDataUrl: null,
  };
}

export function requiredMissing(data: BiodataData): string[] {
  const missing: string[] = [];
  if (!data.fullName.trim()) missing.push("Full name");
  if (!data.fatherName.trim()) missing.push("Father's / husband's name");
  if (!data.dob) missing.push("Date of birth");
  if (!data.mobile.trim()) missing.push("Mobile");
  if (!data.email.trim()) missing.push("Email");
  if (!data.permanentAddress.trim()) missing.push("Permanent address");
  if (!data.state.trim()) missing.push("State");
  if (!data.pin.trim()) missing.push("PIN code");
  const eduOk = data.education.some((e) => e.exam.trim() && e.board.trim() && e.year.trim());
  if (!eduOk) missing.push("At least one education row (exam, board, year)");
  if (!data.place.trim()) missing.push("Place (declaration)");
  if (!data.declarationDate) missing.push("Declaration date");
  return missing;
}

export const STORAGE_KEY = "sizetokb-biodata-v1";
