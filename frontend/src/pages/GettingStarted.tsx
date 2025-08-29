import './upload.css'

export default function GettingStarted() {
  return (
    <div className="layout">
      <aside className="sidebar sidebar--wide">
        <button className="logo button-like">로고</button>

        <div className="icon-row">
          <button className="icon-btn">📷</button>
          <button className="icon-btn">📄</button>
          <button className="icon-btn">👤</button>
        </div>

        <nav className="nav nav--menu">
          <button className="nav__menu"><span>🏠</span> 홈</button>
          <button className="nav__menu nav__menu--active"><span>⤴️</span> 업로드</button>
          <button className="nav__menu"><span>📁</span> DB 조회</button>
          <button className="nav__menu"><span>🔗</span> 프롬프트</button>
        </nav>
      </aside>

      <section className="content content--padded">
        <header className="content__header content__header--space">
          <h1 className="page-title">자료 업로드</h1>
          <div className="tabs">
            <button className="tab tab--active">사진 촬영</button>
            <button className="tab">파일 업로드</button>
          </div>
        </header>

        <div className="workspace workspace--preview">
          <div className="preview-wrapper">
            <div className="preview-toolbar">이름 없는 노트북 (2)</div>
            <div className="preview-canvas lined"></div>
          </div>

          <div className="actions actions--split">
            <button className="btn btn--ghost btn--icon">✈️ 공유하기</button>
            <div className="right">
              <span className="spinner">Loading</span>
              <button className="btn btn--primary btn--xl">DB 저장하기</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
