"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SubjectSummary } from "@/lib/exam-utils";

type FilterKey = "year" | "examName" | "level" | "track" | "subject";

type Props = {
  subjects: SubjectSummary[];
  options: Record<FilterKey, string[]>;
};

const filters: { key: FilterKey; label: string }[] = [
  { key: "year", label: "年份" },
  { key: "examName", label: "考試名稱" },
  { key: "level", label: "等級" },
  { key: "track", label: "類科" },
  { key: "subject", label: "考試科目" }
];

export function SubjectExplorer({ subjects, options }: Props) {
  const [selected, setSelected] = useState<Record<FilterKey, string>>({
    year: "",
    examName: "",
    level: "",
    track: "",
    subject: ""
  });

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) =>
      filters.every(({ key }) => !selected[key] || subject[key] === selected[key])
    );
  }, [selected, subjects]);

  return (
    <section className="explorer" aria-label="考題篩選">
      <div className="filter-grid">
        {filters.map(({ key, label }) => (
          <label key={key}>
            <span>{label}</span>
            <select
              value={selected[key]}
              onChange={(event) =>
                setSelected((current) => ({
                  ...current,
                  [key]: event.target.value
                }))
              }
            >
              <option value="">全部</option>
              {options[key].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <div className="result-toolbar">
        <p>符合 {filteredSubjects.length} 個科目</p>
        <button
          type="button"
          onClick={() =>
            setSelected({
              year: "",
              examName: "",
              level: "",
              track: "",
              subject: ""
            })
          }
        >
          清除條件
        </button>
      </div>

      <div className="subject-grid">
        {filteredSubjects.map((subject) => (
          <Link className="subject-card" href={`/exams/${subject.slug}`} key={subject.slug}>
            <span>{subject.year} / {subject.level}</span>
            <h2>{subject.subject}</h2>
            <p>{subject.examName} · {subject.track}</p>
            <small>{subject.questionCount} 題</small>
          </Link>
        ))}
      </div>
    </section>
  );
}
