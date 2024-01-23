import { Anchor, Stack, Text } from "@mantine/core";
import Body from "components/Body";
import Footer from "components/Footer/Footer";
import Header from "components/Header";

const ErrorPage = () => {
  return (
    <>
      <Header />
      <Body>
        <Stack align="center" justify="center" style={{ width: "100%" }}>
          <Text size="80px" style={{ textAlign: "center" }}>
            Not today...
          </Text>
          <Text style={{ maxWidth: 700, margin: 30 }}>
            Whatever it is you're looking for, it's not here. If you got here from an out-of-date link on this site or
            in some documentation, please <Anchor href="mailto:localboast@outlook.com">Contact Me</Anchor> and let me
            know.
            <br />
            <br />
            Otherwise, the thing you're looking for may have just moved, or you're having an off-day and just spelt it
            wrong. Good luck finding it anyway!
            <br />
            <br />- Conor
          </Text>
        </Stack>
      </Body>
      <Footer />
    </>
  );
};

export default ErrorPage;
