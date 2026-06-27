import Link from "next/link";
import { notFound } from "next/navigation";
import { getSubject, getSubjects } from "@/lib/exam-utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getSubjects().map((subject) => ({
    slug: subject.slug
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const subject = getSubject(slug);

  if (!subject) {
    return {
      title: "找不到科目"
    };
  }

  return {
    title: `${subject.subject}｜資訊處理考題詳解`,
    description: `${subject.year} ${subject.examName} ${subject.level} ${subject.track}`
  };
}

export default async function ExamSubjectPage({ params }: Props) {
  const { slug } = await params;
  const subject = getSubject(slug);

  if (!subject) {
    notFound();
  }

  return (
    <main className="exam-page">
      <aside className="exam-sidebar">
        <Link className="back-link" href="/">
          返回篩選
        </Link>
        <div className="sidebar-block">
          <span>科目</span>
          <strong>{subject.subject}</strong>
        </div>
        <nav aria-label="題目導覽">
          {subject.questions.map((question) => (
            <Link href={`/questions/${question.slug}`} key={question.id}>
              {question.order}、{question.title}
            </Link>
          ))}
        </nav>
      </aside>

      <article className="exam-content">
        <header className="exam-title">
          <p>{subject.year} / {subject.examName} / {subject.level} / {subject.track}</p>
          <h1>{subject.subject}</h1>
          <span>{subject.questions.length} 題</span>
        </header>

        <div className="question-list">
          {subject.questions.map((question) => (
            <Link className="question-row" href={`/questions/${question.slug}`} key={question.id}>
              <span>{question.order}</span>
              <div>
                <strong>{question.title}</strong>
                <small>{question.points}</small>
              </div>
            </Link>
          ))}
        </div>
      </article>
    </main>
  );
}
