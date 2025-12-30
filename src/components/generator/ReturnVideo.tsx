import Button from "../ui/Button";
import Card, { CardFooter, CardHeader } from "../ui/Card";
import TextType from "../ui/TextType";

// 1. Définition claire des attentes du composant
interface propsReturnVideo {
  videoUrl: string | null;
  isLoading: boolean;
  onReset?: () => void; // Pour le bouton "New generation"
}

function ReturnVideo({ videoUrl, isLoading, onReset }: propsReturnVideo) {
  return (
    <Card className="w-full overflow-hidden transition-all duration-300">
      {/* HEADER : Titre + Action */}
      <CardHeader>
        <TextType variant="h2" className="text-xl font-bold text-gray-800">
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
      <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-inner flex items-center justify-center mb-6 group">
        {/* CAS 2 : Vidéo disponible */}
        {videoUrl && (
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {/* FOOTER : Historique (Placeholder amélioré) */}
      <CardFooter className="bg-gray-50 -mx-6 -mb-6 p-4 border-t border-gray-100">
        <TextType className="text-xs font-semibold uppercase text-gray-500 mb-3 tracking-wider">
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
