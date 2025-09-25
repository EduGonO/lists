import { useCallback, useEffect, useRef, useState } from 'react';
import type { EditorFromTextArea } from 'codemirror';

interface EditorStats {
  line: number;
  column: number;
  characters: number;
  words: number;
  lines: number;
}

const defaultNote = `- # Daily Journal\n- **Tasks**\n  - [ ] Capture today's learnings\n  - [ ] Publish the sandbox to Vercel\n- **Ideas**\n  - Embed a backlinks graph\n  - Schedule spaced repetition\n\n> Tip: Type / to open the command palette or [[ to link to another page.`;

function summarise(content: string): Omit<EditorStats, 'line' | 'column'> {
  const normalized = content.replace(/\r/g, '');
  const trimmed = normalized.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const characters = trimmed.length;
  const lines = normalized ? normalized.split('\n').length : 0;

  return { characters, words, lines };
}

export function EditorPreview() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const editorRef = useRef<EditorFromTextArea | null>(null);
  const [stats, setStats] = useState<EditorStats>({
    line: 1,
    column: 1,
    characters: 0,
    words: 0,
    lines: 0,
  });
  const [isReady, setIsReady] = useState(false);

  const syncStats = useCallback((instance: EditorFromTextArea) => {
    const cursor = instance.getCursor();
    const { characters, words, lines } = summarise(instance.getValue());
    setStats({
      line: cursor.line + 1,
      column: cursor.ch + 1,
      characters,
      words,
      lines,
    });
  }, []);

  const initialise = useCallback(async () => {
    if (!textareaRef.current || editorRef.current) {
      return;
    }

    const module = await import('codemirror');
    const CodeMirror = (module as unknown as typeof import('codemirror')).default ?? module;

    await Promise.all([
      import('codemirror/mode/markdown/markdown'),
      import('codemirror/addon/edit/closebrackets'),
      import('codemirror/addon/edit/matchbrackets'),
      import('codemirror/addon/selection/active-line'),
    ]);

    const instance = CodeMirror.fromTextArea(textareaRef.current, {
      mode: 'markdown',
      theme: 'material-darker',
      lineNumbers: true,
      lineWrapping: true,
      styleActiveLine: true,
      autoCloseBrackets: true,
      viewportMargin: Infinity,
    });

    editorRef.current = instance;
    instance.setValue(`${defaultNote}\n`);
    instance.setCursor({ line: 0, ch: 0 });
    instance.focus();
    syncStats(instance);

    instance.on('cursorActivity', syncStats);
    instance.on('change', syncStats);
    setIsReady(true);
  }, [syncStats]);

  useEffect(() => {
    initialise();

    return () => {
      const instance = editorRef.current;
      if (instance) {
        instance.off('cursorActivity', syncStats);
        instance.off('change', syncStats);
        instance.toTextArea();
        editorRef.current = null;
      }
    };
  }, [initialise, syncStats]);

  const handleReset = () => {
    const instance = editorRef.current;
    if (!instance) {
      return;
    }

    instance.setValue(`${defaultNote}\n`);
    instance.setCursor({ line: 0, ch: 0 });
    instance.focus();
    syncStats(instance);
  };

  return (
    <section className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl shadow-brand-900/20 sm:p-8">
      <header className="grid gap-2">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-brand-200">
          Logseq editor
        </span>
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Try the Markdown-first workspace</h2>
        <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
          This preview isolates the CodeMirror experience we ship inside the desktop and mobile apps.
          Explore the editing surface, markdown shortcuts, and live formatting all within your browser.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
            disabled={!isReady}
          >
            Reset example note
          </button>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-xs font-medium text-slate-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" aria-hidden />
            {isReady ? 'Interactive sandbox ready' : 'Loading editor...'}
          </span>
        </div>
      </header>
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-950/60">
        <textarea ref={textareaRef} className="hidden" aria-hidden defaultValue={defaultNote} />
      </div>
      <dl className="grid gap-3 rounded-2xl border border-white/5 bg-slate-950/40 p-4 text-sm sm:grid-cols-5 sm:text-base">
        <div className="flex flex-col">
          <dt className="text-xs uppercase tracking-[0.2em] text-slate-400">Cursor</dt>
          <dd className="font-semibold text-white">
            Line {stats.line.toLocaleString()}, Col {stats.column.toLocaleString()}
          </dd>
        </div>
        <div className="flex flex-col">
          <dt className="text-xs uppercase tracking-[0.2em] text-slate-400">Characters</dt>
          <dd className="font-semibold text-white">{stats.characters.toLocaleString()}</dd>
        </div>
        <div className="flex flex-col">
          <dt className="text-xs uppercase tracking-[0.2em] text-slate-400">Words</dt>
          <dd className="font-semibold text-white">{stats.words.toLocaleString()}</dd>
        </div>
        <div className="flex flex-col">
          <dt className="text-xs uppercase tracking-[0.2em] text-slate-400">Lines</dt>
          <dd className="font-semibold text-white">{stats.lines.toLocaleString()}</dd>
        </div>
        <div className="flex flex-col">
          <dt className="text-xs uppercase tracking-[0.2em] text-slate-400">Mode</dt>
          <dd className="font-semibold text-white">Markdown + shortcuts</dd>
        </div>
      </dl>
      <div className="grid gap-2 rounded-2xl border border-white/5 bg-slate-950/40 p-5 text-sm text-slate-300">
        <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-200">Quick tips</h3>
        <ul className="grid gap-2 text-sm leading-relaxed sm:grid-cols-2">
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-xs font-semibold text-brand-200">
              /
            </span>
            Open the command palette to insert blocks, todos, and templates.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-xs font-semibold text-brand-200">
              [[
            </span>
            Link to any page in your graph and build a knowledge web.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-xs font-semibold text-brand-200">
              {'<>'}
            </span>
            Use markdown formatting and slash commands for tables, embeds, and code fences.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-xs font-semibold text-brand-200">
              ⌘
            </span>
            Keyboard shortcuts mirror the desktop app so muscle memory carries over.
          </li>
        </ul>
      </div>
    </section>
  );
}
