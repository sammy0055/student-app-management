import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useContexts } from "../Statemgnt/Context";

function Paneltab(props) {
  const [{ paneltabState }, dispatch] = useContexts();

  const handleChange = (event, newValue) => {
   
    dispatch({ type: "paneltabState", value: newValue });
  };
  return (
    <TabContext value={paneltabState}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <TabList onChange={handleChange}>
          <Tab
            sx={{ typography: "body1" }}
            label="Add Course"
            value="1"
            component={Link}
            to="/courses"
          />
          <Tab
            sx={{ typography: "body1" }}
            label="Add Result"
            value="2"
            component={Link}
            to="/result"
          />
          <Tab sx={{ typography: "body1" }} label="Check Result" value="3" />
        </TabList>
      </Box>
    </TabContext>
  );
}

export default Paneltab;
