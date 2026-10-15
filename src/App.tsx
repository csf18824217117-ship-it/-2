import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem('starter-theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // The page remains usable when browser storage is unavailable.
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const features = [
  { number: '01', title: '刚刚好的留白', text: '简洁的内容层次，让每一个想法都有自己的位置。' },
  { number: '02', title: '随屏幕，自在展开', text: '从手中的手机到桌面的宽屏，阅读与浏览始终从容。' },
  { number: '03', title: '明暗之间，都舒适', text: '选择喜欢的主题，下一次打开时，依然是熟悉的模样。' },
]

export default function App() {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('starter-theme', theme)
    } catch {
      // Theme switching does not depend on persistent storage.
    }
  }, [theme])

  return (
    <>
      <a className="skip-link" href="#main">跳转到正文</a>
      <header className="site-header container">
        <a className="brand" href="#" aria-label="初页首页">
          <span className="brand-icon" aria-hidden="true">初</span>
          <span>初页<span className="brand-en">FIRST PAGE</span></span>
        </a>
        <nav aria-label="主导航">
          <a href="#features">探索</a>
          <a href="#start">开始</a>
          <button
            className="theme-toggle"
            type="button"
            aria-label={theme === 'light' ? '切换至深色主题' : '切换至浅色主题'}
            onClick={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}
          >
            <span aria-hidden="true">{theme === 'light' ? '◐' : '☀'}</span>
            <span>{theme === 'light' ? '深色' : '浅色'}</span>
          </button>
        </nav>
      </header>

      <main id="main" className="container" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span aria-hidden="true" /> A PLACE TO BEGIN</p>
            <h1 id="hero-title">让想法，<br /><span>有个开始。</span></h1>
            <p className="hero-description">一张新页面，一点好奇心。<br />从这里出发，把心中的想法，慢慢变成看得见的作品。</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#start">开始探索 <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#features">看看这里有什么 <span aria-hidden="true">→</span></a>
            </div>
            <p className="hero-note">留一点空间，给接下来发生的美好。</p>
          </div>
          <div className="artwork" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="art-dot" />
            <div className="paper paper-back" />
            <div className="paper paper-front">
              <div className="paper-top"><span>THE FIRST PAGE</span><span>↗</span></div>
              <div className="paper-shape"><span /><span /><span /></div>
              <p>每一个开始，<br />都有无限可能。</p>
              <div className="paper-bottom"><span>YOUR NEXT CHAPTER</span><span>01</span></div>
            </div>
            <span className="art-caption">小小的起点 · 无限的可能</span>
          </div>
        </section>

        <section id="features" className="features" aria-labelledby="features-title">
          <div className="section-heading">
            <p className="eyebrow">THOUGHTFULLY SIMPLE</p>
            <h2 id="features-title">简单一点，专注多一点。</h2>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature" key={feature.number}>
                <span className="feature-number">{feature.number}</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="start" className="start-section" aria-labelledby="start-title">
          <div>
            <p className="eyebrow">MAKE IT YOURS</p>
            <h2 id="start-title">下一页，由你来写。</h2>
            <p>这里是网站的起点。换上你的内容，加入需要的功能，让它成为你的作品。</p>
          </div>
          <a className="button button-secondary" href="#hero-title">回到起点 <span aria-hidden="true">↑</span></a>
        </section>
      </main>

      <footer className="site-footer container">
        <span>初页 / FIRST PAGE</span>
        <span>为每一个新想法，留一页空白。</span>
      </footer>
    </>
  )
}
