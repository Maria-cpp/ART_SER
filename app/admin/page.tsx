"use client";

import { useEffect, useState, useCallback } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

type Status = { kind: "idle" | "saving" | "ok" | "error"; message?: string };

export default function AdminPage() {
  const { t } = useLanguage();
  const [files, setFiles] = useState<string[]>([]);
  const [active, setActive] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [valid, setValid] = useState(true);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  // Load the list of editable files.
  useEffect(() => {
    fetch("/api/admin")
      .then((r) => r.json())
      .then((d: { files: string[] }) => {
        setFiles(d.files);
        if (d.files.length) setActive(d.files[0]);
      })
      .catch(() => setStatus({ kind: "error", message: "Could not load file list." }));
  }, []);

  // Load the active file's JSON.
  const loadFile = useCallback((file: string) => {
    setStatus({ kind: "idle" });
    fetch(`/api/admin/${file}`)
      .then((r) => r.json())
      .then((d: { data: unknown }) => {
        setText(JSON.stringify(d.data, null, 2));
        setValid(true);
      })
      .catch(() => setStatus({ kind: "error", message: "Could not load file." }));
  }, []);

  useEffect(() => {
    if (active) loadFile(active);
  }, [active, loadFile]);

  function onTextChange(value: string) {
    setText(value);
    try {
      JSON.parse(value);
      setValid(true);
    } catch {
      setValid(false);
    }
  }

  async function save() {
    if (!valid) return;
    setStatus({ kind: "saving" });
    try {
      const res = await fetch(`/api/admin/${active}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: JSON.parse(text) })
      });
      const json = await res.json();
      if (res.ok) setStatus({ kind: "ok", message: "Saved." });
      else setStatus({ kind: "error", message: json.error ?? "Save failed." });
    } catch {
      setStatus({ kind: "error", message: "Save failed." });
    }
  }

  return (
    <div className="container-x py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">{t("admin.title")}</h1>
        <p className="mt-2 text-muted">{t("admin.subtitle")}</p>
      </header>

      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        {/* File list */}
        <aside className="card h-fit p-3">
          <ul className="space-y-1">
            {files.map((f) => (
              <li key={f}>
                <button
                  type="button"
                  onClick={() => setActive(f)}
                  className={`w-full rounded px-3 py-2 text-start text-sm transition ${
                    f === active ? "bg-accent text-accent-foreground" : "hover:bg-surface-alt text-foreground"
                  }`}
                >
                  {f}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* JSON editor */}
        <section className="card">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="font-mono text-sm text-muted">{active}</span>
            <div className="flex items-center gap-3">
              {!valid && <span className="text-sm text-red-500">Invalid JSON</span>}
              {status.kind === "ok" && <span className="text-sm text-green-600">{status.message}</span>}
              {status.kind === "error" && <span className="text-sm text-red-500">{status.message}</span>}
              <button
                type="button"
                onClick={() => loadFile(active)}
                className="btn-outline px-3 py-1.5 text-xs"
              >
                Reload
              </button>
              <button
                type="button"
                onClick={save}
                disabled={!valid || status.kind === "saving"}
                className="btn-accent px-4 py-1.5 text-xs disabled:opacity-50"
              >
                {status.kind === "saving" ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            spellCheck={false}
            dir="ltr"
            className={`h-[60vh] w-full resize-y rounded-md border bg-surface-alt p-4 font-mono text-sm text-foreground outline-none ${
              valid ? "border-border" : "border-red-500"
            }`}
          />
          <p className="mt-3 text-xs text-muted">
            Editing writes directly to <code>/data/{active}</code>. On Vercel the filesystem is read-only —
            see CLAUDE.md §5 for production persistence options.
          </p>
        </section>
      </div>
    </div>
  );
}
