import { useState } from "react";
import { searchDocuments, ragQuery } from "../../kb/api/kbApi";

import { Loader2, Search } from "lucide-react";

export default function SearchKnowledgePage() {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [ragAnswer, setRagAnswer] = useState<string | null>(null);
  const [loadingRag, setLoadingRag] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setSearching(true);
    setRagAnswer(null);

    try {
      const res = await searchDocuments(query);
      setResults(res);
    } catch {
      setResults([]);
    }

    setSearching(false);
  };

  const handleAskAI = async () => {
    if (!query.trim()) return;

    setLoadingRag(true);

    try {
      const res = await ragQuery(query);
      setRagAnswer(res.answer);
    } catch {
      setRagAnswer("Error fetching RAG answer.");
    }

    setLoadingRag(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Knowledge Search</h1>

      <div className="bg-white p-4 rounded shadow space-y-4">
        {/* Search bar */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documents or ask a question…"
              className="pl-8 pr-4 py-2 border rounded w-full"
            />
          </div>

          <button
            onClick={handleSearch}
            disabled={searching}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            {searching ? "Searching…" : "Search"}
          </button>

          <button
            onClick={handleAskAI}
            disabled={loadingRag}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loadingRag ? "Thinking…" : "Ask AI"}
          </button>
        </div>

        {/* Semantic search results */}
        {results.length > 0 && (
          <div>
            <h2 className="text-lg font-medium mt-4 mb-2">Top Results</h2>
            <div className="space-y-3">
              {results.map((r, i) => (
                <div
                  key={i}
                  className="p-3 border rounded bg-gray-50"
                >
                  <div className="font-semibold">{r.metadata.title}</div>
                  <div className="text-sm text-gray-700 mt-1">{r.snippet}</div>
                  <div className="mt-1 text-xs text-gray-500">
                    Score: {r.score.toFixed(3)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RAG Answer */}
        {ragAnswer && (
          <div className="mt-6 p-4 border rounded bg-blue-50">
            <h3 className="font-semibold mb-2">AI Answer</h3>
            <p className="text-gray-800 whitespace-pre-line">{ragAnswer}</p>
          </div>
        )}

        {(searching || loadingRag) && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
          </div>
        )}
      </div>
    </div>
  );
}
