import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import CircularProgress from "@mui/material/CircularProgress";
import Alart from "./Alert";
import { useState } from "react";
import { getUser, logIn } from "./apiCalls";
import { useContexts } from "../Statemgnt/Context";
import { useNavigate } from "react-router-dom";

export default function Login({ openLogin, setOpenLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [alerterror, setAlerterror] = useState("");
  const [progress, setProgress] = useState(false);
  const [, dispatch] = useContexts();
  const handleSubmit = () => {
    setProgress(true);
    setOpen(false);
    logIn({ email, password })
      .then((res) => {
        let token = res?.data?.data;
        getUser(token)
          .then((res) => {
            dispatch({ type: "AddUser", value: res?.data?.data[0] });
          })
          .catch((err) => console.log(err?.response?.data?.message));
        dispatch({ type: "AddToken", value: token });
        setEmail("");
        setPassword("");
        setProgress(false);
        setOpenLogin(false);
        navigate("/courses");
      })
      .catch((err) => {
        setAlerterror(err?.response?.data?.message);
        setProgress(false);
        setOpen(true);
      });
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setOpenLogin(false);
  };

  return (
    <div>
      <Dialog open={openLogin} onClose={handleClose}>
        <DialogTitle>Log in</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Alart
              alertopen={open}
              alertsetOpen={setOpen}
              alertmessage={alerterror}
            />
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="name"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          {progress ? (
            <CircularProgress />
          ) : (
            <Button onClick={handleSubmit}>Log in </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
