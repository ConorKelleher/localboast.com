import { Link } from "react-router-dom";
import LogoSVG from "/src/assets/logo_color_wide.svg?react";
import { Group, Text } from "@mantine/core";
import DarkSideToggle from "components/DarkSideToggle";

const HomePage = () => {
  return (
    <>
      <Group>
        <Link to="/">
          <LogoSVG height={100} />
        </Link>
        <DarkSideToggle />
      </Group>

      <input type="text" placeholder="hi"></input>

      <Text style={{ width: 100 }}>This is some paragraph text. I don't know if I should be light or dark</Text>

      <div style={{ backgroundColor: "white" }}></div>
    </>
  );
};

export default HomePage;
