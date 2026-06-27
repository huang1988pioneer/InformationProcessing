import { readFileSync, writeFileSync } from "node:fs";

const source = readFileSync("index.html", "utf8");
const articles = [...source.matchAll(/<article class="question" id="question-(\d+)">([\s\S]*?)<\/article>/g)]
  .map((match) => {
    const id = Number(match[1]);
    const html = match[2].trim();
    const title = html.match(/<h2>([\s\S]*?)<\/h2>/)?.[1].replace(/\s+/g, " ").trim() ?? `題目 ${id}`;
    const points = html.match(/<p>配分 ([\s\S]*?)<\/p>/)?.[1].replace(/\s+/g, " ").trim() ?? "";
    return { id, html, title, points };
  })
  .sort((a, b) => a.id - b.id);

const subjectMeta = [
  [1, 4, "關務人員考試", "三等", "資訊處理", "資料庫應用", "115-customs-third-database-application"],
  [5, 8, "關務人員考試", "三等", "資訊處理", "資通網路", "115-customs-third-network"],
  [9, 12, "關務人員考試", "三等", "資訊處理", "資料結構", "115-customs-third-data-structures"],
  [13, 16, "關務人員考試", "四等", "資訊處理（選試英文）", "程式設計概要", "115-customs-fourth-programming"],
  [17, 17, "關務人員考試", "四等", "資訊處理（選試英文）", "計算機概要", "115-customs-fourth-computer-overview"],
  [18, 21, "身心障礙人員考試", "三等", "資訊處理", "資料結構", "115-disability-third-data-structures"],
  [22, 25, "身心障礙人員考試", "三等", "資訊處理", "資料庫應用", "115-disability-third-database-application"],
  [26, 29, "身心障礙人員考試", "三等", "資訊處理", "資通網路與安全", "115-disability-third-network-security"],
  [30, 33, "身心障礙人員考試", "三等", "資訊管理", "資訊管理", "115-disability-third-information-management"],
  [34, 37, "刑事警察人員考試", "三等", "數位鑑識組", "網路與資訊安全", "115-criminal-third-cyber-security"],
  [38, 41, "刑事警察人員考試", "三等", "數位鑑識組", "電腦通訊（包括無線網路）", "115-criminal-third-computer-communications"],
  [42, 45, "刑事警察人員考試", "三等", "數位鑑識組", "資料庫管理與運用", "115-criminal-third-database-management"],
];

const labels = ["一", "二", "三", "四", "五"];

function metaFor(id) {
  const row = subjectMeta.find(([start, end]) => id >= start && id <= end);
  if (!row) throw new Error(`No metadata for question-${id}`);
  const [start, , examName, grade, category, subject, subjectSlug] = row;
  return {
    year: "115年",
    examName,
    grade,
    category,
    subject,
    subjectSlug,
    order: labels[id - start] ?? String(id - start + 1),
  };
}

