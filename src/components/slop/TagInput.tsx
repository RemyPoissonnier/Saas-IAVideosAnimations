import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, AlertCircle } from "lucide-react";
import { useI18n } from "../../i18n";

interface TagInputProps {
  label: string;
  placeholder: string;
  items: string[];
  onAdd: (val: string) => void;
  onRemove: (idx: number) => void;
}

export const TagInput = ({
  label,
  placeholder,
  items,
  onAdd,
  onRemove,
}: TagInputProps) => {
  const [input, setInput] = useState("");
  const { t } = useI18n();
  const isLimitReached = items.length >= 15;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input.trim() && !isLimitReached) {
        onAdd(input.trim());
        setInput("");
      }
    }
  };

  const handleAdd = () => {
    if (input.trim() && !isLimitReached) {
      onAdd(input.trim());
      setInput("");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-bold uppercase tracking-wider opacity-70">
          {label}
        </label>
        <span className={`text-[10px] font-mono ${isLimitReached ? "text-red-500 font-bold" : "opacity-40"}`}>
          {items.length} / 15
        </span>
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLimitReached}
          placeholder={isLimitReached ? t("prompt.slop.limitReached") : placeholder}
          className={`flex-1 bg-surface-2/50 border rounded-xl px-4 py-2 text-sm outline-none transition-colors ${
            isLimitReached ? "border-red-500/20 cursor-not-allowed opacity-50" : "border-border/20 focus:border-accent"
          }`}
        />
        <button
          onClick={handleAdd}
          disabled={isLimitReached || !input.trim()}
          className="bg-surface-2 hover:bg-surface-3 text-accent rounded-xl px-3 border border-border/20 transition-colors disabled:opacity-30"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      
      {isLimitReached && (
        <div className="flex items-center gap-1 text-[10px] text-red-500 font-medium">
          <AlertCircle className="w-3 h-3" />
          {t("prompt.slop.limitReached")}
        </div>
      )}

      <div className="flex flex-wrap gap-2 min-h-[32px]">
        <AnimatePresence>
          {items.map((item, idx) => (
            <motion.div
              key={`${item}-${idx}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-accent/10 text-accent-strong border border-accent/20 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2"
            >
              {item}
              <button
                onClick={() => onRemove(idx)}
                className="hover:text-red-500 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        {items.length === 0 && (
          <span className="text-xs text-muted/50 italic py-1">
            No items added yet...
          </span>
        )}
      </div>
    </div>
  );
};
