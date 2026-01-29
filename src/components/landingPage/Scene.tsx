import { ScrollControls, Scroll } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Clapperboard } from "./Clapperboard";
import TextType from "../ui/TextType";

export const Scene: React.FC = () => {
  return (
    // Fixed inset-0 makes it fill the screen and stay behind your text
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [0, 0, 6], fov: 60 }}
        // This ensures the drawing buffer matches the window size
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />

        {/* damping: 0.2 creates that smooth "laggy" cinematic scroll */}
        <ScrollControls pages={4} damping={0.2}>
          <Clapperboard />

          <Scroll html>
            <div className="w-screen">
              {/* Use h-screen for each section so they stack perfectly */}
              <section className="h-screen w-full flex items-center px-10 pointer-events-none">
                <TextType variant="h2">SCENE 01</TextType>
              </section>
              <section className="h-screen w-full flex items-center justify-end px-10 pointer-events-none">
                <TextType variant="h2">SCENE 01</TextType>
              </section>
              <section className="h-screen w-full flex items-center px-10 pointer-events-none">
                <TextType variant="h2">SCENE 01</TextType>
              </section>
            </div>
            <section className="min-h-[20vh] w-full">
            
            </section>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
};
