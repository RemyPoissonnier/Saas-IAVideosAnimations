import LoadingGeneration from "./LoadingGeneration";
import ReturnVideo from "./ReturnVideo";

type propResultVideo = {
  isLoading: boolean;
  videoUrl: string | undefined;
  error: string | null;
};

function ResultVideo(props: propResultVideo) {
  return (
    <>
      {props.isLoading ? (
        <LoadingGeneration />
      ) : (
        <ReturnVideo videoUrl={props.videoUrl} isLoading={props.isLoading} />
      )}
    </>
  );
}

export default ResultVideo;
