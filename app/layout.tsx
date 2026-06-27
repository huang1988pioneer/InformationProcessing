import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "資訊處理考題詳解",
  description: "依年份、考試名稱、等級、類科與考試科目瀏覽資訊處理考題詳解。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>
        <header className="site-header">
          <Link className="brand-link" href="/">
            <span className="brand-mark">IP</span>
            <span>
              <strong>資訊處理考題庫</strong>
              <small>多頁式詳解與搜尋</small>
            </span>
          </Link>
          <nav aria-label="主要導覽">
            <Link href="/">瀏覽科目</Link>
            <Link href="/exams">科目列表</Link>
            <Link href="/search">搜尋題庫</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
