import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

function App() {
  const [apiHealth, setApiHealth] = useState('checking...')

  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((d) => setApiHealth(d.status))
      .catch(() => setApiHealth('error'))
  }, [])

  return (
    <>
      <header className="hero">
        <div className="hero__content">
          <img src="/logo.png" alt="NoteFit" style={{ height: '40px', marginBottom: '0.75rem' }} />
          <h1 className="hero__title">NoteFit</h1>
          <p className="hero__subtitle">소상공인 아날로그 필기를 AI가 인식해 자동으로 DB에 저장하고, 그 데이터로 프롬프트만으로 간단한 CRM을 할 수 있는 SaaS</p>
          <div className="hero__cta">
            <Link className="btn btn--primary" to="/get-started">데이터 업로드 시작</Link>
            <span className="health">API: {apiHealth}</span>
          </div>
        </div>
      </header>

      <main className="section" id="get-started">
        <h2 className="section__title">NoteFit으로 가능한 일</h2>
        <div className="grid">
          <Link to="/get-started" className="card feature" style={{ textDecoration: 'none' }}>
            <h3>1. 필기 업로드</h3>
            <p>이미지 업로드만 하면 AI가 필기를 인식해 데이터베이스 스키마에 맞춰 저장합니다.</p>
          </Link>
          <Link to="/processing" className="card feature" style={{ textDecoration: 'none' }}>
            <h3>2. AI 처리 과정</h3>
            <p>인식 → DB 설계/저장 과정을 단계별 진행 로그로 확인합니다.</p>
          </Link>
          <Link to="/prompt" className="card feature" style={{ textDecoration: 'none' }}>
            <h3>3. 프롬프트 기반 CRM</h3>
            <p>저장된 데이터로 고객 탐색, 리포트 생성, 전송까지 대화형으로 수행합니다.</p>
          </Link>
        </div>

        <div className="cta">
          <Link className="btn btn--secondary" to="/prompt">프롬프트로 CRM 해보기</Link>
        </div>
      </main>

      <section className="section">
        <h2 className="section__title">CRM 메뉴</h2>
        <div className="grid">
          <Link to="/prompt" className="card feature" style={{ textDecoration: 'none' }}>
            <h3>고객 관리</h3>
            <p>고객 검색, 필터, 요약/리포트를 대화형으로 조회.</p>
          </Link>
          <a className="card feature" href="#" style={{ textDecoration: 'none' }}>
            <h3>거래/리드</h3>
            <p>리드 파이프라인과 스테이지를 추적합니다.</p>
          </a>
          <a className="card feature" href="#" style={{ textDecoration: 'none' }}>
            <h3>태스크</h3>
            <p>콜백/미팅/팔로업 일정을 관리합니다.</p>
          </a>
          <a className="card feature" href="#" style={{ textDecoration: 'none' }}>
            <h3>캠페인</h3>
            <p>문자/이메일 캠페인을 생성하고 성과를 추적합니다.</p>
          </a>
          <a className="card feature" href="#" style={{ textDecoration: 'none' }}>
            <h3>자동화</h3>
            <p>업로드 → 분류 → 알림/전송까지 자동 플로우.</p>
          </a>
          <Link to="/processing" className="card feature" style={{ textDecoration: 'none' }}>
            <h3>리포트</h3>
            <p>AI가 생성한 분석 테이블과 리포트를 확인합니다.</p>
          </Link>
          <Link to="/get-started" className="card feature" style={{ textDecoration: 'none' }}>
            <h3>데이터 업로드</h3>
            <p>아날로그 필기를 이미지로 첨부하여 DB에 저장.</p>
          </Link>
          <Link to="/prompt-chat" className="card feature" style={{ textDecoration: 'none' }}>
            <h3>메시지센터</h3>
            <p>리포트 생성/전송 대화 흐름을 다시 확인.</p>
          </Link>
          <a className="card feature" href="#" style={{ textDecoration: 'none' }}>
            <h3>설정</h3>
            <p>팀/권한, 데이터 스키마, 알림, 브랜딩 관리.</p>
          </a>
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} NoteFit</p>
      </footer>
    </>
  )
}

export default App
