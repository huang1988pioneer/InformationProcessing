import Link from "next/link";
import { getSubjectSummaries } from "@/lib/exam-utils";

export const metadata = {
  title: "科目列表｜資訊處理考題詳解"
};

export default function ExamsPage() {
  const subjects = getSubjectSummaries();

  return (
    <main className="page-shell">
      <section className="compact-hero">
        <h1>科目列表</h1>
        <p>依科目瀏覽獨立題目頁，適合從考科開始複習。</p>
      </section>
      <div className="subject-grid">
        {subjects.map((subject) => (
          <Link className="subject-card" href={`/exams/${subject.slug}`} key={subject.slug}>
            <span>{subject.year} / {subject.level}</span>
            <h2>{subject.subject}</h2>
            <p>{subject.examName} · {subject.track}</p>
            <small>{subject.questionCount} 題</small>
          </Link>
        ))}
      </div>
    </main>
  );
}
