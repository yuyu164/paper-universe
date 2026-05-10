# 纹样板块改为图片上传逻辑的修改计划

## 摘要 (Summary)

将“纹样里的密码”板块从原本硬编码的 SVG 代码渲染方式，重构为支持用户自行上传图片（PNG/JPG/SVG等）的方式。通过修改数据结构和组件渲染逻辑，用户只需将图片放入指定目录即可生效。

## 当前状态分析 (Current State Analysis)

* `src/types/index.ts` 中 `Pattern` 接口使用 `svgContent: string` 来存储冗长的 SVG 内部节点字符串。

* `src/data/patterns.ts` 中每个纹样硬编码了复杂的 SVG 路径。

* `src/components/ui/PatternCard.tsx` 使用 `<svg dangerouslySetInnerHTML={{ __html: pattern.svgContent }} />` 来渲染矢量图。

## 待办清单与提议的修改 (Proposed Changes & Todo List)

* [ ] **Step 1: 修改接口类型 (`src/types/index.ts`)**

  * **修改内容**：将 `Pattern` 接口中的 `svgContent: string` 替换为 `image: string`。

  * **原因**：数据结构需要适配图片路径的存储。

* [ ] **Step 2: 更新数据文件 (`src/data/patterns.ts`)**

  * **修改内容**：删除所有 12 个纹样对象中庞大的 `svgContent` 字段，替换为对应的图片路径，例如 `image: '/images/patterns/bat.png'`。

  * **原因**：将数据源指向本地静态图片。

* [ ] **Step 3: 改造卡片组件 (`src/components/ui/PatternCard.tsx`)**

  * **修改内容**：

    1. 引入 `next/image` 的 `Image` 组件。
    2. 将 `<svg dangerouslySetInnerHTML...>` 替换为 `<Image src={pattern.image} alt={pattern.name} fill className="object-contain p-4" />`。
    3. 保留原有的卡片背景 (`bg-white/10`) 和悬浮动效 (`group-hover:rotate-3 group-hover:scale-105`)。

  * **原因**：实现图片的高性能渲染，同时保持原有的精美视觉效果和交互动画。

* [ ] **Step 4: 创建图片存储目录**

  * **修改内容**：使用工具创建 `public/images/patterns/` 目录。

  * **后续操作**：修改完成后，您只需要将自己的纹样图片命名为对应的 id（如 `bat.png`, `fish.png`, `peony.png` 等）并存入该目录即可直接在网页上看到效果。

## 假设与决策 (Assumptions & Decisions)

* 假设用户上传的图片为背景透明的 PNG 或 SVG 格式，这样能够最好地与当前深色卡片背景融合。

* 默认图片扩展名使用 `.png`，如果用户有其他格式（如 `.jpg`, `.svg`），可以在上传时自行在 `src/data/patterns.ts` 中修改对应后缀。

## 验证步骤 (Verification)

1. 检查 TypeScript 是否有类型报错（完成 Step 1, 2 后自动消除）。
2. 在浏览器中打开页面，检查“纹样里的密码”板块的卡片是否渲染了 `<img src="/images/patterns/..." />` 且布局/悬浮动画没有损坏。
3. （由于未上传真实图片，可能会显示占位符或裂图，这是预期内的，用户上传后即恢复正常）。

