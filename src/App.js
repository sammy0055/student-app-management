import "./App.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseMgnt from "./pages/CourseMgnt";
import SignUp from "./pages/SignUp";
import Result from "./pages/Result";

const queryClient = new QueryClient();

function App(props) {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App-css">
          <Routes>
          <Route path="/result" element={<Result />} />
            <Route path="/courses" element={<CourseMgnt />} />
            <Route path="/" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
