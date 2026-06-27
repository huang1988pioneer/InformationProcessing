import { questions, subjectSummaries } from "./exam-data";
import type { ExamQuestion } from "./exam-data";

export type ExamSubject = {
  slug: string;
  year: string;
  examName: string;
  level: string;
  track: string;
  subject: string;
  questions: ExamQuestion[];
};

export type SubjectSummary = Omit<ExamSubject, "questions"> & {
  questionCount: number;
  questionTitles: string[];
  searchText: string;
};

export function getSubjects(): ExamSubject[] {
  return subjectSummaries.map((subject) => ({
    slug: subject.slug,
    year: subject.year,
    examName: subject.examName,
    level: subject.grade,
    track: subject.category,
    subject: subject.subject,
    questions: questions.filter((question) => question.subjectSlug === subject.slug)
  }));
}

export function getSubjectSummaries(): SubjectSummary[] {
  return getSubjects().map(({ questions, ...subject }) => ({
    ...subject,
    questionCount: questions.length,
    questionTitles: questions.map((question) => question.title),
    searchText: [
      subject.year,
      subject.examName,
      subject.level,
      subject.track,
      subject.subject,
      ...questions.map((question) => question.title),
      ...questions.map((question) => question.html.replace(/<[^>]+>/g, " "))
    ].join(" ")
  }));
}

export function getOptions(key: keyof Pick<ExamSubject, "year" | "examName" | "level" | "track" | "subject">) {
  return Array.from(new Set(getSubjects().map((subject) => subject[key]))).filter(Boolean).sort();
}

export function getSubject(slug: string) {
  return getSubjects().find((subject) => subject.slug === slug);
}
