import { useI18n } from "../i18n";
import Button from "./ui/Button";
import Card, { CardBody, CardFooter, CardHeader } from "./ui/Card";
import TextType from "./ui/TextType";
import type { OptionsIaRP } from "../api/type";

// On définit une prop pour remonter les infos au parent
interface PromptToolProps {
  prompt: string;
  setPrompt: (value: string) => void;
  options: OptionsIaRP;
  setOptions: (value: OptionsIaRP) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export function PromptTool(props: PromptToolProps) {
  const { t } = useI18n();

  return (
    <Card className="h-full p-3">
      {/* HEADER SIMPLE */}
      <CardHeader>
        <TextType className="text-xs font-semibold uppercase tracking-[0.08em]">
          {t("prompt.title")}
        </TextType>
        <TextType className="text-sm ">
          Décrivez simplement votre idée et choisissez le format.
        </TextType>
      </CardHeader>

      {/* ZONE DE PROMPT */}
      <CardBody className="flex flex-col gap-2">
        <textarea
          value={props.prompt}
          onChange={(e) => props.setPrompt(e.target.value)}
          placeholder="Un chat mignon qui joue avec une pelote de laine..."
          className="min-h-[100px] resize-none rounded-xl p-2"
        />
        {/* {props.error && <div className="text-xs text-red-600">{props.error}</div>} */}
      </CardBody>

      {/* OPTIONS DE FORMAT (Grille compacte) */}
      <CardFooter className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium">
            Resolution
          </label>
          <select
            value={props.options.resolution}
            onChange={(e) =>
              props.setOptions({
                ...props.options,
                resolution: e.target.value as OptionsIaRP["resolution"],
              })
            }
          >
            <option value="720p">720p</option>
            <option value="1080p">1080p</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium">Ratio</label>
          <select
            value={props.options.aspectRatio}
            onChange={(e) =>
              props.setOptions({
                ...props.options,
                aspectRatio: e.target.value as OptionsIaRP["aspectRatio"],
              })
            }
          >
            <option value="16:9">16:9 (Youtube)</option>
            <option value="9:16">9:16 (TikTok/Reel)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium">Durée</label>
          <select
            value={props.options.durationSeconds}
            onChange={(e) =>
              props.setOptions({
                ...props.options,
                durationSeconds: e.target
                  .value as OptionsIaRP["durationSeconds"],
              })
            }
          >
            <option value={"4"}>4s</option>
            <option value={"6"}>6s</option>
            <option value={"8"}>8s</option>
          </select>
        </div>
      </CardFooter>

      {/* ACTION BUTTON */}
      <Button onClick={props.onGenerate} className="flex">
        {t("prompt.button") || "Générer la vidéo"}
      </Button>
    </Card>
  );
}

export default PromptTool;
