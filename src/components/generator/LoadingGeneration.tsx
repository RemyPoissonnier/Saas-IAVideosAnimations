import React, { useEffect, useState } from "react";

import loadingV from "../../assets/videos/LoadingApp.mp4";
import ProgressBar from "../ui/ProgessBar";
import Card, { CardBody, CardFooter, CardHeader } from "../ui/Card";
import TextType from "../ui/TextType";

function LoadingGeneration() {
  const [progress, setProgress] = useState(0);

  // Simulation de chargement (À remplacer par tes vraies websockets ou polling plus tard)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        // On avance aléatoirement pour faire "naturel"
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Card className="flex flex-col items-center justify-center m-4">
      <div className="absolute inset-0 bg-black/10 pointer-events-none rounded-2xl"></div>

      {/* J'ai ajouté un peu de style pour centrer le tout, style Mistral AI */}
      <CardHeader className="mb-4 text-xl font-light tracking-wide animate-pulse">
        <TextType variant="h2">Génération en cours...</TextType>
      </CardHeader>

      <CardBody>
        <video
          className="rounded-lg object-cover" // Classes Tailwind pour le style
          width="750"
          height="500"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={loadingV} type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
        {/* Overlay léger pour unifier la teinte si besoin */}
      </CardBody>

      <CardFooter>
        <div className="w-full max-w-[750px] mt-4">
          <ProgressBar progress={progress} label="Génération de l'univers..." />
        </div>
      </CardFooter>
      {/* Barre de chargement intégrée */}
    </Card>
  );
}

export default LoadingGeneration;
