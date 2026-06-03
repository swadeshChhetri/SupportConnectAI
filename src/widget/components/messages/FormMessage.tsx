import React, { useState } from "react";
import type { FormMessage as FormMessageType, FormField } from "../../types/widget";
import { useTheme } from "../../context/ThemeContext";

export default function FormMessage({ message }: { message: FormMessageType }) {
  const { aiAvatar, primaryColor } = useTheme();
  const isVisitor = message.sender === "user";

  // Build form state dynamically from fields
  const initialState = Object.fromEntries(
    message.fields.map((f) => [f.id, ""])
  );

  const [formData, setFormData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(message.submitTo, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: message.sessionId,
          formId: message.id,
          data: formData,
        }),
      });

      if (!res.ok) throw new Error("Form submit failed");

      setSubmitted(true);

      // Dispatch event for widget analytics / hooks
      window.dispatchEvent(
        new CustomEvent("widget_form_submitted", {
          detail: { formId: message.id, data: formData },
        })
      );
    } catch (err) {
      console.error(err);
      alert("Failed to submit form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function updateField(id: string, value: string) {
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  // Render after submit
  if (submitted) {
    return (
      <div className="flex items-start gap-2 mb-3">
        <div className="max-w-[80%] rounded-2xl px-4 py-3 shadow-sm bg-green-100 text-green-800">
          <div className="text-sm">Thanks! Your information has been submitted.</div>

          <div className="text-[10px] text-gray-500 mt-1 text-right">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    );
  }

  // Render form
  return (
    <div
      className={`flex items-start gap-2 mb-3 ${
        isVisitor ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}
      {!isVisitor && aiAvatar && (
        <img
          src={aiAvatar}
          alt="AI"
          className="w-8 h-8 rounded-full object-cover"
        />
      )}

      <div className="max-w-[80%] rounded-2xl px-4 py-3 shadow-sm bg-gray-100 text-gray-900">
        {message.title && (
          <div className="font-medium text-sm mb-3">{message.title}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          {message.fields.map((field: FormField) => (
            <div key={field.id} className="flex flex-col gap-1 text-sm">
              <label className="font-medium">{field.label}</label>

              {/* Text Input */}
              {["text", "email", "number"].includes(field.type) && (
                <input
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={formData[field.id]}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  className="border rounded-md px-3 py-2 text-sm"
                />
              )}

              {/* Textarea */}
              {field.type === "textarea" && (
                <textarea
                  required={field.required}
                  placeholder={field.placeholder}
                  value={formData[field.id]}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  className="border rounded-md px-3 py-2 text-sm h-20 resize-none"
                />
              )}

              {/* Select */}
              {field.type === "select" && (
                <select
                  required={field.required}
                  value={formData[field.id]}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  className="border rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Select...</option>
                  {field.options?.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}

          {/* Submit button */}
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 px-4 py-2 text-sm rounded-md text-white font-medium"
            style={{ backgroundColor: primaryColor }}
          >
            {submitting
              ? "Submitting..."
              : message.submitLabel ?? "Submit"}
          </button>
        </form>

        {/* Timestamp */}
        <div className="text-[10px] text-gray-500 mt-2 text-right">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
