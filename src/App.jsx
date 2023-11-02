import "./App.css";
import Dashboard from "./features/dashboard/Dashboard";
import LandingPage from "./components/LandingPage";
import shallow from "zustand/shallow";
import useStore from "./stores/useStore";

const getState = (state) => [state.currentRole];

function App() {
  const [currentRole] = useStore(getState, shallow);
  return <>{currentRole ? <Dashboard /> : <LandingPage />}</>;
}

export default App;
