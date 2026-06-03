import { useEffect, useState } from "react";
import {
  fetchAISettings,
  updateAISettings,
  type AISettings,
} from "../aiSettingsApi";
import Switch from './../../../shared/components/ui/Switch';


export default function AISettingsPage() {
  const [settings, setSettings] = useState<AISettings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await fetchAISettings();
    setSettings(data);
  }

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    await updateAISettings(settings);
    setSaving(false);
  }

  if (!settings) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">AI Assistant Settings</h1>

      <div className="bg-white p-6 shadow rounded-lg space-y-6">
        {/* Persona */}
        <div>
          <label className="font-medium">Bot Persona</label>
          <textarea
            className="w-full border rounded p-3 text-sm mt-1"
            rows={4}
            value={settings.persona}
            onChange={(e) =>
              setSettings({ ...settings, persona: e.target.value })
            }
          />
        </div>

        {/* Tone */}
        <div>
          <label className="font-medium">Tone</label>
          <select
            className="w-full border p-2 rounded text-sm mt-1"
            value={settings.tone}
            onChange={(e) =>
              setSettings({ ...settings, tone: e.target.value as any })
            }
          >
            <option value="formal">Formal</option>
            <option value="friendly">Friendly</option>
            <option value="professional">Professional</option>
          </select>
        </div>

        {/* Confidence */}
        <div>
          <label className="font-medium">Confidence Threshold</label>
          <input
            type="range"
            min={0.1}
            max={1}
            step={0.05}
            value={settings.confidenceThreshold}
            onChange={(e) =>
              setSettings({
                ...settings,
                confidenceThreshold: Number(e.target.value),
              })
            }
            className="w-full mt-2"
          />
          <p className="text-sm text-gray-500">
            {Math.round(settings.confidenceThreshold * 100)}% required for AI to
            answer confidently.
          </p>
        </div>

        {/* Capabilities */}
        <div>
          <label className="font-medium block mb-2">Capabilities</label>

          <div className="space-y-3">
            {Object.entries(settings.capabilities).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                <Switch
                  checked={value}
                  onChange={(v) =>
                    setSettings({
                      ...settings,
                      capabilities: { ...settings.capabilities, [key]: v },
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {/* Preview JSON */}
      <div className="mt-6 bg-white p-4 rounded shadow text-sm text-gray-700">
        <h2 className="font-medium mb-2">Current Config (Debug)</h2>
        <pre className="bg-gray-100 p-3 rounded text-xs">
          {JSON.stringify(settings, null, 2)}
        </pre>
      </div>
    </div>
  );
}
