"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ExamQuestion } from "@/lib/exam-data";

type Props = {
  questions: ExamQuestion[];
};

export function SearchPanel({ questions }: Props) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) return questions;
    return questions.filter((question) =>
      [
        question.year,
        question.examName,
        question.grade,
        question.category,
        question.subject,
        question.title,
        question.html.replace(/<[^>]+>/g, " ")
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [normalizedQuery, questions]);

  return (
    <section className="search-panel" aria-label="搜尋題庫">
      <label className="search-box">
        <span>搜尋考試、類科、科目或題目關鍵字</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="例如：物件導向、多型、ISMS、DNS、SQL"
          type="search"
        />
      </label>

      <div className="result-toolbar">
        <p>找到 {results.length} 題</p>
      </div>

      <div className="subject-list">
        {results.map((question) => (
          <Link className="subject-row" href={`/questions/${question.slug}`} key={question.slug}>
            <div>
              <strong>{question.title}</strong>
              <span>{question.year} / {question.examName} / {question.grade} / {question.category} / {question.subject}</span>
            </div>
            <small>{question.points}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}
