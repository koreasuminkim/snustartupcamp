import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GettingStarted from './pages/GettingStarted.tsx'
import UploadPage from './pages/Upload.tsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/getting-started', element: <GettingStarted /> },
  { path: '/upload', element: <UploadPage /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
