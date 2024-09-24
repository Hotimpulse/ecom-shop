import { RouterProvider } from "react-router-dom";
import "./App.css";
import "./ui/variables.scss";
import useCustomRouter from "./routing/CustomRouter";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  const routes = useCustomRouter();

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={routes} />
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
    </>
  );
}

export default App;
