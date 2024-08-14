import { Button, Stack } from "@mantine/core";
import { Outlet, useMatches } from "react-router-dom";
import useCopyToClipboard from "localboast/hooks/useCopyToClipboard";
import { last } from "localboast/utils/arrayHelpers";
import Paths from "Paths";
import getCopy from "constants/localisation";

const AppsPage = () => {
  const { onCopy: onCopyEmbedLink, copied } = useCopyToClipboard(window.location.href.replace("/apps/", "/"));
  const showEmbedLink = last(useMatches()).pathname !== `/${Paths.AppsPage}/`;

  return (
    <Stack align="center">
      {showEmbedLink && (
        <Button w={200} onClick={onCopyEmbedLink}>
          {getCopy(copied ? "copied" : "copyEmbed")}
        </Button>
      )}
      <Outlet />
    </Stack>
  );
};

export default AppsPage;
