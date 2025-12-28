import { useEffect, useState, type FormEvent } from "react";
import { useI18n } from "../i18n";
import { listGenerations, saveGeneration } from "../services/localDb";
import type { GenerationRecord } from "../services/localDb";
import { useAuth } from "../context/AuthContext";
import { VideoForm } from "./generator/VideoForm"; // Ajuste le chemin selon ta structure
import Card, { CardBody, CardFooter, CardHeader } from "./ui/Card";
import TextType from "./ui/TextType";

// Définition des types et defaults (Tu peux aussi mettre ça dans un fichier types.ts)
type VideoFormType = {
  topic: string;
  catType: string;
  tone: string;
  duration: number;
  language: string;
};

type propGenerator = {
  isGenerate : boolean
  setIsGenerate : (g : boolean) => void
}

const defaultHashtags = ["#chat", "#ai", "#tiktok", "#viral", "#catslover"];

const baseForm: VideoFormType = {
  topic: "",
  catType: "British Shorthair",
  tone: "",
  duration: 18,
  language: "fr",
};

// Fonction utilitaire déplacée ou gardée ici si utilisée uniquement par ce composant
const buildRecord = (
  payload: VideoFormType,
  userEmail: string
): GenerationRecord => {
  // ... (Ta logique existante buildRecord, inchangée pour économiser l'espace ici)
  const now = new Date().toISOString();
  const randomId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `gen-${Date.now()}`;

  // Simuler la logique des scriptBeats pour l'exemple
  const scriptBeats = [
    `Hook: ${payload.topic} (${payload.duration}s)`,
    `Plan 1: ${payload.catType} close-up`,
  ];

  return {
    id: randomId,
    userEmail,
    createdAt: now,
    topic: payload.topic,
    catType: payload.catType,
    tone: payload.tone,
    duration: payload.duration,
    language: payload.language,
    overlay: `${payload.duration}s · ${payload.tone} · vertical`,
    scriptBeats,
    hashtags: defaultHashtags,
    platform: "tiktok",
    status: "ready",
  };
};

export function Generator(props : propGenerator) {
  const { t } = useI18n();
  const { currentUser } = useAuth();

  // États
  const [form, setForm] = useState<VideoFormType>({
    ...baseForm,
    topic: t("placeholder.topic"),
    tone: t("placeholder.tone"),
  });

  const [history, setHistory] = useState<GenerationRecord[]>([]);
  const [message, setMessage] = useState<string>("");

  // Effets
  useEffect(() => {
    setHistory(listGenerations(currentUser?.email));
  }, [currentUser]);

  // Handlers
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const email = currentUser?.email ?? "invite@local";
    const record = buildRecord(form, email);

    saveGeneration(record);
    setHistory(listGenerations(currentUser?.email)); // Refresh history
    setMessage(
      currentUser ? t("status.saved") : "Connectez-vous pour sauvegarder."
    );
  };

  // Sélectionner quoi afficher : la prévisualisation actuelle OU le dernier élément de l'historique

  return (
    <Card className="m-4 gap-2">
      {/* En-tête */}
      <CardHeader className="m-2">
        <TextType variant="h3">{t("nav.generator")}</TextType>
        <TextType variant="body">{t("form.notes")}</TextType>
      </CardHeader>
      <CardBody>
        {/* Formulaire */}
        <VideoForm
          formData={form}
          setFormData={setForm}
          onSubmit={() => {handleSubmit ; props.setIsGenerate(!props.isGenerate)}}
        />
      </CardBody>
      <CardFooter>
        {/* Messages système */}
        {message && (
          <div className="rounded-xl border border-accent/30 bg-accent/10 px-3 py-2 text-sm text-text animate-pulse">
            {message}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default Generator;
