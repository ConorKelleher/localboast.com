import Paths from "Paths";
import { Link } from "react-router-dom";
import usePageTitle from "temp/usePageTitle";

const LiveUtilsPage = () => {
  usePageTitle("Livestream Apps | LocalBoast");

  return <Link to={Paths.EtChatSketch}>Et-Chat-Sketch</Link>;
};

export default LiveUtilsPage;
