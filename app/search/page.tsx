import { SearchPanel } from "../../components/SearchPanel";
import { questions } from "../../lib/exam-data";

export default function SearchPage() {
  return (
    <main className="page-shell">
      <section className="compact-hero">
        <h1>搜尋題庫</h1>
        <p>輸入考試、科目、題目或解題關鍵字，從搜尋結果直接進入單題頁面。</p>
      </section>
      <SearchPanel questions={questions} />
    </main>
  );
}
