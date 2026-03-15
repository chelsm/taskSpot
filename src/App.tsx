import "./App.css";
import AppRouter from "./router";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <AppRouter />
    </Router>
    </div>
  );
}

export default App;
