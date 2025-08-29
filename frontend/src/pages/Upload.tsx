import './upload.css'

export default function UploadPage() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="logo">로그</div>
        <nav className="nav">
          <button className="nav__item">홈</button>
          <button className="nav__item nav__item--active">업로드</button>
          <button className="nav__item">DB 조회</button>
          <button className="nav__item">프롬프트</button>
        </nav>
      </aside>

      <section className="content">
        <header className="content__header">
          <h1>자료 업로드</h1>
          <div className="tabs">
            <button className="tab tab--active">사진 촬영</button>
            <button className="tab">파일 업로드</button>
          </div>
        </header>

        <div className="workspace">
          <div className="canvas">업로드 미리보기 영역</div>
          <div className="actions">
            <button className="btn btn--ghost">공유하기</button>
            <button className="btn btn--primary">DB 저장하기</button>
          </div>
        </div>
      </section>
    </div>
  )
}
