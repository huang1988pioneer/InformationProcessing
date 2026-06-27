import { SubjectExplorer } from "@/components/SubjectExplorer";
import { getOptions, getSubjectSummaries } from "@/lib/exam-utils";

export default function HomePage() {
  const subjects = getSubjectSummaries();
  const totalQuestions = subjects.reduce((sum, subject) => sum + subject.questionCount, 0);

  return (
    <main className="page-shell">
      <section className="page-hero">
        <div>
          <h1>依條件找到需要練習的考題詳解</h1>
          <p>
            選擇年份、考試名稱、等級、資訊處理類科與考試科目，或直接搜尋題目關鍵字進入題目頁面。
          </p>
        </div>
        <div className="metric-panel" aria-label="題庫統計">
          <span>目前收錄</span>
          <strong>{totalQuestions}</strong>
          <small>{subjects.length} 個科目</small>
        </div>
      </section>

      <SubjectExplorer
        subjects={subjects}
        options={{
          year: getOptions("year"),
          examName: getOptions("examName"),
          level: getOptions("level"),
          track: getOptions("track"),
          subject: getOptions("subject")
        }}
      />
    </main>
  );
}
