 

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function PromptPage() {
  const [text, setText] = useState('')
  const navigate = useNavigate()
  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    navigate('/prompt-chat', { state: { message: trimmed } })
  }
  return (
    <div className="gs-layout" style={{ gridTemplateColumns: '1fr' }}>
      <section className="gs-content">
        <div className="prompt-wrap">
          <div className="prompt-area">
            <div className="prompt-frame">
              <div className="prompt-hero">
                <img src="/logo.png" alt="NoteFit" style={{ height: '100px', marginBottom: '0.5rem' }} />
                <h2>자연어로 고객 데이터를 불러오고, 분석하고, 전송하세요</h2>
                <p style={{ margin: '0.35rem 0 0', color: '#475569', textAlign: 'center' }}>
                  업로드된 DB를 기반으로 고객 조회, 리포트 생성, 메시지 전송 등 CRM 업무를 프롬프트만으로 처리합니다.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.75rem' }}>
                  <button className="prompt-action" onClick={() => setText('김혜윤 고객 최근 상담 요약 보여줘')}>예시: 상담 요약</button>
                  <button className="prompt-action" onClick={() => setText('윤서진 학부모에게 성적 리포트 메시지 작성해줘')}>예시: 메시지 생성</button>
                  <button className="prompt-action" onClick={() => setText('영어 성적 하락 고객 리스트와 연락처 알려줘')}>예시: 고객 검색</button>
                </div>
              </div>
              <div className="prompt-box">
                <div className="prompt-box__plus" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </div>
                <input className="prompt-input" placeholder="예: 윤서진 학부모에게 리포트 요약 메시지 보내줘" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }} />
                <div className="prompt-actions">
                  <button className="prompt-action" aria-label="voice">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1v22"/>
                      <rect x="9" y="4" width="6" height="12" rx="3"/>
                    </svg>
                  </button>
                  <button className="prompt-action" aria-label="send" onClick={handleSend}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2L11 13"/>
                      <path d="M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                  </button>
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


