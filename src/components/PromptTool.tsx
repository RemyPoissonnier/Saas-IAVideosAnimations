import { useI18n } from "../i18n";
import Button from "./ui/Button";
import Card, { CardBody, CardFooter, CardHeader } from "./ui/Card";
import TextType from "./ui/TextType";
import type { OptionsIaRP } from "../api/type";
import { Select } from "./ui/Select";

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

  // 1. On définit la configuration des Selects ICI, à l'intérieur du composant
  // pour avoir accès à 'props.options' et 'props.setOptions'.
 const selectFields = [
    {
      id: "resolution",
      label: t("prompt.label.resolution"),
      value: props.options.resolution,
      options: [
        { value: "720p", label: "720p" },
        { value: "1080p", label: "1080p" },
      ],
      // MODIFICATION ICI : on utilise 'val' directement
      onChange: (val: any) => {
        // Sécurité : si jamais votre Select renvoie quand même un event
        const valueToUse = val.target ? val.target.value : val;
        
        props.setOptions({
          ...props.options,
          resolution: valueToUse as OptionsIaRP["resolution"],
        });
      },
    },
    {
      id: "ratio",
      label: t("prompt.label.ratio"),
      value: props.options.aspectRatio,
      options: [
        { value: "16:9", label: t("prompt.option.youtube") },
        { value: "9:16", label: t("prompt.option.tiktok") },
      ],
      onChange: (val: any) => {
        const valueToUse = val.target ? val.target.value : val;
        props.setOptions({
          ...props.options,
          aspectRatio: valueToUse as OptionsIaRP["aspectRatio"],
        });
      },
    },
    {
      id: "duration",
      label: t("prompt.label.duration"),
      value: props.options.durationSeconds,
      options: [
        { value: "4", label: "4s" },
        { value: "6", label: "6s" },
        { value: "8", label: "8s" },
      ],
      onChange: (val: any) => {
        const valueToUse = val.target ? val.target.value : val;
        props.setOptions({
          ...props.options,
          durationSeconds: valueToUse as OptionsIaRP["durationSeconds"],
        });
      },
    },
  ];

  return (
    <Card className="h-full p-3">
      {/* HEADER SIMPLE */}
      <CardHeader>
        <TextType className="text-xs font-semibold uppercase tracking-[0.08em]">
          {t("prompt.title")}
        </TextType>
        <TextType className="text-sm ">
          {t("prompt.description")}
        </TextType>
      </CardHeader>

      {/* ZONE DE PROMPT */}
      <CardBody className="flex flex-col gap-2">
        <textarea
          value={props.prompt}
          onChange={(e) => props.setPrompt(e.target.value)}
          placeholder= {t("prompt.placeholder")}
          className="min-h-[100px] resize-none rounded-xl p-2 border-slate-100 border-2"
        />
        {/* {props.error && <div className="text-xs text-red-600">{props.error}</div>} */}
      </CardBody>

      {/* OPTIONS DE FORMAT (Grille compacte) */}
      <CardFooter className="grid grid-cols-2 md:grid-cols-4 gap-3">
       {selectFields.map((field) => (
          <div key={field.id} className="space-y-1">
            <Select
              id={field.id}
              label={field.label}
              value={field.value}
              onChange={field.onChange}
              options={field.options}
            />
          </div>
        ))}
      </CardFooter>

      {/* ACTION BUTTON */}
      <Button onClick={props.onGenerate} className="flex">
        {t("prompt.button") || "Générer la vidéo"}
      </Button>
    </Card>
  );
}

export default PromptTool;
