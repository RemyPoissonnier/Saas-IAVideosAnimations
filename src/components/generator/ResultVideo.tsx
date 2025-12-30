import Card from "../ui/Card";
import LoadingGeneration from "./LoadingGeneration";
import ReturnVideo from "./ReturnVideo";

type propResultVideo = {
  isActive: boolean;
  isLoading : boolean;
  videoUrl: string | null;
  error: string | null;
};

function ResultVideo(props: propResultVideo) {
  return (
    <div className={props.isActive ? "" : "hidden"}>
      {props.isLoading ? <LoadingGeneration /> : <ReturnVideo videoUrl={props.videoUrl} isLoading={props.isLoading} />}
    </div>
  );
}

export default ResultVideo;
