import HomeWrapper from "./wrappers/HomeWrapper";
import ChartComponent from "./components/ChartComponent";
import { createBrowserRouter, RouterProvider } from "react-router";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeWrapper />,
      children: [
        {
          path: "/chart",
          element: <ChartComponent />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
