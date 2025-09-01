import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

function GetStarted() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [isProcessing] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleClickUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const urls = Array.from(files).map((file) => URL.createObjectURL(file))
    setImagePreviews((prev) => [...prev, ...urls])
    // reset to allow re-selecting the same file
    e.target.value = ''
  }

  const handleSaveToDb = () => {
    navigate('/processing', { state: { imageCount: imagePreviews.length } })
  }

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [imagePreviews])

  return (
    <div className="gs-layout">
      <aside className="gs-sidebar">
        <div className="gs-logo"><img src="/logo.png" alt="NoteFit" style={{ height: '70px' }} /></div>
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
          <Link className="gs-nav__item" to="/prompt">🧩 프롬프트</Link>
        </nav>
      </aside>

      <section className="gs-content">
        <header className="gs-header">
          <h2>자료 업로드</h2>
          <div className="gs-tools">
            <button className="btn btn--secondary">사진 촬영</button>
            <button className="btn btn--primary" onClick={handleClickUpload}>파일 업로드</button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFilesSelected}
              style={{ display: 'none' }}
            />
          </div>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto', minHeight: 0 }}>
          {isProcessing && (
            <div style={{
              marginTop: '1rem',
              background: '#f3f4f6',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '0.75rem 0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div aria-hidden="true" style={{ width: '28px', height: '28px', display: 'grid', placeItems: 'center' }}>🤖</div>
                <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '0.75rem 1rem' }}>
                  <div className="spinner"><div className="ring"></div><span>이미지 인식 중...</span></div>
                </div>
              </div>
            </div>
          )}

          {imagePreviews.length > 0 && (
            <div
              className="upload-preview"
              style={{
                marginTop: '1rem',
                flex: '1 1 auto',
                minHeight: 0,
                overflow: 'auto',
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '0.75rem',
                alignContent: 'start'
              }}
            >
              {imagePreviews.map((src, index) => (
                <div key={index} style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}>
                  <img
                    src={src}
                    alt={`uploaded-${index}`}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        

        <div className="gs-actions">
          <div className="gs-actions__left">
            <button className="btn btn--secondary">✈ 공유하기</button>
            <button className="btn btn--primary large" onClick={handleSaveToDb}>DB 저장하기</button>
          </div>
          <div className="gs-actions__right"></div>
        </div>
      </section>
    </div>
  )
}

export default GetStarted


