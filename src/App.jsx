import "./App.css";
import AppProvider from "./providers/AppProvider";
import AppRoutes from "./routers/AppRoutes";

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
