import { ActionIcon, Button, Center, ColorInput, Group, Stack, useComputedColorScheme } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { DEFAULT_COLOR_SCHEME } from "constants/preferences";
import Code from "localboast/components/Code";
import useAnimatedText from "localboast/hooks/useAnimatedText";
import { useState } from "react";

const getPersistedPageData = () => {
  // todo - add some localstorage stuff
  return [""]; // todo - maybe have default be useful placeholder?
};

const getPersistedActivePageIndex = () => {
  // todo - add some localstorage stuff
  // todo - make sure index is less than page data size - somehow
  return 0;
};

const Replay = () => {
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>();
  const [pageData, setPageData] = useState(getPersistedPageData);
  const [activePageIndex, setActivePageIndex] = useState(getPersistedActivePageIndex);
  const animatedText = useAnimatedText(pageData[activePageIndex]);
  const computedColorScheme = useComputedColorScheme(DEFAULT_COLOR_SCHEME);

  const onChangeCurrentPage = (newString: string) => {
    setPageData((currentPageData) => {
      const modifiedPageData = [...currentPageData];
      modifiedPageData[activePageIndex] = newString;
      return modifiedPageData;
    });
  };

  const onAddNewPage = () => {
    let newPageIndex = 0;
    setPageData((currentPageData) => {
      newPageIndex = currentPageData.length;
      return [...currentPageData, currentPageData[currentPageData.length - 1]];
    });
    setActivePageIndex(newPageIndex);
  };

  const onRemovePage = (index: number) => {
    let newMaxIndex = 0;
    setPageData((currentPageData) => {
      const newPageData = [...currentPageData];
      newPageData.splice(index, 1);
      newMaxIndex = newPageData.length - 1;
      return newPageData;
    });
    setActivePageIndex((currentPageIndex) => (currentPageIndex > newMaxIndex ? newMaxIndex : currentPageIndex));
  };

  return (
    <Center h="100%" w="100%">
      <Stack w="100%" h="100%" align="center">
        <Code
          style={{ width: "100%", height: "100%" }}
          colorScheme={computedColorScheme}
          editable
          codeProps={{
            className: "language-javascript",
            style: {
              backgroundColor: backgroundColor,
            },
          }}
          onChange={onChangeCurrentPage}
        >
          {animatedText}
        </Code>
        <Group align="flex-start">
          {pageData.map((_, pageIndex) => (
            <Stack key={pageIndex} align="center">
              <Button
                disabled={pageIndex === activePageIndex}
                onClick={() => {
                  setActivePageIndex(pageIndex);
                }}
              >
                {pageIndex + 1}
              </Button>
              <ActionIcon
                onClick={() => onRemovePage(pageIndex)}
                color="red"
                variant="subtle"
                disabled={pageData.length === 1}
              >
                <IconTrash />
              </ActionIcon>
            </Stack>
          ))}
          <Button onClick={onAddNewPage}>+</Button>
        </Group>
        <Group align="center">
          <ColorInput size="md" key={backgroundColor ? 1 : 0} value={backgroundColor} onChange={setBackgroundColor} />
          {!!backgroundColor && (
            <Button onClick={() => setBackgroundColor(undefined)} color="red" variant="subtle">
              <IconTrash />
              Reset
            </Button>
          )}
        </Group>
      </Stack>
    </Center>
  );
};

export default Replay;