function promptBlock(text) {
  return `<section class="prompt-block">
            <h3>題目</h3>
            <p>${text}</p>
          </section>`;
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function newArticle(number, title, points, prompt, answerHtml) {
  return `<div class="question-head">
            <span class="number">${number}</span>
            <div>
              <h2>${title}</h2>
              <p>配分 ${points}</p>
            </div>
          </div>

          ${promptBlock(prompt)}

          <section class="answer-block">
            ${answerHtml}
          </section>`;
}

const newQuestions = [
  {
    id: 46,
    title: "資料庫專有名詞：分散式資料庫、ACID、資料倉儲與 OLAP",
    points: "25 分",
    html: newArticle(
      "一",
      "資料庫專有名詞：分散式資料庫、ACID、資料倉儲與 OLAP",
      "25 分",
      "闡述分散式資料庫、ACID、資料倉儲與線上分析處理（OLAP）的意涵。",
      `<h3>名詞說明</h3>
            ${list([
              "<strong>分散式資料庫：</strong>資料實際儲存在不同節點或地點，但透過網路與分散式 DBMS 整合，讓使用者像操作單一資料庫一樣查詢與更新。重點在資料分散、位置透明、複製或分割管理，以及跨節點交易協調。",
              "<strong>Atomicity 原子性：</strong>交易中的所有操作視為不可分割的單位，要全部成功，要全部復原。",
              "<strong>Consistency 一致性：</strong>交易執行前後都必須讓資料庫維持完整性限制與商業規則，例如主鍵、外鍵與餘額不可為負等規則。",
              "<strong>Isolation 隔離性：</strong>多個交易並行時，中間結果不應互相干擾，結果應如同某種序列順序執行。",
              "<strong>Durability 持久性：</strong>交易一旦提交，結果即使遇到當機也要能透過日誌、備份或復原機制保存。",
              "<strong>資料倉儲：</strong>整合來自多個作業系統的歷史資料，通常具主題導向、整合性、時間變異與非揮發特性，用於決策分析而非日常交易處理。",
              "<strong>OLAP：</strong>線上分析處理，用多維度資料模型快速做彙總、切片、切塊、鑽研與樞紐分析，支援管理者從不同角度觀察趨勢。"
            ])}`
    ),
  },
  {
    id: 47,
    title: "學生選課 ERD 與屬性設計",
    points: "20 分",
    html: newArticle(
      "二",
      "學生選課 ERD 與屬性設計",
      "20 分",
      "一位學生可以選修多門課程，且至少必須選修一門課程；一門課程可以被多位學生選修，但也有可能沒有學生選修。請繪製 ERD，並列出學生與課程各 4 個屬性。",
      `<h3>ERD 關係</h3>
            <pre class="diagram">學生 Student 1..* ── 選修 Enroll ── 0..* 課程 Course</pre>
            <p>學生與課程是多對多關係。學生端為必參與，因為每位學生至少選一門課；課程端為選擇參與，因為一門課可能尚未有學生選修。實作成關聯表時可設計為：</p>
            <pre><code>Student(StudentID PK, Name, Department, Grade)
Course(CourseID PK, CourseName, Credits, Teacher)
Enroll(StudentID FK, CourseID FK, EnrollDate, Score,
       PK(StudentID, CourseID))</code></pre>
            <h3>屬性說明</h3>
            ${list([
              "<strong>學生 StudentID：</strong>學生唯一識別碼，可作為主鍵。",
              "<strong>學生 Name：</strong>學生姓名。",
              "<strong>學生 Department：</strong>所屬系所或班級，用於分類管理。",
              "<strong>學生 Grade：</strong>年級或就讀階段。",
              "<strong>課程 CourseID：</strong>課程唯一識別碼，可作為主鍵。",
              "<strong>課程 CourseName：</strong>課程名稱。",
              "<strong>課程 Credits：</strong>學分數，可用於畢業學分計算。",
              "<strong>課程 Teacher：</strong>授課教師或負責教師。"
            ])}`
    ),
  },
  {
    id: 48,
    title: "Dirty Read 與 Lost Update 情境",
    points: "20 分",
    html: newArticle(
      "三",
      "Dirty Read 與 Lost Update 情境",
      "20 分",
      "請闡述 Dirty Read 與 Lost Update 在資料庫交易隔離性不足時可能發生的情境。",
      `<h3>Dirty Read</h3>
            <p>髒讀是指交易讀到另一個尚未提交交易的資料。若 T1 將帳戶餘額由 1000 改成 800 但尚未 commit，T2 立刻讀到 800 並據此產生報表；之後 T1 rollback，資料庫實際餘額回到 1000，T2 使用的 800 就是不可靠的中間結果。</p>
            <h3>Lost Update</h3>
            <p>更新遺失是指兩個交易根據同一筆舊值更新，後寫入者覆蓋先寫入者，使其中一個更新消失。例如庫存原為 10，T1 讀到 10 後準備扣 2，T2 也讀到 10 後準備扣 3。T1 寫回 8，T2 再寫回 7，最後結果為 7，但正確扣除 5 件後應為 5，T1 的扣 2 被覆蓋。</p>
            <p>可用鎖定、較高隔離層級、版本控制或樂觀鎖檢查來避免這類問題。</p>`
    ),
  },
  {
    id: 49,
    title: "選課表 BCNF 判斷與分解",
    points: "20 分",
    html: newArticle(
      "四",
      "選課表 BCNF 判斷與分解",
      "20 分",
      "資料表屬性為 (StudentID, CourseID, Instructor)，主鍵為 (StudentID, CourseID)。規則：一位學生可修多門課、一門課可有多位學生修習、每一門課只由一位教師授課、每位教師只教一門課。請說明為何不符合 BCNF，並分解成 2 個表格。",
      `<h3>違反原因</h3>
            <p>原表 R(StudentID, CourseID, Instructor) 的候選鍵可視為 (StudentID, CourseID)。但依題意有函數相依：</p>
            <pre><code>CourseID -> Instructor
Instructor -> CourseID</code></pre>
            <p><code>CourseID</code> 與 <code>Instructor</code> 都不是原表的超鍵，卻能決定另一個非鍵屬性，因此違反 BCNF「每一個非平凡函數相依 X -> Y，X 必須是超鍵」的要求。</p>
            <h3>BCNF 分解</h3>
            <pre><code>Enrollment(StudentID, CourseID)
PK: (StudentID, CourseID)
FK: CourseID -> CourseInstructor.CourseID

CourseInstructor(CourseID, Instructor)
PK: CourseID
UNIQUE: Instructor</code></pre>
            <p>第一個表保留學生選課事實；第二個表描述課程與教師一對一對應，消除同一課程教師重複儲存造成的更新異常。</p>`
    ),
  },
  {
    id: 50,
    title: "Orders 分組彙總與 HAVING 查詢結果",
    points: "15 分",
    html: newArticle(
      "五",
      "Orders 分組彙總與 HAVING 查詢結果",
      "15 分",
      "針對 Orders 資料表執行 SQL：依 ProductCategory 分組，計算 SUM(TotalAmount) AS TotalSales，並只列出 SUM(TotalAmount) > 3000 的群組。請說明功能與結果集。",
      `<h3>SQL 功能</h3>
            <p>此查詢會先依 <code>ProductCategory</code> 將訂單分組，再用 <code>SUM(TotalAmount)</code> 計算各產品類別銷售總額。<code>HAVING</code> 是分組後條件，因此只保留總銷售額大於 3000 的產品類別。</p>
            <h3>計算</h3>
            ${list([
              "Laptop：1200 + 2400 + 1200 = 4800",
              "Phone：800 + 2400 + 1600 = 4800",
              "Tablet：500 + 1000 = 1500，不列出",
              "Keyboard：500 + 300 = 800，不列出"
            ])}
            <h3>結果集</h3>
            <table>
              <thead><tr><th>ProductCategory</th><th>TotalSales</th></tr></thead>
              <tbody>
                <tr><td>Laptop</td><td>4800.00</td></tr>
                <tr><td>Phone</td><td>4800.00</td></tr>
              </tbody>
            </table>`
    ),
  },
];

const allArticles = [...articles, ...newQuestions].sort((a, b) => a.id - b.id);
const records = allArticles.map((article) => {
  const meta = article.id >= 46
    ? {
        year: "115年",
        examName: "一般警察人員考試",
        grade: "三等",
        category: "警察資訊管理人員",
        subject: "資料庫應用",
        subjectSlug: "115-police-third-database-application",
        order: labels[article.id - 46],
      }
    : metaFor(article.id);

  return {
    id: article.id,
    slug: `question-${article.id}`,
    title: article.title,
    points: article.points,
    ...meta,
    html: article.html,
  };
});

const moduleText = `export type ExamQuestion = {
  id: number;
  slug: string;
  title: string;
  points: string;
  year: string;
  examName: string;
  grade: string;
  category: string;
  subject: string;
  subjectSlug: string;
  order: string;
  html: string;
};

export const questions = ${JSON.stringify(records, null, 2)} satisfies ExamQuestion[];

export const subjectSummaries = Array.from(
  questions.reduce((map, question) => {
    const existing = map.get(question.subjectSlug);
    if (existing) {
      existing.count += 1;
      existing.questionIds.push(question.id);
      return map;
    }

    map.set(question.subjectSlug, {
      slug: question.subjectSlug,
      year: question.year,
      examName: question.examName,
      grade: question.grade,
      category: question.category,
      subject: question.subject,
      count: 1,
      questionIds: [question.id],
    });
    return map;
  }, new Map<string, {
    slug: string;
    year: string;
    examName: string;
    grade: string;
    category: string;
    subject: string;
    count: number;
    questionIds: number[];
  }>())
  .values(),
);

export function getQuestionBySlug(slug: string) {
  return questions.find((question) => question.slug === slug);
}

export function getSubjectBySlug(slug: string) {
  const summary = subjectSummaries.find((subject) => subject.slug === slug);
  if (!summary) return undefined;
  return {
    ...summary,
    questions: questions.filter((question) => question.subjectSlug === slug),
  };
}
`;

writeFileSync("lib/exam-data.ts", moduleText);
console.log(`Generated ${records.length} questions.`);
