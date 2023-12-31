import { Link } from "react-router-dom";
import { Group, Text } from "@mantine/core";
import DarkSideToggle from "components/DarkSideToggle";
import HomeIcon from "components/HomeIcon";

const HomePage = () => {
  return (
    <div style={{ padding: 20 }}>
      <Group style={{ margin: -20, marginBottom: 0 }}>
        <Link to="/">
          <HomeIcon />
        </Link>
        <DarkSideToggle />
      </Group>

      <input type="text" placeholder="hi"></input>

      <Text style={{ width: 100 }}>This is some paragraph text. I don't know if I should be light or dark</Text>

      <div style={{ backgroundColor: "white" }}></div>
    </div>
  );
};

export default HomePage;
