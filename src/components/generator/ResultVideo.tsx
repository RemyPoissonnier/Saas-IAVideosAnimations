import Card from "../ui/Card";
import LoadingGeneration from "./LoadingGeneration";
import ReturnVideo from "./ReturnVideo";

type propResultVideo = {
  isActive: boolean;
  isLoading?: boolean;
};

function ResultVideo(props: propResultVideo) {
  return (
    <div className={props.isActive ? "" : "hidden"}> 

      {true ? <LoadingGeneration/> : <ReturnVideo/>}
    </div>
  );
}

export default ResultVideo;
