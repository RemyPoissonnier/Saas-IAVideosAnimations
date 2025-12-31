import { useState } from "react";
import { useI18n } from "../i18n";
import Button from "./ui/Button";
import Card, { CardBody, CardFooter, CardHeader } from "./ui/Card";
import TextType from "./ui/TextType";

// On définit une prop pour remonter les infos au parent
interface PromptToolProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export function PromptTool(props: PromptToolProps) {
  const { t } = useI18n();

  const [format, setFormat] = useState({
    resolution: "1080p",
    ratio: "9:16",
    framerate: "30",
    format: "mp4",
    duration: "15s",
  });

  return (
    <Card className="h-full p-3">
      {/* HEADER SIMPLE */}
      <CardHeader>
        <TextType className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
          {t("prompt.title")}
        </TextType>
        <TextType className="text-sm text-slate-600">
          Décrivez simplement votre idée et choisissez le format.
        </TextType>
      </CardHeader>

      {/* ZONE DE PROMPT */}
      <CardBody className="flex flex-col gap-2">
        <textarea
          value={props.prompt}
          onChange={(e) => props.setPrompt(e.target.value)}
          placeholder="Un chat mignon qui joue avec une pelote de laine..."
          className={` min-h-[100px] resize-none`}
        />
        {/* {props.error && <div className="text-xs text-red-600">{props.error}</div>} */}
      </CardBody>

      {/* OPTIONS DE FORMAT (Grille compacte) */}
      <CardFooter className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700">
            Resolution
          </label>
          <select
            value={format.resolution}
            onChange={(e) =>
              setFormat((p) => ({ ...p, resolution: e.target.value }))
            }
          >
            <option value="720p">720p</option>
            <option value="1080p">1080p</option>
            <option value="4k">4K</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700">Ratio</label>
          <select
            value={format.ratio}
            onChange={(e) =>
              setFormat((p) => ({ ...p, ratio: e.target.value }))
            }
          >
            <option value="16:9">16:9 (Youtube)</option>
            <option value="9:16">9:16 (TikTok/Reel)</option>
            <option value="1:1">1:1 (Square)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700">Durée</label>
          <select
            value={format.duration}
            onChange={(e) =>
              setFormat((p) => ({ ...p, duration: e.target.value }))
            }
          >
            <option value="5s">5s</option>
            <option value="10s">10s</option>
            <option value="15s">15s</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700">Format</label>
          <select
            value={format.format}
            onChange={(e) =>
              setFormat((p) => ({ ...p, format: e.target.value }))
            }
          >
            <option value="mp4">MP4</option>
            <option value="mov">MOV</option>
          </select>
        </div>
      </CardFooter>

        {/* ACTION BUTTON */}
        <Button onClick={props.onGenerate}>
          {t("prompt.button") || "Générer la vidéo"}
        </Button>

        {/* RÉCAPITULATIF DISCRET */}
        <TextType variant="caption" className="static bottom-0">
          Sortie : {format.resolution} • {format.ratio} •{" "}
          {format.format.toUpperCase()}
        </TextType>
    </Card>
  );
}

export default PromptTool;
