<div align="center">

# 🎬 Emoji Cinema

### 用表情符号讲述你的故事

![Emoji Cinema](https://img.shields.io/badge/Emoji-Cinema-6c5ce7?style=for-the-badge&logo=emoji&logoColor=white)
![Stars](https://img.shields.io/github/stars/wangzi5151/emoji-cinema?style=for-the-badge&color=ffd700)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![HTML5](https://img.shields.io/badge/built_with-HTML5-e34f26?style=for-the-badge&logo=html5&logoColor=white)

<br>

**输入任何故事、电影或场景，自动匹配关键词生成绝美的 Emoji 电影卡片**

[🌐 在线体验](https://wangzi5151.github.io/emoji-cinema/) · [📱 下载 APK](https://github.com/wangzi5151/emoji-cinema/releases/download/v1.1.0/Emoji.Cinema.v1.1.0.apk) · [⭐ Star](https://github.com/wangzi5151/emoji-cinema/stargazers) · [🍴 Fork](https://github.com/wangzi5151/emoji-cinema/fork)

</div>

---

## ✨ 这是什么？

**Emoji Cinema** 是一款创意 Web 应用，它能将你输入的任何文字（电影名、故事、场景、日常事件）转化为精美的 Emoji 叙事卡片。

你只需要输入 → 点击生成 → 获得一张绝美的 Emoji 故事卡片 → 本地保存、系统分享或下载图片！

> 🎯 **零依赖 · 纯 HTML · 打开即用 · 300KB 以内**

## 🔥 为什么它会火？

| 特性 | 说明 |
|------|------|
| 🎯 **零门槛** | 任何人打开网页就能用，无需注册、无需安装 |
| 📱 **移动优先** | 完美适配手机，在任何设备上都能优雅运行 |
| 🎨 **绝美视觉** | 动态渐变背景 + Emoji 弹入动画 + 毛玻璃效果 |
| 📲 **一键分享** | 系统分享（Web Share）/ 下载 PNG / 复制 Emoji / 分享到 Twitter |
| 🧠 **关键词匹配** | 内置 178 个场景关键词，按最长关键词优先匹配（纯前端，不调用 AI 模型） |
| 🌈 **无限可能** | 支持任何语言输入，创意无限 |

## 📱 Android APK

[![下载 APK](https://img.shields.io/badge/下载-Emoji.Cinema.v1.1.0.apk-blue?style=for-the-badge&logo=android)](https://github.com/wangzi5151/emoji-cinema/releases/download/v1.1.0/Emoji.Cinema.v1.1.0.apk)

| 指标 | 数值 |
|------|------|
| 文件大小 | 3.7 MB |
| 最低 Android 版本 | Android 7.0 (API 24) |
| 构建工具 | Capacitor 6 + Gradle |

**安装步骤：**
1. 下载 APK 文件
2. 在手机设置中允许「安装未知来源应用」
3. 点击 APK 文件安装
4. 打开 Emoji Cinema 开始使用

---

## 🚀 快速开始

### 方式一：直接打开

无需安装任何东西，打开 `index.html` 即可使用！

```bash
# 克隆项目
git clone https://github.com/wangzi5151/emoji-cinema.git

# 打开浏览器
open emoji-cinema/index.html
# 或者
xdg-open emoji-cinema/index.html
```

### 方式二：本地开发服务器

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行测试
npm test

# 构建生产版本
npm run build
```

## 📸 效果展示

```
输入: 泰坦尼克号
输出: 🚢 ❤️ 👨‍👩‍👧‍👦 💎 ❄️ 🌊

输入: 程序员的一天
输出: 💻 🐛 😴 ☕ 🍕 🚀

输入: AI觉醒
输出: 🤖 👁️ 🧠 ⚡ 🔓 🌍
```

## 🎮 使用方法

1. **输入文字** — 在文本框中输入任何故事、电影名或场景描述
2. **点击生成** — 点击「✨ 生成 Emoji 电影」按钮
3. **欣赏结果** — 查看自动匹配生成的 Emoji 故事卡片
4. **分享传播** — 系统分享 / 下载卡片图片 / 复制 Emoji / 分享到社交媒体
5. **本地收藏** — 生成的故事会自动保存到「我的故事」，可重新查看或删除

### 💡 热门话题推荐

- 复仇者联盟终局之战
- 一只狗等主人回家
- 期末考试前夜
- 人工智能觉醒
- 分手后第一次偶遇
- 打工人的一天
- 龙与地下城冒险
- 赛博朋克城市

## 🧩 技术架构

```
emoji-cinema/
├── index.html          # 页面与交互
├── logic.js           # 字素拆分 / 映射清洗 / 最长匹配
├── meme-data.js       # 场景映射与画廊数据
├── package.json        # Vite 配置
├── README.md           # 你在看的这个
└── LICENSE             # MIT License
```

**技术栈：**
- 🏗️ **HTML5 + CSS3** — 纯原生，无框架依赖
- 🎨 **CSS Grid + Flexbox** — 现代布局
- ✨ **CSS Animations** — Emoji 弹入动画 + 浮动效果
- 🖌️ **Canvas API** — 一键生成 PNG 卡片
- 📐 **CSS Custom Properties** — 暗色主题系统
- 📱 **Mobile-First Design** — 完美适配所有屏幕

## 🎯 核心功能

### 🎨 绝美卡片生成
- 动态渐变背景
- Emoji 弹入动画
- 响应式设计，完美适配手机

### 📲 一键分享
- **系统分享** — 支持 Web Share API，移动端可直接分享到系统应用
- **下载 PNG** — 高质量卡片图片，适合社交媒体
- **分享 Twitter** — 一键发布到 Twitter/X
- **复制 Emoji** — 直接复制到剪贴板

### 🧠 关键词映射
- 内置 178 个热门场景关键词映射（已清洗普通文字和乱码）
- 按最长关键词优先匹配，避免 “AI” 抢先匹配 “AI觉醒”
- 支持中英文混合输入
- 使用 Intl.Segmenter 按字素处理 ZWJ / 变体选择符 / 旗帜等 Emoji 序列

### 🌙 暗色主题
- 护眼暗色设计
- 动态网格背景
- 毛玻璃效果

## 📊 项目数据

| 指标 | 数值 |
|------|------|
| 文件数量 | 1 个 HTML + 2 个逻辑脚本 |
| 文件大小 | < 300KB |
| 依赖数量 | 0 个运行时依赖 |
| 内置 Emoji | 378 |
| 支持场景 | 178 |
| 响应式 | ✅ 完美适配 |

## 🗺️ Roadmap

- [x] 💾 故事持久化 — 生成的故事保存在本地，可随时重新查看或删除
- [x] 📤 Web Share — 支持系统原生分享，不支持时回退到复制
- [ ] 🌐 接入真实 AI API (GPT/Claude) 生成更精准的 Emoji
- [ ] 🎵 添加音效反馈
- [ ] 🌍 多语言支持 (English, 日本語, 한국어)
- [ ] 📱 PWA 支持 (离线使用)
- [ ] 🎨 自定义卡片主题色
- [ ] 🏆 排行榜功能
- [ ] 👥 多人协作 Emoji 故事接龙
- [ ] 🤖 AI 对话模式 — 用 Emoji 聊天
- [ ] 📊 数据可视化 — 最热门的 Emoji 使用趋势

## 🤝 Contributing

欢迎贡献代码、报告问题或提出建议！

1. Fork 本仓库
2. 创建你的分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 License

本项目采用 MIT License 开源协议。

## 🙏 致谢

- 感谢所有为 Emoji 标准化做出贡献的人
- 感谢开源社区的灵感

---

<div align="center">

**如果觉得有用，请给个 ⭐ Star 支持一下！**

Made with ❤️ by [wangzi5151](https://github.com/wangzi5151)

</div>
