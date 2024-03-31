import { Stack } from "@mantine/core";
import Paths from "Paths";
import usePageTitle from "localboast/hooks/usePageTitle";
import { Link } from "react-router-dom";

const AppsPageIndex = () => {
  usePageTitle("Apps | LocalBoast");

  return (
    <Stack>
      <Link to={Paths.EtChatSketch}>Et-Chat-Sketch</Link>
      <Link to={Paths.Replay}>Replay</Link>
    </Stack>
  );
};

export default AppsPageIndex;
