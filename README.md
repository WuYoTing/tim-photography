# WuYouTing Photography

Wu You Ting 的個人攝影作品集網站。使用 [Astro](https://astro.build) 建置,部署到 GitHub Pages(`https://wuyoting.github.io`)。

## 本機開發

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # 產出到 dist/
npm run preview   # 預覽 build 產出
```

> Node.js 版本需求:`>=20.3.0`(對應本專案釘住的 Astro 5.x)。若之後升級 Node 到 `>=22.12.0`,可以把 `astro`、`@astrojs/sitemap` 升到最新的 7.x 大版本。

## 新增一張作品

1. 把圖片放到 `src/assets/photos/<category>/<slug>.jpg`(`category` 目前是 `portrait` / `event` / `still`)
2. 在 `src/content/photos/<category>/<slug>.md` 新增一個檔案,frontmatter 範例:

   ```yaml
   ---
   title:
     en: "Photo title"
     zh-TW: "作品標題"
   slug: "unique-slug"
   category: "portrait"
   image: "../../../assets/photos/portrait/<slug>.jpg"
   alt:
     en: "Descriptive alt text"
     zh-TW: "無障礙替代文字"
   featured: false   # true 會出現在首頁精選區塊
   date: 2026-01-01
   order: 10          # 數字越小排越前面
   ---
   ```

3. `image` 路徑一律相對於這個 `.md` 檔案本身,且必須是本機檔案(不能用外部網址),Astro 才能做響應式圖片優化。

## 新增一個分類

編輯 `src/config/categories.ts`,在陣列裡新增一筆 `{ slug, label, description }`,並到 `src/content/config.ts` 的 `category: z.enum([...])` 裡加上同一個 slug。不需要改任何頁面版型程式碼。

## 新增/修改翻譯文字

- UI 固定文字(導覽、按鈕、表單標籤等):編輯 `src/i18n/en.json` 與 `src/i18n/zh-tw.json`,兩個檔案的 key 要保持一致,少一邊會在該語系顯示 raw key。
- 內容型文字(作品標題、caption):直接編輯對應 `.md` 檔案的雙語 frontmatter(`{ en, "zh-TW" }`)。

## 聯絡表單(Formspree)

1. 到 [Formspree](https://formspree.io) 註冊,建立一個表單並取得 endpoint URL(格式類似 `https://formspree.io/f/xxxxxxx`)。
2. 把 endpoint 填入 `src/config/site.ts` 的 `contactFormEndpoint`。
3. Contact 頁的表單會用 `fetch` 以 AJAX 方式送出,並在頁面上顯示成功/失敗訊息,不會整頁跳轉到 Formspree 網域。

## 網站分析(Umami)

1. 到 [Umami Cloud](https://cloud.umami.is) 或自架 Umami,建立一個網站並取得 Website ID。
2. 把 Website ID 填入 `src/config/site.ts` 的 `analytics.umamiWebsiteId`。若是自架版本,把 `analytics.umamiScriptUrl` 改成自架的 script 網址。

## 未來綁自訂網域

1. 在這個 repo 的 GitHub Pages 設定裡填入自訂網域(例如 `wuyoutingphoto.com`),GitHub 會自動在 repo 根目錄產生 `CNAME` 檔案(內容就是那個網域)。
2. 到網域註冊商設定 DNS:根網域用 `A` record 指到 GitHub Pages 的 IP,或用 `CNAME` record 指到 `wuyoting.github.io`(依 GitHub Pages 官方文件的最新 IP/設定為準)。
3. 更新 `astro.config.mjs` 的 `site` 欄位與 `src/config/site.ts` 的 `siteUrl` 為新網域,兩者都改完再重新部署。

## 已知限制

- **圖片保護**:作品集圖片停用了右鍵選單與拖曳另存,但這只是基本防護,不是絕對防盜用機制(瀏覽器開發工具、螢幕截圖等仍能取得圖片)。
- **佔位圖片**:目前 `src/assets/photos/portrait/` 底下是本機產生的純色佔位圖,交付前需替換成真實作品(替換方式同上「新增一張作品」,直接覆蓋同名圖檔或改 frontmatter 的 `image` 路徑)。
- 未使用 Tailwind CSS,樣式一律用原生 CSS + CSS variables(見 `src/styles/global.css`)。
