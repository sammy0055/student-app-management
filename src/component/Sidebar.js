import { React, useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = useState(false);

  const toggleDrawer = () => {
    setState(!state);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <div>hello</div>
      <List>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Starred" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="trash" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {
        <div>
          <Button onClick={toggleDrawer}>left</Button>
          <SwipeableDrawer
            anchor="left"
            open={state}
            onClose={toggleDrawer}
            onOpen={toggleDrawer}
          >
            {list()}
          </SwipeableDrawer>
        </div>
      }
    </div>
  );
}
