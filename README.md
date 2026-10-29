# AP1 · 从底线，看见比赛

Aaron Pei 的足球摄影作品集。以照片为主角，用克制的空间感呈现球场底线的观看体验。

**在线访问：[aaronpe1.github.io](https://aaronpe1.github.io/)**

## 作品

| 比赛 | 日期 | 作品数 |
| --- | --- | ---: |
| 武汉车谷江大女足 vs 浙江杭州银行女足 · 女超联赛 | 2026.10.25 | 19 |
| FC Cincinnati vs Chicago Fire FC · MLS | 2026.04.18 | 15 |
| FC Cincinnati 2 vs CT United FC · MLS NEXT Pro | 2026.03.01 | 10 |

共 44 件作品，包含单张照片和视觉组照。网站顶部可直接切换比赛，也可通过“比赛目录”查看完整比赛名称。

## 浏览方式

- **看作品**：左右箭头、键盘方向键或触屏滑动切换照片；底部展开这一场的底片，按题材筛选。
- **放大照片**：默认显示适合屏幕的高清版本。点击“原始尺寸”或“打开原文件”才下载完整原图。
- **走进底线**：进入全屏球场，拖动环顾，沿三个停留点移动；导览中可以直接切换三场比赛。点击“走近作品”靠近球场中的照片，Esc 返回。

球场是为摄影体验制作的场景，并非实际比赛场馆的精确复原。首次使用需下载三维模块；不支持 WebGL 的设备仍可使用普通作品预览。

## 图片与性能

`dist/assets/originals/` 保留完整原尺寸文件，浏览优化不会覆盖这些文件。43 件为原文件复制，1 件 PSD 组照为全分辨率合成导出；来源记录见 `originals-audit.json`。

页面使用从原图生成的 960px / 1920px WebP 显示副本，保持完整构图。先显示缩略图，再呈现高清图，并在网络允许时预加载相邻作品。球场也使用显示副本；主体先出现，再补充座椅和近景细节。静态场景按材质合并绘制，手机减少阴影、草叶数量和渲染分辨率。

## 本地运行

需要 Python 3 和 Pillow。第一次运行或更换原图后，先生成显示副本：

```sh
python3 -m pip install Pillow==11.3.0
python3 build_previews.py
python3 -m http.server 8795 --directory dist
```

打开 `http://localhost:8795/`。请通过 HTTP 服务器预览，直接双击 HTML 无法可靠加载三维模块。

## 发布到 GitHub Pages

仓库 Settings → Pages → Source 选择 **GitHub Actions**。

推送到 `main` 后，`.github/workflows/static.yml` 自动生成显示副本，并将 **`dist`** 发布到 Pages。源文件、说明和审计记录不会作为网站根目录发布。部署结果可在仓库的 Actions 中查看。

## 更新作品

1. 将完整原图放入 `dist/assets/originals/`，缩略图放入 `dist/assets/thumbs/`。
2. 同步维护 `photos.json` 与 `dist/data.js` 中的作品信息：唯一 ID、标题、比赛、题材、宽高和文件路径。
3. 新增比赛时，在 `dist/app.js` 的 `MATCHES`、`MATCH_LABELS` 中配置比赛名称、日期和封面；三组导航按数据生成。
4. 运行显示副本生成脚本并本地检查，之后推送到 `main`。

现有三场比赛的作品会按题材自动分配到球场停留点。

## AP1 标志与版权

个人摄影品牌为 **AP1**。标志使用提供的 SVG 母版，保持原始比例、最小尺寸和安全留白，不重绘或擅自变形。详细规范见仓库中的《个人标志使用规范.pdf》。

摄影作品与个人标志版权归 AP1 / Aaron Pei 所有；公开展示不代表授权转载或商用。Three.js 的许可见 `dist/vendor/THREE-LICENSE.txt`。
