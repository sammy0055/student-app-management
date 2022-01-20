import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5001/student-management-app-329f1/us-central1/api",
});

//"http://localhost:5001/student-management-app-329f1/us-central1/api"
//"http://localhost:3001"

export default instance;
