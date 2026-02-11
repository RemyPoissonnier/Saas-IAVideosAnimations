import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useSlopGeneration } from "../components/hooks/useSlopGeneration";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import TextType from "../components/ui/TextType";
import SEO from "../components/SEO";
import { useI18n } from "../i18n";
import { Loader2, Sparkles } from "lucide-react";
import JSZip from "jszip";
import { apiClient } from "../components/hooks/apiClient";
import { TagInput } from "../components/slop/TagInput";
import { SlopResults } from "../components/slop/SlopResults";

export function SlopGenerator() {
  const { t } = useI18n();
  const { currentUser, getToken } = useAuth();
  const { generateSlop, results, isGenerating } = useSlopGeneration();
  const [isZipping, setIsZipping] = useState(false);
  const [loadingParams, setLoadingParams] = useState(false);

  const [action, setAction] = useState("");
  const [context, setContext] = useState("");
  const [cinematography, setCinematography] = useState<string[]>([]);
  const [subject, setSubject] = useState<string[]>([]);
  const [style, setStyle] = useState<string[]>([]);

  useEffect(() => {
    if (currentUser?.uid) {
      const loadParams = async () => {
        setLoadingParams(true);
        try {
          const token = await getToken();
          const data = await apiClient<any>("/slop-params", "GET", undefined, token);
          if (data) {
            setAction(data.action || "");
            setContext(data.context || "");
            setCinematography(data.cinematography || []);
            setSubject(data.subject || []);
            setStyle(data.style || []);
          }
        } catch (e) {
          console.warn("Failed to load slop params", e);
        } finally {
          setLoadingParams(false);
        }
      };
      loadParams();
    }
  }, [currentUser?.uid, getToken]);

  const saveCurrentParams = async (updates: any) => {
    if (!currentUser?.uid) return;
    try {
      const token = await getToken();
      await apiClient("/slop-params", "POST", {
        action, context, cinematography, subject, style, ...updates,
      }, token);
    } catch (e) {
      console.error("Failed to save slop params", e);
    }
  };

  const addToList = (list: string[], setList: any, field: string, val: string) => {
    if (list.length >= 15) return;
    const newList = [...list, val];
    setList(newList);
    saveCurrentParams({ [field]: newList });
  };

  const removeFromList = (list: string[], setList: any, field: string, idx: number) => {
    const newList = list.filter((_, i) => i !== idx);
    setList(newList);
    saveCurrentParams({ [field]: newList });
  };

  const handleGenerate = () => {
    if (!currentUser?.uid) return;
    
    // Pass the "elements" directly to the API as requested
    const elements = {
      action,
      context,
      cinematography,
      subject,
      style
    };

    generateSlop(elements, currentUser.uid);
  };

  const handleDownloadAll = async () => {
    const items = results.filter((item) => item.data?.outputUrl);
    if (items.length === 0) return;
    setIsZipping(true);
    const zip = new JSZip();
    try {
      await Promise.all(items.map(async (item, i) => {
        const response = await fetch(item.data!.outputUrl!);
        zip.file(`slop_variation_${i + 1}.mp4`, await response.blob());
      }));
      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = `whisker_slop_pack_${Date.now()}.zip`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      alert("Failed to bundle videos.");
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto p-4 flex flex-col items-center">
      <SEO title={t("prompt.slop.title")} description={t("prompt.slop.subtitle")} url="https://whisker.studio/prompt/slop-generator" />

      <div className="text-center space-y-4 mb-12 mt-8 max-w-2xl">
        <TextType variant="gradient" className="text-4xl md:text-5xl font-black uppercase tracking-tighter">{t("prompt.slop.title")}</TextType>
        <TextType variant="body" className="text-lg opacity-80">{t("prompt.slop.subtitle")}</TextType>
      </div>

      {loadingParams ? (
        <div className="flex flex-col items-center gap-4 py-20 opacity-50">
          <Loader2 className="w-10 h-10 animate-spin text-accent" />
          <span className="text-sm font-mono uppercase tracking-widest">Loading your preferences...</span>
        </div>
      ) : (
        <>
          <div className="w-full max-w-5xl mb-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <Card className="p-6 border-orange-500/20 h-full">
              <h3 className="text-lg font-bold text-accent mb-4 pb-2 border-b border-border/10">{t("prompt.slop.sections.unique")}</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider opacity-70">{t("prompt.slop.fields.action")} <span className="text-red-400">*</span></label>
                  <textarea value={action} onChange={(e) => setAction(e.target.value)} onBlur={() => saveCurrentParams({ action })} placeholder={t("prompt.slop.fields.placeholders.action")} className="w-full bg-surface-2/50 border border-border/20 rounded-xl p-3 text-base outline-none focus:border-accent min-h-[100px] resize-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider opacity-70">{t("prompt.slop.fields.context")}</label>
                  <textarea value={context} onChange={(e) => setContext(e.target.value)} onBlur={() => saveCurrentParams({ context })} placeholder={t("prompt.slop.fields.placeholders.context")} className="w-full bg-surface-2/50 border border-border/20 rounded-xl p-3 text-base outline-none focus:border-accent min-h-[80px] resize-none transition-colors" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-blue-500/20 h-full">
              <h3 className="text-lg font-bold text-blue-400 mb-4 pb-2 border-b border-border/10">{t("prompt.slop.sections.lists")}</h3>
              <div className="space-y-6">
                <TagInput label={t("prompt.slop.fields.cinematography")} placeholder={t("prompt.slop.fields.placeholders.cinematography")} items={cinematography} onAdd={(v) => addToList(cinematography, setCinematography, "cinematography", v)} onRemove={(i) => removeFromList(cinematography, setCinematography, "cinematography", i)} />
                <TagInput label={t("prompt.slop.fields.subject")} placeholder={t("prompt.slop.fields.placeholders.subject")} items={subject} onAdd={(v) => addToList(subject, setSubject, "subject", v)} onRemove={(i) => removeFromList(subject, setSubject, "subject", i)} />
                <TagInput label={t("prompt.slop.fields.style")} placeholder={t("prompt.slop.fields.placeholders.style")} items={style} onAdd={(v) => addToList(style, setStyle, "style", v)} onRemove={(i) => removeFromList(style, setStyle, "style", i)} />
              </div>
            </Card>
          </div>

          <div className="w-full max-w-md mb-16">
            <Button onClick={handleGenerate} disabled={!action.trim()} className="w-full py-5 text-xl font-black shadow-2xl hover:scale-105 transition-all rounded-2xl">
              {isGenerating ? <><Loader2 className="w-7 h-7 animate-spin" /><span>{t("prompt.slop.loading")}</span></> : <><Sparkles className="w-6 h-6" /><span>{t("prompt.slop.button")}</span></>}
            </Button>
          </div>
        </>
      )}

      <SlopResults results={results} isGenerating={isGenerating} isZipping={isZipping} onDownloadAll={handleDownloadAll} />
    </div>
  );
}

export default SlopGenerator;