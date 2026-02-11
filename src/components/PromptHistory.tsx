import { useEffect, useState } from "react";
import { useI18n } from "../i18n";
import { apiClient } from "./hooks/apiClient";
import { useAuth } from "../context/AuthContext";
import TextType from "./ui/TextType";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GenerationItem {
  id: string;
  prompt: string;
  createdAt: string;
  videoUrl?: string;
  status: string;
}

interface PromptHistoryProps {
  onSelect: (prompt: string) => void;
  userId: string | undefined;
}

const CACHE_KEY = "whisker_prompt_history";

export function PromptHistory({ onSelect, userId }: PromptHistoryProps) {
  const { t } = useI18n();
  const { getToken } = useAuth();
  const [history, setHistory] = useState<GenerationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<string | null>(null);

  // 1. Charger l'historique
  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        setHistory(JSON.parse(cached));
      } catch (e) {
        console.error("Failed to parse prompt history cache", e);
      }
    }

    if (userId) {
      const fetchGenerations = async () => {
        setLoading(true);
        try {
          const token = await getToken();
          const data = await apiClient<GenerationItem[]>("/generations", "GET", undefined, token);
          if (data && Array.isArray(data)) {
            const uniquePrompts: GenerationItem[] = [];
            const seen = new Set();
            for (const item of data) {
              if (item.prompt && !seen.has(item.prompt)) {
                seen.add(item.prompt);
                uniquePrompts.push(item);
              }
              if (uniquePrompts.length >= 10) break;
            }
            setHistory(uniquePrompts);
            localStorage.setItem(CACHE_KEY, JSON.stringify(uniquePrompts));
          }
        } catch (err) {
          console.warn("Could not fetch generations from API, using cache only.", err);
        } finally {
          setLoading(false);
        }
      };
      fetchGenerations();
    }
  }, [userId, getToken]);

  const getShortPrompt = (p: string) => {
    const words = p.split(/\s+/);
    if (words.length <= 3) return p;
    return words.slice(0, 3).join(" ") + "...";
  };

  const handleCopy = async (prompt: string, id: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setIsCopied(id);
      setTimeout(() => setIsCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  if (history.length === 0 && !loading) return null;

  return (
    <div className="w-full">
      {/* HEADER CLIQUEABLE */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-amber-600 dark:text-amber-400 group transition-colors"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <TextType className="text-[11px] font-bold uppercase tracking-widest group-hover:text-orange-500 transition-colors">
            {t("prompt.history.title")}
          </TextType>
          {history.length > 0 && (
            <span className="bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-full text-[10px]">
              {history.length}
            </span>
          )}
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      
      {/* ZONE EXTENSIBLE */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 py-4">
              {loading && history.length === 0 ? (
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-8 w-24 bg-amber-100 dark:bg-amber-900/20 animate-pulse rounded-full" />
                  ))}
                </div>
              ) : (
                history.map((item) => {
                  const isItemExpanded = expandedItemId === item.id;
                  const itemCopied = isCopied === item.id;

                  return (
                    <motion.button
                      layout
                      key={item.id || item.createdAt}
                      onClick={() => {
                        if (isItemExpanded) {
                          onSelect(item.prompt);
                          handleCopy(item.prompt, item.id);
                        } else {
                          setExpandedItemId(item.id);
                        }
                      }}
                      className={`px-4 py-2 rounded-xl text-[12px] transition-all shadow-sm active:scale-95 border text-left ${
                        isItemExpanded
                          ? "bg-orange-100 border-orange-300 text-orange-900 w-full"
                          : "bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-800/50 text-amber-800 dark:text-amber-200 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <span className={isItemExpanded ? "whitespace-normal leading-relaxed" : "whitespace-nowrap"}>
                          {isItemExpanded ? item.prompt : getShortPrompt(item.prompt)}
                        </span>
                        {isItemExpanded && (
                          <span className={`text-[10px] font-bold uppercase mt-1 ${itemCopied ? "text-green-600" : "text-orange-600 animate-pulse"}`}>
                            {itemCopied ? t("prompt.history.copied") : t("prompt.history.usageHint")}
                          </span>
                        )}
                      </div>
                    </motion.button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
