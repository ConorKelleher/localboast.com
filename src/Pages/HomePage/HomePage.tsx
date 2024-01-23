import { Group, Stack, Text } from "@mantine/core";
import styles from "./styles.module.sass";

const HomePage = () => {
  return (
    <div className={styles.hopwrppr}>
      <input type="text" placeholder="hi"></input>
      <Group grow>
        <Stack>
          <Text style={{ width: 100 }}>This is some paragraph text. I don't know if I should be light or dark</Text>
          <Text style={{ width: 100, fontStyle: "italic" }}>
            This is some paragraph text. I don't know if I should be light or dark
          </Text>
        </Stack>
        <Stack>
          <Text style={{ width: 100 }}>This is some paragraph text. I don't know if I should be light or dark</Text>
          <Text style={{ width: 100, fontStyle: "italic" }}>
            This is some paragraph text. I don't know if I should be light or dark
          </Text>
        </Stack>
        <Stack>
          <Text style={{ width: 100 }}>This is some paragraph text. I don't know if I should be light or dark</Text>
          <Text style={{ width: 100, fontStyle: "italic" }}>
            This is some paragraph text. I don't know if I should be light or dark
          </Text>
        </Stack>
      </Group>
    </div>
  );
};

export default HomePage;
