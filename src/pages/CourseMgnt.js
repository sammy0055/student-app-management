import "../styles/courseMgnt.css";
import Sidebar from "../component/Sidebar";
import Paneltab from "../component/Paneltab";
import Avatar from "@mui/material/Avatar";
import TableCourse from "../component/TableCourse";
import { useContexts } from "../Statemgnt/Context";

function CourseMgnt(props) {
  const [{ user }] = useContexts();
  return (
    <div>
      <Sidebar />
      <div className="NavBarCourse">
        <div className="Profilerbar">
          <h1>Course Managment</h1>
          <div className="AvaterG">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 56, height: 56, marginRight: "15px" }}
            />
            <p>{user.last_name}</p>
          </div>
        </div>
        <Paneltab />
      </div>
      <div>
        <TableCourse />
      </div>
    </div>
  );
}

export default CourseMgnt;
