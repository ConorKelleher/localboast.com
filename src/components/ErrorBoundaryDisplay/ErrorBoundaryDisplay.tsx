import { Center, darken, lighten, Paper, Stack, Text, useComputedColorScheme } from "@mantine/core";
import ErrorBoundary from "localboast/components/ErrorBoundary";
import { PropsWithChildren } from "react";
import { LB_COLORS } from "theme";

export const ErrorBoundaryDisplay = (props: PropsWithChildren) => {
  const colorScheme = useComputedColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? darken(LB_COLORS.boastfulRed, 0.6) : lighten(LB_COLORS.boastfulRed, 0.8);
  return (
    <ErrorBoundary>
      {({ error }) =>
        error ? (
          <Center h="100%" w="100%">
            <Paper h="fit-content" w="fit-content" shadow="md" radius="md" p="100px" style={{ backgroundColor }}>
              <Center h="100%">
                <Stack justify="center" align="center">
                  <Text size="100px">Ruh-roh!</Text>
                  <Text size="xl">{error.message}</Text>
                </Stack>
              </Center>
            </Paper>
          </Center>
        ) : (
          props.children
        )
      }
    </ErrorBoundary>
  );
};

export default ErrorBoundaryDisplay;
