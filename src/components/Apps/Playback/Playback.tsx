import { ActionIcon, Button, Center, ColorInput, Group, Menu, Stack, useComputedColorScheme } from "@mantine/core";
import useLocalStorage from "localboast/hooks/useLocalStorage";
import { IconTrash } from "@tabler/icons-react";
import { DEFAULT_COLOR_SCHEME } from "constants/preferences";
import Code from "localboast/components/Code";
import useAnimatedText from "localboast/hooks/useAnimatedText";
import usePageTitle from "localboast/hooks/usePageTitle";
import { useCallback, useState } from "react";
import {
  LS_KEY_PLAYBACK_BACKGROUND,
  LS_KEY_PLAYBACK_CONTENTS,
  LS_KEY_PLAYBACK_PAGE_INDEX,
} from "localboast/constants/twitchConstants";

const DEFAULT_BACKGROUND_COLOR = "#ffffff";
// Todo - add tutorial here via placeholder content
const DEFAULT_PAGE_DATA = [""];

const Playback = () => {
  usePageTitle("Playback - LocalBoast");
  const [backgroundColor, setBackgroundColor] = useLocalStorage<string>(
    LS_KEY_PLAYBACK_BACKGROUND,
    DEFAULT_BACKGROUND_COLOR
  );
  const [pageData, _setPageData] = useLocalStorage(LS_KEY_PLAYBACK_CONTENTS, DEFAULT_PAGE_DATA);
  const [activePageIndex, _setActivePageIndex] = useLocalStorage(LS_KEY_PLAYBACK_PAGE_INDEX, 0);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const activePageData = pageData[activePageIndex];
  const animatedText = useAnimatedText(activePageData);
  const textToDisplay = shouldAnimate ? animatedText : activePageData;
  const computedColorScheme = useComputedColorScheme(DEFAULT_COLOR_SCHEME);

  const setPageData = useCallback((newData: React.SetStateAction<string[]>) => {
    setShouldAnimate(false);
    _setPageData(newData);
    // Omit local storage setter since WE know it's a fixed reference
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setActivePageIndex = useCallback((newData: React.SetStateAction<number>) => {
    setShouldAnimate(true);
    _setActivePageIndex(newData);
    // Omit local storage setter since WE know it's a fixed reference
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAllAreDefault = () => {
    return pageData.length === 1 && pageData[0] === "";
  };

  const clearAll = () => {
    setPageData([""]);
    setActivePageIndex(0);
  };

  const onEditCurrentPage = (newString: string) => {
    setPageData((currentPageData) => {
      const modifiedPageData = [...currentPageData];
      modifiedPageData[activePageIndex] = newString;
      return modifiedPageData;
    });
  };

  const onAddNewPage = () => {
    const newPageIndex = pageData.length;
    setPageData((currentPageData) => {
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
          onChange={onEditCurrentPage}
        >
          {textToDisplay}
        </Code>
        <Group
          align="center"
          justify="center"
          w="100%"
          display="grid"
          style={{ gridTemplateColumns: "auto 1fr auto", alignItems: "flex-start" }}
        >
          <Button onClick={clearAll} disabled={checkAllAreDefault()}>
            Clear All
          </Button>
          <Stack align="center" justify="center">
            <Group align="flex-start" maw="100%">
              {pageData.map((_, pageIndex) => (
                <Stack key={pageIndex} align="center" gap={5}>
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
                    size="xs"
                    disabled={pageData.length === 1}
                  >
                    <IconTrash />
                  </ActionIcon>
                </Stack>
              ))}
              <Button onClick={onAddNewPage}>+</Button>
            </Group>
          </Stack>
          <Menu shadow="md" closeOnItemClick={false}>
            <Menu.Target>
              <Button>Customize</Button>
            </Menu.Target>

            <Menu.Dropdown p={10}>
              <Menu.Label>Background Color</Menu.Label>
              <Menu.Item component={Group} align="center" style={{ position: "relative", padding: 0 }}>
                <ColorInput
                  aria-label="Background Color"
                  size="md"
                  value={backgroundColor}
                  onChange={setBackgroundColor}
                  popoverProps={{ withinPortal: false }}
                />
                {backgroundColor !== DEFAULT_BACKGROUND_COLOR && (
                  <Button
                    style={{ position: "absolute", right: 0, top: 3, bottom: 0 }}
                    onClick={() => setBackgroundColor(DEFAULT_BACKGROUND_COLOR)}
                    color="red"
                    variant="subtle"
                  >
                    <IconTrash />
                    Reset
                  </Button>
                )}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Stack>
    </Center>
  );
};

export default Playback;
