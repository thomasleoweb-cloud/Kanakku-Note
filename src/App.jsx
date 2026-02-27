import HomeWrapper from "./wrappers/HomeWrapper"
import { createBrowserRouter, RouterProvider } from "react-router"

const App = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomeWrapper />
        }
    ])

  return (
    <RouterProvider  router={router} />
  )
}

export default App