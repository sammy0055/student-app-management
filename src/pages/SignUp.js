import "../styles/signup.css";
import { Typography, Button, Chip, Switch } from "@mui/material";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import { useState } from "react";

import signpics from "../assets/signpics.jpg";

//experiment stuff
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import StudentsignupComponent from "../component/StudentsignupComponent";
import StaffsignUpComponent from "../component/StaffsignUpComponent";
import Login from "../component/Login";

const style = {
  DB: {
    fontFamily: "PublicSansItalic",
    marginBottom: "5px",
    color: "#007bff",
  },
  SwitchAccountIcon: {
    fontSize: "20px",
  },
  TextField: {
    margin: "20px",
    borderColor: "white",
  },
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function SignUp(props) {
  const [toggleForm, setToggleForm] = useState(true);
  const [loginForm, setLoginForm] = useState(false);
 

  //experimental stuff
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleChange = () => {
    setToggleForm(!toggleForm);
    toggleForm ? setValue(1) : setValue(0);
  };

  const handleLogin = () => {
    setLoginForm(true);
  };

  return (
    <>
      <Login
        openLogin={loginForm}
        setOpenLogin={setLoginForm}
        handleLogin={handleLogin}
      />
      <div className="signup">
        <div className="Leftside">
          <div>
            <div className="DB">
              <Typography sx={style.DB} variant="h4" component="h4">
                Student Management Portal
              </Typography>
              <Typography style={{ color: "#6c757d" }} variant="subtitle">
                A simple tool to manage Student Information and Result. Easy
                result computation, fast database Search & data Analytics.
              </Typography>
              <br />
              <Button onClick={handleLogin} style={{ marginTop: "15px" }} variant="outlined">
                Log In
              </Button>
            </div>
            <div className="DB-image">
              <img className="DBpics" src={signpics} alt="not found" />
            </div>
          </div>
        </div>
        <div className="Textfild">
          <div className="SignUpBanner">
            <div className="boxme">
              <SwitchAccountIcon style={{ fontSize: "5rem" }} />
              <div>
                <Typography
                  style={{ color: "#6c757d", margin: "5px" }}
                  variant="h5"
                >
                  Create your
                </Typography>
                <Chip
                  label={value === 0 ? "student account" : "staff account"}
                />
              </div>
            </div>
            <Switch onClick={handleChange} />
          </div>
          <form className="FormD">
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <StudentsignupComponent value={value} />
              <StaffsignUpComponent value={value} />
            </SwipeableViews>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
