import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

function PromptChat() {
  const location = useLocation() as { state?: { message?: string } }
  const initialMsg = location.state?.message ?? ''
  type ChatItem = { id: number; role: 'user' | 'ai'; text?: string; buttonLabel?: string }
  const [messages, setMessages] = useState<ChatItem[]>(() => (
    initialMsg ? [{ id: 1, role: 'user', text: initialMsg }] : []
  ))
  const [bottomText, setBottomText] = useState('')
  const [isReportOpen, setIsReportOpen] = useState(false)
  const [reportUrl] = useState('/창업캠프_ai학습리포트.pdf')
  const [isMsgModalOpen, setIsMsgModalOpen] = useState(false)
  const [pendingReportButton, setPendingReportButton] = useState(false)
  const [pendingReportAsk, setPendingReportAsk] = useState(false)
  const [requireUpgradeNext, setRequireUpgradeNext] = useState(false)
  const [isPricingOpen, setIsPricingOpen] = useState(false)
  const [personalized, setPersonalized] = useState<Array<{ name: string; text: string }>>([
    { name: '김혜윤', text: '안녕하세요, 혜윤 학생이 이용 중인 독서실 담당자입니다.\n[기말고사 기간 운영 안내]\n6월 26일(목)~7월 4일(금)까지 독서실은 오후 1시에 오픈합니다. 혹시 혜윤 학생이 더 일찍 와서 공부하길 원하시면 미리 말씀해 주시면 최대한 빠르게 오픈하겠습니다.\n혜윤 학생이 최근 수학 과목에 특히 집중하면서 꾸준히 학습하는 모습이 인상적입니다. 기말고사에서도 좋은 성과를 낼 수 있도록 끝까지 잘 지도하겠습니다.' },
    { name: '김영훈', text: '안녕하세요, 영훈 학생이 이용 중인 독서실 담당자입니다.\n[기말고사 기간 운영 안내]\n6월 26일(목)~7월 4일(금)까지 독서실은 오후 1시에 오픈합니다. 혹시 영훈 학생이 더 일찍 와서 공부하길 원하시면 미리 알려주시면 최대한 맞춰드리겠습니다.\n지난 중간고사에서 영어 성적이 크게 향상된 점이 특히 눈에 띄었습니다. 이번에도 꾸준한 학습 습관으로 더 좋은 결과를 기대할 수 있을 것 같습니다.' },
    { name: '윤서진', text: '안녕하세요, 서진 학생이 이용 중인 독서실 담당자입니다.\n[기말고사 기간 운영 안내]\n6월 26일(목)~7월 4일(금)까지 독서실은 오후 1시에 오픈합니다. 혹시 서진 학생이 더 일찍 와서 공부하길 원하시면 미리 알려주시면 빠르게 준비하겠습니다.\n요즘 서진 학생이 과학 과목에 집중하며 꼼꼼히 준비하는 모습이 돋보입니다. 이번 기말고사에서도 좋은 결실을 맺을 수 있도록 옆에서 잘 챙기겠습니다' },
  ])

  const handleBottomSend = () => {
    const trimmed = bottomText.trim()
    if (!trimmed) return
    // append user message
    setMessages((prev) => [...prev, { id: prev.length + 1, role: 'user', text: trimmed }])
    if (requireUpgradeNext) {
      setRequireUpgradeNext(false)
      // Delay 1.5s before showing the gating message
      window.setTimeout(() => {
        setMessages((prev) => ([...prev, { id: prev.length + 1, role: 'ai', text: '해당 기능은 유료 유저만 사용 가능해요.' }]))
        // After additional 2s, open pricing modal and reveal deferred button
        window.setTimeout(() => {
          setIsPricingOpen(true)
          if (pendingReportButton) {
            setPendingReportButton(false)
            setMessages((p) => ([...p, { id: p.length + 1, role: 'ai', buttonLabel: '학습 리포트 템플릿 미리 보기' }]))
          }
        }, 2000)
      }, 1500)
      setBottomText('')
      return
    }
    // show sending status, then completion
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: prev.length + 1, role: 'ai', text: '리포트 전송 중...' }])
      window.setTimeout(() => {
        setMessages((prev2) => [...prev2, { id: prev2.length + 1, role: 'ai', text: '리포트 전송을 완료했어요.' }])
      }, 2000)
    }, 200)
    // Reveal any remaining deferred report messages
    if (pendingReportButton || pendingReportAsk) {
      const additions: Array<{ role: 'ai'; text?: string; buttonLabel?: string }> = []
      if (pendingReportButton) additions.push({ role: 'ai', buttonLabel: '생성된 리포트 보기' })
      if (pendingReportAsk) additions.push({ role: 'ai', text: '리포트 생성을 완료했어요. 해당 리포트를 학생 부모님께 전송할까요?' })
      setPendingReportButton(false)
      setPendingReportAsk(false)
      setMessages((prev) => additions.reduce((acc, item) => ([...acc, { id: acc.length + 1, role: 'ai', text: item.text, buttonLabel: item.buttonLabel }]), prev))
    }
    setBottomText('')
  }

  useEffect(() => {
    const ai1IdRef = { current: null as null | number }
    const ai2IdRef = { current: null as null | number }
    const tableSearchIdRef = { current: null as null | number }
    const timers: number[] = []
    const intervals: number[] = []

    // t=3s: add step 1 message
    timers.push(window.setTimeout(() => {
      setMessages((prev) => {
        const id = prev.length + 1
        ai1IdRef.current = id
        return [...prev, { id, role: 'ai', text: '내 데이터베이스 검색 중...' }]
      })
    }, 3000))

    // t=6s: mark step 1 done and add step 2 message
    timers.push(window.setTimeout(() => {
      let newId: number | null = null
      setMessages((prev) => {
        const updated = prev.map((m) => (
          m.id === ai1IdRef.current ? { ...m, text: '검색 완료' } : m
        ))
        newId = updated.length + 1
        ai2IdRef.current = newId
        return [...updated, { id: newId!, role: 'ai', text: '' }]
      })
      const target = '현재 3명의 고객이 확인되었어요.- "김혜윤", "김영훈", "윤서진"'
      let i = 0
      const intervalId = window.setInterval(() => {
        i += 1
        setMessages((p) => p.map((m) => (m.id === newId ? { ...m, text: target.slice(0, i) } : m)))
        if (i >= target.length) {
          clearInterval(intervalId)
        }
      }, 35)
      intervals.push(intervalId)
    }, 8000))


    // t=12s: contact + call log lookup notice
    timers.push(window.setTimeout(() => {
      setMessages((prev) => ([...prev, { id: prev.length + 1, role: 'ai', text: '해당 고객의 연락처와 상담 내용을 찾아볼게요.' }]))
    }, 12000))

    // t=14s: table search in progress
    timers.push(window.setTimeout(() => {
      setMessages((prev) => {
        const id = prev.length + 1
        tableSearchIdRef.current = id
        return [...prev, { id, role: 'ai', text: '고객 별 상담 내역이 담긴 테이블 검색 중 ...' }]
      })
    }, 14000))

    // t=17s: mark search done
    timers.push(window.setTimeout(() => {
      setMessages((prev) => prev.map((m) => (
        m.id === tableSearchIdRef.current ? { ...m, text: '검색 완료' } : m
      )))
    }, 17000))

    // t=19s: personalized message generation
    timers.push(window.setTimeout(() => {
      setMessages((prev) => ([...prev, { id: prev.length + 1, role: 'ai', text: '각 고객 별 맞춤화된 메시지 생성 중...' }]))
    }, 19000))

    // t=22s: mark personalized messages done and add "메시지 보기" button
    timers.push(window.setTimeout(() => {
      // change last message text to 생성 완료
      setMessages((prev) => {
        const lastId = prev[prev.length - 1]?.id
        const updated = prev.map((m) => (m.id === lastId && m.role === 'ai' && m.text?.includes('맞춤화된 메시지 생성 중') ? { ...m, text: '생성 완료' } : m))
        return [
          ...updated,
          { id: updated.length + 1, role: 'ai', buttonLabel: '메시지 보기' },
        ]
      })
    }, 22000))

    // Defer report-related messages until next user input
    timers.push(window.setTimeout(() => {
      setPendingReportButton(true)
      setPendingReportAsk(true)
    }, 24000))

    return () => { timers.forEach((t) => clearTimeout(t)); intervals.forEach((i) => clearInterval(i)) }
  }, [])

  return (
    <div className="gs-layout" style={{ gridTemplateColumns: '1fr' }}>
      <section className="gs-content">
        <header className="gs-header">
          <h2>대화</h2>
          <div className="gs-tools"><Link className="gs-nav__item" to="/prompt">← 프롬프트로</Link></div>
        </header>

        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: '1 1 auto', minHeight: 0, overflow: 'auto', paddingBottom: '96px' }}>
          {messages.map((m) => (
            <div key={m.id} className="fade-in-up" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              {m.role === 'ai' && (<div aria-hidden="true" style={{ width: '28px', height: '28px', display: 'grid', placeItems: 'center' }}>🤖</div>)}
              <div style={{
                background: m.role === 'user' ? '#0f172a' : '#ffffff',
                color: m.role === 'user' ? '#ffffff' : '#0f172a',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                maxWidth: '80%'
              }}>
                {m.buttonLabel ? (
                  <button
                    className="btn btn--primary"
                    style={{ padding: '0.5rem 0.9rem' }}
                    onClick={() => {
                      if (m.buttonLabel === '메시지 보기') setIsMsgModalOpen(true)
                      else setIsReportOpen(true)
                    }}
                  >
                    {m.buttonLabel}
                  </button>
                ) : (
                  <div style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                    <p style={{ margin: 0 }}>{m.text}</p>
                    {m.text === '메시지 전송 중' && (
                      <div className="load-track"><div className="load-bar"></div></div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {isReportOpen && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'grid', placeItems: 'center', zIndex: 60 }}>
            <div style={{ width: '760px', maxWidth: 'calc(100% - 2rem)', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', borderBottom: '1px solid #e5e7eb' }}>
                <strong>생성된 리포트</strong>
                <button className="prompt-action" onClick={() => setIsReportOpen(false)} aria-label="close">✕</button>
              </div>
              <div style={{ height: '520px' }}>
                <iframe title="report" src={reportUrl} style={{ width: '100%', height: '100%', border: 'none' }} />
              </div>
            </div>
          </div>
        )}

        {isMsgModalOpen && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'grid', placeItems: 'center', zIndex: 60 }}>
            <div style={{ width: '760px', maxWidth: 'calc(100% - 2rem)', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', borderBottom: '1px solid #e5e7eb' }}>
                <strong>개별 메시지 확인/수정</strong>
                <button className="prompt-action" onClick={() => setIsMsgModalOpen(false)} aria-label="close">✕</button>
              </div>
              <div style={{ padding: '1rem', display: 'grid', gap: '0.75rem' }}>
                {personalized.map((p, idx) => (
                  <div key={idx} style={{ display: 'grid', gap: '0.5rem' }}>
                    <div style={{ fontWeight: 600 }}>{p.name}</div>
                    <textarea
                      value={p.text}
                      onChange={(e) => setPersonalized((prev) => prev.map((x, i) => i === idx ? { ...x, text: e.target.value } : x))}
                      style={{ width: '100%', minHeight: '88px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '0.5rem' }}
                    />
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                  <button className="btn btn--secondary" onClick={() => setIsMsgModalOpen(false)}>닫기</button>
                  <button className="btn btn--primary" onClick={() => {
                    setIsMsgModalOpen(false)
                    // Add sending message bubble
                    setMessages((prev) => ([...prev, { id: prev.length + 1, role: 'ai', text: '메시지 전송 중' }]))
                    
                    // After 3s, replace with success and require upgrade for next user message
                    window.setTimeout(() => {
                      setMessages((prev) => {
                        const lastIndex = prev.length - 1
                        const updated = [...prev]
                        if (lastIndex >= 0) {
                          updated[lastIndex] = { ...updated[lastIndex], text: '성공적으로 3개의 메시지 전송이 완료되었어요.' }
                        }
                        return updated
                      })
                      setRequireUpgradeNext(true)
                    }, 3000)
                  }}>보내기</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isPricingOpen && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'grid', placeItems: 'center', zIndex: 80 }}>
            <div style={{ width: '900px', maxWidth: 'calc(100% - 2rem)', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.35)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', borderBottom: '1px solid #334155' }}>
                <strong>요금제 안내</strong>
                <button className="prompt-action" onClick={() => setIsPricingOpen(false)} aria-label="close">✕</button>
              </div>
              <div style={{ padding: '1rem 1rem 1.25rem', background: '#0b1220' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1rem' }}>
                  <div style={{ background: 'linear-gradient(180deg, #3b82f6 0%, #a78bfa 100%)', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 10px 24px rgba(59,130,246,0.25)' }}>
                    <div style={{ fontWeight: 800, opacity: 0.95 }}>BASIC PLAN</div>
                    <div style={{ fontSize: '1.75rem', marginTop: '0.5rem' }}>30,000₩ <span style={{ fontSize: '0.95rem' }}>/ month</span></div>
                    <ul style={{ margin: '1rem 0 0', padding: 0, listStyle: 'none', lineHeight: 1.9 }}>
                      <li>• CRM 툴 제공</li>
                      <li>• 리포트 생성 기능</li>
                      <li>• 자동화& 기능</li>
                    </ul>
                    <div style={{ marginTop: '1rem' }}>
                      <button className="btn btn--secondary">결제</button>
                    </div>
                  </div>
                  <div style={{ background: 'linear-gradient(180deg, #1d4ed8 0%, #a855f7 100%)', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 10px 24px rgba(99,102,241,0.25)' }}>
                    <div style={{ fontWeight: 800, opacity: 0.95 }}>STANDARD PLAN</div>
                    <div style={{ fontSize: '1.75rem', marginTop: '0.5rem' }}>70,000₩ <span style={{ fontSize: '0.95rem' }}>/ month</span></div>
                    <ul style={{ margin: '1rem 0 0', padding: 0, listStyle: 'none', lineHeight: 1.9 }}>
                      <li>• CRM 툴 제공</li>
                      <li>• 리포트 생성 기능</li>
                      <li>• 자동화& 기능</li>
                      <li>• + 추가 크레딧</li>
                    </ul>
                    <div style={{ marginTop: '1rem' }}>
                      <button className="btn btn--secondary">결제</button>
                    </div>
                  </div>
                  <div style={{ background: 'linear-gradient(180deg, #7c2d12 0%, #ea580c 100%)', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 10px 24px rgba(234,88,12,0.25)' }}>
                    <div style={{ fontWeight: 800, opacity: 0.95 }}>PREMIUM PLAN</div>
                    <div style={{ fontSize: '1.75rem', marginTop: '0.5rem' }}>200,000₩ <span style={{ fontSize: '0.95rem' }}>/ month</span></div>
                    <ul style={{ margin: '1rem 0 0', padding: 0, listStyle: 'none', lineHeight: 1.9 }}>
                      <li>• CRM 툴 제공</li>
                      <li>• 리포트 생성 기능</li>
                      <li>• 자동화& 기능</li>
                      <li>• +추가 크레딧</li>
                      <li>• +제3자 열람 권한</li>
                    </ul>
                    <div style={{ marginTop: '1rem' }}>
                      <button className="btn btn--secondary">결제</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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

export default PromptChat


