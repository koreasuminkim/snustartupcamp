import { Link } from 'react-router-dom'

function PromptPage() {
  return (
    <div className="gs-layout">
      <aside className="gs-sidebar">
        <div className="gs-logo">로고</div>
        <div className="gs-quick">
          <button className="icon-circle" aria-label="camera">📷</button>
          <button className="icon-circle" aria-label="file">📄</button>
          <button className="icon-circle" aria-label="notification">🔔</button>
        </div>
        <nav className="gs-nav">
          <button className="gs-nav__item">🏠 홈</button>
          <Link className="gs-nav__item" to="/get-started">⬆ 업로드</Link>
          <button className="gs-nav__item">🗂 DB 조회</button>
          <button className="gs-nav__item is-active">🔗 프롬프트</button>
        </nav>
      </aside>

      <section className="gs-content">
        <div className="prompt-wrap">
          <div className="prompt-area">
            <div className="prompt-frame">
              <div className="prompt-hero">
                <h2>안녕하세요, 서영님</h2>
              </div>
              <div className="prompt-box">
                <div className="prompt-box__plus">+</div>
                <input className="prompt-input" placeholder="무엇이든 요청하세요." />
                <div className="prompt-actions">
                  <button className="prompt-action">🎙️</button>
                  <button className="prompt-action">🔍</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PromptPage


