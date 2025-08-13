import homeContent from "../Home.json";
import CanvasBackground from "./CanvasBackground";
import VantaBackground from "./VantaBackground";

export default function Page() {
  return (
    <>
      <CanvasBackground />
      {/* <VantaBackground /> */}
      <div>
        <h1>{homeContent.heroSection.headline}</h1>
        <p>{homeContent.heroSection.subheadline}</p>
        <button>{homeContent.buttons.getStarted}</button>
      </div>
    </>
  );
}
