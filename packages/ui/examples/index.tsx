import './index.css'
import { setupGlobals } from '../src/ui'
import * as React from 'react'
import { createRoot } from 'react-dom/client'

type View = 'home' | 'editor'

type Feature = {
  title: string
  description: string
}

type DemoButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

setupGlobals()

const features: Feature[] = [
  {
    title: 'Powerful knowledge graph',
    description:
      'Link your ideas bidirectionally, surface backlinks instantly, and keep every concept connected across your graph.',
  },
  {
    title: 'Offline-first by design',
    description:
      'Your notes live on your device. Sync to the cloud only when you choose to and keep ownership of your knowledge.',
  },
  {
    title: 'Custom workflows',
    description:
      'Capture tasks, track meetings, and publish public pages with extensible plugins and a thriving community.',
  },
]

const DEFAULT_NOTE = `# Daily journal\n\n- [ ] Capture three highlights from today\n- [ ] Plan tomorrow's priorities\n- 💡 Draft a new plugin idea for sharing pages\n\n> Tip: Use \`[[Links]]\` and \`#tags\` to connect thoughts as you write.`

const DemoButton = React.forwardRef<HTMLButtonElement, DemoButtonProps>(
  ({ variant = 'primary', className = '', ...props }, ref) => (
    <button
      ref={ref}
      className={`demo-button demo-button--${variant} ${className}`.trim()}
      {...props}
    />
  )
)
DemoButton.displayName = 'DemoButton'

interface HomePageProps {
  onOpenEditor: () => void
}

function HomePage({ onOpenEditor }: HomePageProps) {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <header>
        <h2 id="home-title">Welcome to Logseq</h2>
        <p>
          Craft delightful knowledge bases, share ideas with your team, and keep your notes close — all from the browser
          preview below.
        </p>
        <div className="home-hero__actions">
          <DemoButton onClick={onOpenEditor}>Open the editor demo</DemoButton>
          <a
            className="demo-button demo-button--secondary"
            href="https://logseq.com"
            target="_blank"
            rel="noreferrer"
          >
            Visit logseq.com
          </a>
        </div>
      </header>
      <div className="home-features">
        {features.map((feature) => (
          <article key={feature.title} className="feature-card">
            <h3 className="feature-card__title">{feature.title}</h3>
            <p className="feature-card__description">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function EditorPlayground() {
  const [note, setNote] = React.useState(DEFAULT_NOTE)

  const stats = React.useMemo(() => {
    const trimmed = note.trim()
    const words = trimmed.length > 0 ? trimmed.split(/\s+/).length : 0
    const characters = note.length
    const lines = note.split(/\r?\n/).length

    return { words, characters, lines }
  }, [note])

  return (
    <section className="editor-shell" aria-labelledby="editor-title">
      <header>
        <h2 id="editor-title">Editor playground</h2>
        <p>
          Try the lightweight Markdown editor. Reset the sample content, track your word count, and preview formatted text
          in real time.
        </p>
      </header>
      <div className="editor-grid">
        <div className="editor-panel">
          <h3>Markdown note</h3>
          <textarea
            aria-label="Editor input"
            className="editor-textarea"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
          <div className="home-hero__actions">
            <DemoButton onClick={() => setNote(DEFAULT_NOTE)}>Reset content</DemoButton>
          </div>
        </div>
        <div className="editor-panel">
          <h3>Live preview</h3>
          <div className="editor-preview" aria-live="polite">
            {note.trim().length === 0 ? 'Start typing to see your note preview.' : note}
          </div>
          <footer className="editor-footer">
            <span>
              {stats.lines.toLocaleString()} {stats.lines === 1 ? 'line' : 'lines'}
            </span>
            <span>
              {stats.words.toLocaleString()} {stats.words === 1 ? 'word' : 'words'}
            </span>
            <span>
              {stats.characters.toLocaleString()} {stats.characters === 1 ? 'character' : 'characters'}
            </span>
          </footer>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [view, setView] = React.useState<View>('home')

  return (
    <div className="demo-shell">
      <header className="demo-header">
        <div>
          <p className="demo-header__eyebrow">Logseq components</p>
          <h1 className="demo-header__title">Interface playground</h1>
          <p className="demo-header__subtitle">
            Explore the marketing homepage and the editor preview without leaving this Typescript-powered demo.
          </p>
        </div>
        <div className="demo-tabs" role="tablist" aria-label="Select demo view">
          <button
            type="button"
            role="tab"
            aria-selected={view === 'home'}
            className={`demo-tab ${view === 'home' ? 'is-active' : ''}`.trim()}
            onClick={() => setView('home')}
          >
            Homepage
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'editor'}
            className={`demo-tab ${view === 'editor' ? 'is-active' : ''}`.trim()}
            onClick={() => setView('editor')}
          >
            Editor
          </button>
        </div>
      </header>
      <div className="demo-content">
        {view === 'home' ? <HomePage onOpenEditor={() => setView('editor')} /> : <EditorPlayground />}
      </div>
    </div>
  )
}

const rootElement = document.querySelector('#app')

if (!rootElement) {
  throw new Error('Failed to find the root element for the Logseq UI demo.')
}

createRoot(rootElement as HTMLElement).render(<App />)
