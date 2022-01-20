//import { useContexts } from "../Statemgnt/Context";
import Sidebar from "../component/Sidebar";
import Paneltab from "../component/Paneltab";
import "../styles/result.css";
import signpics from "../assets/signpics.jpg";
import { Typography, Avatar } from "@mui/material";
import Tableresult from "../component/Tableresult";

const style = {
  data: {
    margin: "10px",
  },
};

function Result(props) {
  return (
    <div>
      <Sidebar />
      <div className="ResultBanner">
        <h1>Result Management</h1>
        <div className="Student-cont">
          <div className="StudentData">
            <Typography sx={style.data} variant="body1">
              mat no
            </Typography>
            <Typography sx={style.data} variant="body1">
              sammy
            </Typography>
            <Typography sx={style.data} variant="body1">
              class
            </Typography>

            <Typography sx={style.data} variant="body1">
              department
            </Typography>
          </div>
          <div>
            <Avatar
              alt="Remy Sharp"
              src={signpics}
              sx={{ width: 56, height: 56, marginRight: "15px" }}
            />
          </div>
        </div>
      </div>
      <Paneltab />
      <div><Tableresult /></div>
    </div>
  );
}

export default Result;
