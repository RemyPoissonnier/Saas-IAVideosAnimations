import { motion } from "framer-motion";
import { DownloadCloud, Loader2, Play } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { useI18n } from "../../i18n";
import type { SlopItem } from "../hooks/useSlopGeneration";

interface SlopResultsProps {
  results: SlopItem[];
  isGenerating: boolean;
  isZipping: boolean;
  onDownloadAll: () => void;
}

export const SlopResults = ({
  results,
  isGenerating,
  isZipping,
  onDownloadAll,
}: SlopResultsProps) => {
  const { t } = useI18n();
  const hasResults = results.some((r) => r.data?.outputUrl);

  return (
    <>
      {/* BULK DOWNLOAD BUTTON */}
      {hasResults && !isGenerating && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <Button
            variant="secondary"
            onClick={onDownloadAll}
            disabled={isZipping}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-zinc-800 shadow-xl border border-border/50 hover:scale-105 transition-all"
          >
            {isZipping ? (
              <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
            ) : (
              <DownloadCloud className="w-5 h-5 text-orange-500" />
            )}
            <span className="text-sm font-bold uppercase tracking-wider">
              {isZipping ? "Creating ZIP..." : t("prompt.slop.downloadAll")}
            </span>
          </Button>
        </motion.div>
      )}

      {/* RESULTS ROLL */}
      <div className="w-full relative px-10">
        <div className="flex gap-6 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory scrollbar-hide no-scrollbar scroll-smooth">
          {results.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[280px] md:min-w-[320px] aspect-[9/16] snap-center"
            >
              <Card className="h-full w-full overflow-hidden border-0 relative group shadow-2xl bg-surface-2">
                {item.loading ? (
                  <div className="h-full w-full flex flex-col items-center justify-center bg-surface-strong/50 gap-4 animate-pulse border-2 border-dashed border-orange-500/20">
                    <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                    <span className="text-[10px] font-mono opacity-50">
                      {t("prompt.slop.varLoading")}
                      {index + 1}...
                    </span>
                  </div>
                ) : item.data?.outputUrl ? (
                  <div className="relative h-full w-full bg-black">
                    <video
                      src={item.data.outputUrl}
                      className="h-full w-full object-cover"
                      loop
                      muted
                      playsInline
                      autoPlay
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end pb-8 gap-4">
                      <a
                        href={item.data.outputUrl}
                        download
                        target="_blank"
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-xs font-bold shadow-lg shadow-orange-500/40 transition-all active:scale-95"
                      >
                        {t("prompt.slop.download")}
                      </a>
                    </div>
                  </div>
                ) : item.error ? (
                  <div className="h-full w-full flex items-center justify-center bg-red-500/10 text-red-500 p-4 text-center text-[10px]">
                    {item.error}
                  </div>
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-surface-strong/30 border-2 border-dashed border-border/20">
                    <Play className="w-12 h-12 opacity-5" />
                  </div>
                )}

                {/* Index Badge */}
                <div className="absolute top-4 left-4 w-8 h-8 rounded-xl bg-black/40 backdrop-blur-xl text-white text-xs font-black flex items-center justify-center border border-white/10 shadow-lg">
                  {index + 1}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Visual cues for more content */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10 opacity-50" />
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10 opacity-50" />
      </div>
    </>
  );
};
