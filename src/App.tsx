import "./App.css";
import "./ui/variables.scss";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import RouterWithRoutes from "./routing/RouterWithRoutes";
import UserState from "./util/UserState";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <UserState />
      <RouterWithRoutes />
      <Toaster
        position="bottom-right"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontFamily: "Jost, sans-serif",
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
          },
        }}
      />
    </Provider>
  );
}

export default App;
