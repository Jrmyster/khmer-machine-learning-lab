export type Lang = "en" | "km";
export type Bilingual = { en: string; km: string };
export type TierId = "intro" | "medium" | "graduate" | "expert";
export type DiagramId = "rules" | "pipeline" | "cnn" | "attention" | "parallel";
export type LabId =
  | "regression"
  | "metrics"
  | "optimisation"
  | "attention"
  | "parallel";
export interface Lesson {
  id: string;
  title: Bilingual;
  paragraphs: Bilingual[];
  bullets?: Bilingual[];
  formulas?: string[];
  code?: { language: "Python" | "PyTorch" | "TypeScript"; source: string };
  diagram?: DiagramId;
  lab?: LabId;
  question: {
    prompt: Bilingual;
    choices: Bilingual[];
    answer: number;
    explanation: Bilingual;
  };
}
export interface Tier {
  id: TierId;
  title: Bilingual;
  subtitle: Bilingual;
  prerequisite: Bilingual;
  lessons: Lesson[];
}
