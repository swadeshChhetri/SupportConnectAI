import { useEffect, useState } from "react";
// import {
//   fetchEscalationRules,
// updateEscalationRules,
//   type EscalationRules,
// } from "../../api/aiSettingsApi";
// fetchEscalationRules

import Switch from './../../../shared/components/ui/Switch';
import {
  fetchEscalationRules, updateEscalationRules,
  type EscalationRules
} from "../aiSettingsApi";

export default function EscalationRulesPage() {
  const [rules, setRules] = useState<EscalationRules | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await fetchEscalationRules();
    setRules(data);
  }

  async function handleSave() {
    if (!rules) return;
    setSaving(true);
    await updateEscalationRules(rules);
    setSaving(false);
  }

  if (!rules) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Escalation Rules</h1>

      <div className="bg-white p-6 shadow rounded-lg space-y-6">
        {/* Rules */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Low AI Confidence</span>
            <Switch
              checked={rules.lowConfidence}
              onChange={(v) => setRules({ ...rules, lowConfidence: v })}
            />
          </div>

          <div className="flex justify-between items-center">
            <span>Angry Sentiment</span>
            <Switch
              checked={rules.angrySentiment}
              onChange={(v) => setRules({ ...rules, angrySentiment: v })}
            />
          </div>

          <div className="flex justify-between items-center">
            <span>Long Messages</span>
            <Switch
              checked={rules.longMessages}
              onChange={(v) => setRules({ ...rules, longMessages: v })}
            />
          </div>
        </div>

        {/* Keyword Escalation */}
        <div>
          <label className="font-medium">Escalate on Keywords</label>

          <textarea
            className="w-full border rounded p-3 mt-2 text-sm"
            rows={3}
            value={rules.keywordEscalation.join(", ")}
            onChange={(e) =>
              setRules({
                ...rules,
                keywordEscalation: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
          />
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {saving ? "Saving..." : "Save Rules"}
        </button>
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow text-sm text-gray-700">
        <h2 className="font-medium mb-2">Current Config (Debug)</h2>
        <pre className="bg-gray-100 p-3 rounded text-xs">
          {JSON.stringify(rules, null, 2)}
        </pre>
      </div>
    </div>
  );
}
