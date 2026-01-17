import React from 'react';
import { useTTSStore } from '../store/ttsStore';

export const TextInputSection: React.FC = () => {
  const { inputText, charCount, setInputText } = useTTSStore();
  const maxChars = 5000;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div className="w-full bg-[var(--bg-white)] border border-[var(--border-slate)] rounded-[var(--radius-md)] p-[var(--space-md)] shadow-sm">
      <div className="flex justify-between items-center mb-[var(--space-sm)]">
        <label className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">
          Input Text
        </label>
        <span className={`text-[var(--text-xs)] ${charCount > maxChars ? 'text-[var(--danger)]' : 'text-[var(--text-muted)]'}`}>
           <span className="bg-[var(--sidebar-active-bg)] text-[var(--primary)] px-2 py-0.5 rounded-full font-medium">
             {charCount} / {maxChars}
           </span>
        </span>
      </div>
      
      <textarea
        value={inputText}
        onChange={handleChange}
        placeholder="Type or paste your script here..."
        className="w-full h-64 resize-none bg-transparent text-[var(--text-base)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
      />
      
      {charCount > maxChars && (
        <p className="text-[var(--danger)] text-[var(--text-xs)] mt-2">
          Character limit exceeded by {charCount - maxChars} characters.
        </p>
      )}
    </div>
  );
};
