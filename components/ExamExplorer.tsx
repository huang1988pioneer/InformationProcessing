"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ExamQuestion } from "@/lib/exam-data";

type SubjectSummary = {
  slug: string;
  year: string;
  examName: string;
  grade: string;
  category: string;
  subject: string;
  count: number;
  questionIds: number[];
};

type Filters = {
  year: string;
  examName: string;
  grade: string;
  category: string;
  subject: string;
  query: string;
};

const emptyFilters: Filters = {
  year: "",
  examName: "",
  grade: "",
  category: "",
  subject: "",
  query: "",
};

export function ExamExplorer({
  questions,
  subjects,
}: {
  questions: ExamQuestion[];
  subjects: SubjectSummary[];
}) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);

  const options = useMemo(
    () => ({
      year: unique(questions.map((question) => question.year)),
      examName: unique(questions.map((question) => question.examName)),
      grade: unique(questions.map((question) => question.grade)),
      category: unique(questions.map((question) => question.category)),
      subject: unique(questions.map((question) => question.subject)),
    }),
    [questions],
  );

  const filteredQuestions = useMemo(() => {
    const normalizedQuery = filters.query.trim().toLowerCase();
    return questions.filter((question) => {
      const exactMatch =
        matches(filters.year, question.year) &&
        matches(filters.examName, question.examName) &&
        matches(filters.grade, question.grade) &&
        matches(filters.category, question.category) &&
        matches(filters.subject, question.subject);

      if (!exactMatch) return false;
      if (!normalizedQuery) return true;

      return [
        question.title,
        question.examName,
        question.grade,
        question.category,
        question.subject,
        question.html.replace(/<[^>]+>/g, " "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [filters, questions]);

  const filteredSubjects = useMemo(() => {
    const questionIds = new Set(filteredQuestions.map((question) => question.id));
    return subjects
      .map((subject) => ({
        ...subject,
        visibleCount: subject.questionIds.filter((id) => questionIds.has(id)).length,
      }))
      .filter((subject) => subject.visibleCount > 0);
  }, [filteredQuestions, subjects]);

  function updateFilter(name: keyof Filters, value: string) {
    setFilters((current) => ({ ...current, [name]: value }));
  }

  return (
    <main className="site-shell">
      <header className="landing-hero">
        <div>
          <p className="path">115年 / 資訊處理相關考試 / 多頁題庫</p>
          <h1>資訊處理考古題</h1>
          <p className="summary">
            依年份、考試名稱、等級、類別與科目篩選，或直接搜尋關鍵字進入題目頁面。
          </p>
        </div>
        <div className="score-card" aria-label="收錄題數">
          <span>收錄</span>
          <strong>{questions.length}</strong>
          <small>{subjects.length} 個科目</small>
        </div>
      </header>

      <section className="finder" aria-label="題庫篩選">
        <label>
          <span>年份</span>
          <select value={filters.year} onChange={(event) => updateFilter("year", event.target.value)}>
            <option value="">全部年份</option>
            {options.year.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          <span>考試名稱</span>
          <select value={filters.examName} onChange={(event) => updateFilter("examName", event.target.value)}>
            <option value="">全部考試</option>
            {options.examName.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          <span>等級</span>
          <select value={filters.grade} onChange={(event) => updateFilter("grade", event.target.value)}>
            <option value="">全部等級</option>
            {options.grade.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          <span>類別</span>
          <select value={filters.category} onChange={(event) => updateFilter("category", event.target.value)}>
            <option value="">全部類別</option>
            {options.category.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          <span>考試科目</span>
          <select value={filters.subject} onChange={(event) => updateFilter("subject", event.target.value)}>
            <option value="">全部科目</option>
            {options.subject.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="search-field">
          <span>搜尋</span>
          <input
            type="search"
            value={filters.query}
            onChange={(event) => updateFilter("query", event.target.value)}
            placeholder="輸入 SQL、ACID、TCP、BCNF..."
          />
        </label>
        <button className="reset-button" type="button" onClick={() => setFilters(emptyFilters)}>
          清除
        </button>
      </section>

      <section className="result-layout">
        <div>
          <div className="section-heading">
            <p>科目</p>
            <h2>符合條件的科目</h2>
          </div>
          <div className="subject-grid">
            {filteredSubjects.map((subject) => (
              <Link className="subject-card" href={`/exams/${subject.slug}`} key={subject.slug}>
                <span>{subject.year}</span>
                <strong>{subject.subject}</strong>
                <small>
                  {subject.examName} / {subject.grade} / {subject.category}
                </small>
                <em>{subject.visibleCount} 題</em>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="section-heading">
            <p>題目</p>
            <h2>搜尋結果</h2>
          </div>
          <div className="question-list">
            {filteredQuestions.map((question) => (
              <Link className="question-link" href={`/questions/${question.slug}`} key={question.slug}>
                <span>{question.order}</span>
                <div>
                  <strong>{question.title}</strong>
                  <small>
                    {question.examName} / {question.grade} / {question.category} / {question.subject}
                  </small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function unique(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, "zh-Hant"));
}

function matches(filter: string, value: string) {
  return !filter || filter === value;
}
