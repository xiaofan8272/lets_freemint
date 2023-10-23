import "./App.css";
import Home from "./Home";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="App">
      <Home />
      <Toaster  position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
