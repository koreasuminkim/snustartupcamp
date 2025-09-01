import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Processing() {
  // 이미지 개수는 현재 표 구성에 직접 사용하지 않습니다

  const [step, setStep] = useState<number>(0)
  const [showTable, setShowTable] = useState<boolean>(false)
  const [typedMessage, setTypedMessage] = useState<string>('')
  const finalMessage = '제공해주신 필기를 성공적으로 삽입했어요. .......... 성공 1 / 실패 0'
  const [bottomText, setBottomText] = useState('')

  useEffect(() => {
    const timers: number[] = []
    timers.push(window.setTimeout(() => setStep(1), 1500))
    timers.push(window.setTimeout(() => setStep(2), 4000))
    timers.push(window.setTimeout(() => setStep(3), 7000))
    timers.push(window.setTimeout(() => setShowTable(true), 9000))
    return () => { timers.forEach((t) => clearTimeout(t)) }
  }, [])

  useEffect(() => {
    if (!showTable) return
    let index = 0
    setTypedMessage('')
    const intervalId = window.setInterval(() => {
      index += 1
      setTypedMessage(finalMessage.slice(0, index))
      if (index >= finalMessage.length) {
        clearInterval(intervalId)
      }
    }, 35)
    return () => { clearInterval(intervalId) }
  }, [showTable])

  // 결과 표는 인식된 데이터를 정리한 고정 스키마로 표시합니다.

  const handleBottomSend = () => {
    const trimmed = bottomText.trim()
    if (!trimmed) return
    setBottomText('')
  }

  return (
    <div className="gs-layout">
      <aside className="gs-sidebar">
        <div className="gs-logo"><img src="/logo.png" alt="NoteFit" style={{ height: '28px' }} /></div>
        <nav className="gs-nav">
          <Link className="gs-nav__item" to="/">🏠 홈</Link>
          <Link className="gs-nav__item" to="/get-started">⬅ 업로드로 돌아가기</Link>
        </nav>
      </aside>

      <section className="gs-content">
        <header className="gs-header">
          <h2>AI 처리 중</h2>
          <div className="gs-tools"></div>
        </header>

        <div style={{ marginTop: '1rem', display: 'grid', gap: '0.75rem', paddingBottom: '96px' }}>
          {step >= 1 && (
            <div className="fade-in-up" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <div aria-hidden="true" style={{ width: '28px', height: '28px', display: 'grid', placeItems: 'center' }}>🤖</div>
              <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '0.9rem 1rem' }}>
                {step === 1 ? (
                  <div className="spinner"><div className="ring"></div><span>필기 인식 중...</span></div>
                ) : (
                  <p style={{ margin: 0 }}>인식 완료</p>
                )}
              </div>
            </div>
          )}

          {step >= 2 && (
            <div className="fade-in-up" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <div aria-hidden="true" style={{ width: '28px', height: '28px', display: 'grid', placeItems: 'center' }}>🤖</div>
              <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '0.9rem 1rem' }}>
                {step === 2 ? (
                  <div className="spinner"><div className="ring"></div><span>기존 데이터베이스 구조 탐색 중...</span></div>
                ) : (
                  <p style={{ margin: 0 }}>탐색 완료</p>
                )}
              </div>
            </div>
          )}

          {step >= 3 && (
            <div className="fade-in-up" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <div aria-hidden="true" style={{ width: '28px', height: '28px', display: 'grid', placeItems: 'center' }}>🤖</div>
              <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '0.9rem 1rem' }}>
                {showTable ? (
                  <p style={{ margin: 0 }}>설계 완료</p>
                ) : (
                  <div className="spinner"><div className="ring"></div><span>새로운 테이블 설계 중...</span></div>
                )}
              </div>
            </div>
          )}

          {showTable && (
            <div className="fade-in-up" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <div aria-hidden="true" style={{ width: '28px', height: '28px', display: 'grid', placeItems: 'center' }}>🤖</div>
              <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '0.9rem 1rem', width: '100%' }}>
                <div style={{ marginBottom: '0.5rem', color: '#475569' }}>결과 데이터</div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                    <tr><th colSpan={2} style={{ textAlign: 'left', padding: '0.75rem 0.5rem', borderBottom: '1px solid #e5e7eb', background: '#f8fafc' }}>기본정보</th></tr>
                      <tr><th style={{ textAlign: 'left', width: '180px', padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>학생 - 성명</th><td style={{ padding: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>윤서진</td></tr>
                      <tr><th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>학생 - 학교</th><td style={{ padding: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>명덕고등학교 (과학중점반)</td></tr>
                      <tr><th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>학생 - 휴대폰 번호</th><td style={{ padding: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>010-1111-2345</td></tr>

                      <tr><th colSpan={2} style={{ textAlign: 'left', padding: '0.75rem 0.5rem', borderBottom: '1px solid #e5e7eb', background: '#f8fafc' }}>보호자</th></tr>
                      <tr><th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>보호자 - 성명</th><td style={{ padding: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>김혜윤</td></tr>
                      <tr><th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>보호자 - 휴대폰 번호</th><td style={{ padding: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>010-2222-3456</td></tr>
                      <tr><th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>보호자 - 주소</th><td style={{ padding: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>서울시 관악구 관악로1</td></tr>

                      <tr><th colSpan={2} style={{ textAlign: 'left', padding: '0.75rem 0.5rem', borderBottom: '1px solid #e5e7eb', background: '#f8fafc' }}>성적</th></tr>
                      <tr><th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>국어</th><td style={{ padding: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>1</td></tr>
                      <tr><th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>수학</th><td style={{ padding: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>2</td></tr>
                      <tr><th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>영어</th><td style={{ padding: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>5</td></tr>
                      <tr><th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>탐구</th><td style={{ padding: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>2</td></tr>
                      <tr><th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>전교과 내신 평균등급</th><td style={{ padding: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>2.33 (성적하락 중)</td></tr>
                      <tr><th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>모의고사 평균등급</th><td style={{ padding: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>2</td></tr>
                      <tr><th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>메모</th><td style={{ padding: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>영어 취약, 단어 암기 필요</td></tr>

                      <tr><th colSpan={2} style={{ textAlign: 'left', padding: '0.75rem 0.5rem', borderBottom: '1px solid #e5e7eb', background: '#f8fafc' }}>참고사항</th></tr>
                      <tr><th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>월</th><td style={{ padding: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>7~10 (물리)</td></tr>
                      <tr><th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>화</th><td style={{ padding: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>X</td></tr>
                      <tr><th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>수</th><td style={{ padding: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>7~10 (수학)</td></tr>
                      <tr><th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>목</th><td style={{ padding: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>X</td></tr>
                      <tr><th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>금</th><td style={{ padding: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>7~10 (수학)</td></tr>
                      <tr><th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>토</th><td style={{ padding: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>X</td></tr>
                      <tr><th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>일</th><td style={{ padding: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>7~10 (수학)</td></tr>
                      <tr><th style={{ textAlign: 'left', padding: '0.5rem' }}>메모</th><td style={{ padding: '0.5rem' }}>영어 추가 학습 필요</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {showTable && (
            <div className="fade-in-up" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <div aria-hidden="true" style={{ width: '28px', height: '28px', display: 'grid', placeItems: 'center' }}>🤖</div>
              <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '0.9rem 1rem' }}>
                <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{typedMessage}</p>
              </div>
            </div>
          )}
        </div>

        <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 50, paddingBottom: '0.75rem' }}>
          <div style={{ width: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="prompt-box">
              <div className="prompt-box__plus" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </div>
              <input className="prompt-input" placeholder="메시지를 입력하세요" value={bottomText} onChange={(e) => setBottomText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleBottomSend() }} />
              <div className="prompt-actions">
                <button className="prompt-action" aria-label="voice">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1v22"/>
                    <rect x="9" y="4" width="6" height="12" rx="3"/>
                  </svg>
                </button>
                <button className="prompt-action" aria-label="send" onClick={handleBottomSend}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13"/>
                    <path d="M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Processing


