import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Layout } from '../components/Layout';

const EditorPreview = dynamic(async () => {
  const mod = await import('../components/EditorPreview');
  return { default: mod.EditorPreview };
}, { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Logseq Editor Preview</title>
        <meta
          name="description"
          content="A lightweight Logseq editor sandbox built for Vercel deployments."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <div className="mb-10 grid gap-6 sm:mb-16 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:items-center sm:gap-10">
          <div className="grid gap-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-brand-200">
              Vercel ready
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Experience Logseq’s editor instantly in the browser
            </h1>
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
              Deploy this repository to Vercel and the root route serves a dedicated Next.js sandbox
              that mirrors the core editor. Nothing else is bundled—just the lean CodeMirror workspace,
              Tailwind UI polish, and helpful guidance to explore blocks, shortcuts, and daily notes.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://logseq.com"
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
              >
                Learn more about Logseq
              </a>
              <a
                href="https://docs.logseq.com/"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
              >
                Browse the documentation
              </a>
            </div>
            <dl className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-[0.35em] text-brand-200">Built for sharing</dt>
                <dd className="leading-relaxed">
                  Automatic deployments on Vercel use this page so you can verify the editing experience without
                  compiling the entire desktop app.
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.35em] text-brand-200">Production parity</dt>
                <dd className="leading-relaxed">
                  Powered by the same CodeMirror configuration that backs Logseq, including markdown mode,
                  active line styling, and bracket helpers.
                </dd>
              </div>
            </dl>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-300 shadow-2xl shadow-brand-900/30">
            <h2 className="text-lg font-semibold text-white">How to test in Vercel</h2>
            <ol className="mt-4 grid gap-3 list-decimal pl-5">
              <li>Fork the repository and connect it to a new Vercel project.</li>
              <li>Deploy the default branch—no extra configuration required.</li>
              <li>
                Open the deployment URL; the editor preview loads at the root path and mirrors
                desktop shortcuts.
              </li>
              <li>
                Share the link with teammates or QA for quick feedback on editor changes.
              </li>
            </ol>
            <p className="mt-4 text-xs text-slate-400">
              Tip: use <span className="font-semibold text-brand-200">⌘</span>/<span className="font-semibold text-brand-200">Ctrl</span>
              + <span className="font-semibold text-brand-200">P</span> inside the editor to jump to blocks and pages.
            </p>
          </div>
        </div>
        <EditorPreview />
      </Layout>
    </>
  );
}
