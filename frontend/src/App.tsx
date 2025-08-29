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
          <h1 className="hero__title">SNU Startup Camp</h1>
          <p className="hero__subtitle">아이디어를 제품으로. 팀을 성장으로.</p>
          <div className="hero__cta">
            <Link className="btn btn--primary" to="/get-started">Get Started</Link>
            <span className="health">API: {apiHealth}</span>
          </div>
        </div>
      </header>

      <main className="section" id="get-started">
        <h2 className="section__title">왜 이 서비스를 쓰나요?</h2>
        <div className="grid">
          <div className="card feature">
            <h3>팀 매칭</h3>
            <p>관심사와 스킬 기반으로 팀원을 쉽게 찾아요.</p>
          </div>
          <div className="card feature">
            <h3>멘토링</h3>
            <p>전문가 피드백으로 빠르게 방향을 잡아요.</p>
          </div>
          <div className="card feature">
            <h3>리소스</h3>
            <p>스타트업 빌딩에 필요한 자료를 모아 제공해요.</p>
          </div>
        </div>

        <div className="cta">
          <a className="btn btn--secondary" href="#">지금 시작하기</a>
        </div>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} SNU Startup Camp</p>
      </footer>
    </>
  )
}

export default App
