import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="site-shell">
      <section className="compact-hero">
        <p className="path">404</p>
        <h1>找不到頁面</h1>
        <p>這個題目或科目頁不存在，請回到首頁重新篩選或搜尋。</p>
        <Link className="ghost-link" href="/">
          回首頁
        </Link>
      </section>
    </main>
  );
}
