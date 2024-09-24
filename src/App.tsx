import { RouterProvider } from "react-router-dom";
import "./App.css";
import "./ui/variables.scss";
import useCustomRouter from "./routing/CustomRouter";

function App() {
  const routes = useCustomRouter();

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
