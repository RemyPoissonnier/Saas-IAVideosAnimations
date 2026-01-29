import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n";
import catAndDogVideo from "../assets/videos/CatAndDog.mp4";
import catWorkVideo from "../assets/videos/catWork.mp4";
import TextType from "../components/ui/TextType";
import { Scene } from "../components/landingPage/Scene";

const PLAYLIST = [catAndDogVideo, catWorkVideo];

export function Landing() {
  const { t } = useI18n();
  const [videoIdx, setVideoIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    // SENIOR TIP : On charge explicitement la nouvelle source
    // Cela permet de garder la même balise <video> sans la détruire
    videoEl.load();
    videoEl.currentTime = 0;

    const playPromise = videoEl.play();
    // Gestion propre de l'autoplay (qui peut être bloqué par le navigateur)
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay prevented. User interaction might be needed.
      });
    }
  }, [videoIdx]);

  return (
    <div className="space-y-10 px-4 md:px-6">
      <section className="text-center space-y-4">
        <TextType variant="h1">{t("landing.title")}</TextType>
      </section>

      <Scene />
    </div>
  );
}

export default Landing;
