import { Link } from 'react-router-dom'

function GetStarted() {
  return (
    <div className="gs-layout">
      <aside className="gs-sidebar">
        <div className="gs-logo">로고</div>
        <div className="gs-quick">
          <button className="icon-circle" aria-label="camera">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l2-3h8l2 3h3a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="14" r="4"/>
            </svg>
          </button>
          <button className="icon-circle" aria-label="file">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <path d="M14 2v6h6"/>
            </svg>
          </button>
          <button className="icon-circle icon-circle--bell" aria-label="notification">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span className="notif-dot" aria-hidden="true"></span>
          </button>
        </div>
        <nav className="gs-nav">
          <Link className="gs-nav__item" to="/">🏠 홈</Link>
          <button className="gs-nav__item is-active">⬆ 업로드</button>
          <button className="gs-nav__item">🗂 DB 조회</button>
          <button className="gs-nav__item">🧩 프롬프트</button>
        </nav>
      </aside>

      <section className="gs-content">
        <header className="gs-header">
          <h2>자료 업로드</h2>
          <div className="gs-tools">
            <button className="btn btn--secondary">사진 촬영</button>
            <button className="btn btn--primary">파일 업로드</button>
          </div>
        </header>

        <div className="gs-canvas">
          <div className="doc-toolbar">
            <div className="doc-toolbar__left">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <div className="doc-toolbar__title">이름 없는 노트북</div>
          </div>
          <div className="doc-page">
            <div className="doc-lines"></div>
          </div>
        </div>

        <div className="gs-actions">
          <button className="btn btn--secondary">✈ 공유하기</button>
          <div className="gs-actions__right">
            <button className="btn btn--primary large">DB 저장하기</button>
            <div className="spinner">
              <div className="ring"></div>
              <span>Loading</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GetStarted


