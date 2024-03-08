import { Stack } from "@mantine/core";
import Paths from "Paths";
import { Link } from "react-router-dom";
import usePageTitle from "temp/usePageTitle";

const LiveUtilsPage = () => {
  usePageTitle("Livestream Apps | LocalBoast");

  return (
    <Stack>
      <Link to={`/${Paths.UnwrappedRoot}/${Paths.EtChatSketch}`}>Et-Chat-Sketch</Link>
      <Link to={`/${Paths.UnwrappedRoot}/${Paths.Replay}`}>Replay</Link>
    </Stack>
  );
};

export default LiveUtilsPage;
