import Button from "../ui/Button";
import Card, { CardBody, CardFooter, CardHeader } from "../ui/Card";
import TextType from "../ui/TextType";

// 1. Définition claire des attentes du composant
interface propsReturnVideo {
  videoUrl: string | null;
  isLoading: boolean;
  onReset?: () => void; // Pour le bouton "New generation"
}

function ReturnVideo({ videoUrl, isLoading, onReset }: propsReturnVideo) {
  return (
    <Card className="w-full overflow-hidden gap-2">
      {/* HEADER : Titre + Action */}
      <CardHeader className="m-2 flex justify-between content-center">
        <TextType variant="h2" className="font-bold">
          Résultat
        </TextType>
        <Button
          onClick={onReset}
          disabled={isLoading}
          variant="secondary" // Si tu as des variantes
          className="text-sm"
        >
          New generation
        </Button>
      </CardHeader>

      {/* ZONE VIDÉO PRINCIPALE */}
      <CardBody className="relative w-full aspect-video">
        {/* CAS 2 : Vidéo disponible */}
        {videoUrl && (
          <video
            src={videoUrl}
            controls={true}
            autoPlay
            className=" object-contain rounded-2xl"
          />
        )}
      </CardBody>

      {/* FOOTER : Historique (Placeholder amélioré) */}
      <CardFooter className="p-4">
        <TextType className="text-xs font-semibold uppercase mb-3 tracking-wider">
          Others videos generated
        </TextType>

        {/* Petite grille de placeholders pour l'historique */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="min-w-[100px] h-[60px] bg-gray-200 rounded-lg animate-pulse opacity-50 hover:opacity-100 cursor-pointer transition-opacity"
            ></div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}

export default ReturnVideo;
