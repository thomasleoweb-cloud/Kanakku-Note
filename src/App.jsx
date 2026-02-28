import HomeWrapper from "./wrappers/HomeWrapper";
import ChartComponent from "./pages/ChartComponent"
import Content from "./pages/Content";
import Filters from "./pages/Filters";
import { createBrowserRouter, RouterProvider } from "react-router";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeWrapper />,
      children: [
        {
          path: "",
          element: <Content />,
        },
        {
          path: "chart",
          element: <ChartComponent />,
        },
        {
          path: "filters",
          element: <Filters />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
