import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";  // ✅ Import Redux Provider
import store from "./redux/store";  // ✅ Import your Redux store
import "./index.css";
import App from "./App.jsx";
import "@fontsource/material-icons";
import "@fontsource/outfit";
import "@fontsource/roboto";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>  {/* ✅ Wrap App with Provider */}
      <App />
    </Provider>
  </StrictMode>
);
