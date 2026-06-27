import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyEnhancer } from "@/components/CopyEnhancer";
import { getQuestionBySlug, questions } from "@/lib/exam-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return questions.map((question) => ({ slug: question.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const question = getQuestionBySlug(slug);

  if (!question) {
    return {
      title: "找不到題目"
    };
  }

  return {
    title: `${question.title}｜資訊處理考題詳解`
  };
}

export default async function QuestionPage({ params }: Props) {
  const { slug } = await params;
  const question = getQuestionBySlug(slug);

  if (!question) {
    notFound();
  }

  const subjectQuestions = questions.filter((item) => item.subjectSlug === question.subjectSlug);
  const currentIndex = subjectQuestions.findIndex((item) => item.slug === question.slug);
  const previous = currentIndex > 0 ? subjectQuestions[currentIndex - 1] : undefined;
  const next = currentIndex < subjectQuestions.length - 1 ? subjectQuestions[currentIndex + 1] : undefined;

  return (
    <main className="exam-page">
      <CopyEnhancer />
      <aside className="exam-sidebar">
        <Link className="back-link" href="/">
          返回篩選
        </Link>
        <Link className="back-link" href={`/exams/${question.subjectSlug}`}>
          返回科目
        </Link>
        <div className="sidebar-block">
          <span>{question.year}</span>
          <strong>{question.subject}</strong>
          <p>{question.examName} / {question.grade} / {question.category}</p>
        </div>
        <nav aria-label="同科目題目">
          {subjectQuestions.map((item) => (
            <Link href={`/questions/${item.slug}`} key={item.id}>
              {item.order}、{item.title}
            </Link>
          ))}
        </nav>
      </aside>

      <section className="exam-content">
        <article
          className="question standalone"
          id={question.slug}
          dangerouslySetInnerHTML={{ __html: question.html }}
        />
        <nav className="pager" aria-label="上下題">
          {previous ? <Link href={`/questions/${previous.slug}`}>上一題：{previous.title}</Link> : <span />}
          {next ? <Link href={`/questions/${next.slug}`}>下一題：{next.title}</Link> : <span />}
        </nav>
      </section>
    </main>
  );
}
