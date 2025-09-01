import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GetStarted from './pages/GetStarted.tsx'
import PromptPage from './pages/Prompt.tsx'
import Processing from './pages/Processing.tsx'
import PromptChat from './pages/PromptChat.tsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/get-started', element: <GetStarted /> },
  { path: '/processing', element: <Processing /> },
  { path: '/prompt', element: <PromptPage /> },
  { path: '/prompt-chat', element: <PromptChat /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
