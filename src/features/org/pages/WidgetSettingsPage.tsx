import { Code2, Copy, Check, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../auth/hooks/useAuthStore";

export default function WidgetSettingsPage() {
  const org = useAuthStore((s) => s.org);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  if (!org) return null;

  const widgetKey = org.widgetApiKey;
  const embedCode = `<script\n  src="${window.location.origin}/widget-loader.js"\n  data-api-key="${widgetKey}"\n></script>`;

  const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Chat Widget</h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Connect SupportHub to your website</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Public Widget Key */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center border border-gray-100 shadow-inner">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900 tracking-tight leading-tight">API Key</h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Public identifier for your widget</p>
              </div>
            </div>
            
            <button 
              onClick={() => copyToClipboard(widgetKey, setCopiedKey)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              {copiedKey ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedKey ? "Copied" : "Copy Key"}
            </button>
          </div>

          <div className="relative group">
            <code className="block w-full bg-gray-50 text-gray-700 font-mono text-xs px-5 py-4 rounded-xl border border-gray-100 break-all leading-relaxed shadow-inner">
              {widgetKey}
            </code>
          </div>
        </div>

        {/* Embed Code Section */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 transition-all hover:shadow-md overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-[60px] pointer-events-none -mr-16 -mt-16 opacity-40" />
          
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900 tracking-tight leading-tight">Installation Script</h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Add this script to your website's &lt;head&gt; or &lt;body&gt;</p>
              </div>
            </div>
            
            <button 
              onClick={() => copyToClipboard(embedCode, setCopiedScript)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedScript ? "Copied" : "Copy Script"}
            </button>
          </div>

          <div className="relative z-10">
            <pre className="bg-slate-900 text-emerald-400 font-mono text-xs p-6 rounded-2xl overflow-x-auto shadow-2xl border border-slate-800 leading-relaxed custom-scrollbar">
              {embedCode}
            </pre>
            <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">💡</div>
              <p className="text-xs font-medium text-blue-700 leading-relaxed">
                Paste this script onto your website to enable the customer support chat widget. Make sure it's placed on all pages where you want the widget to appear.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}