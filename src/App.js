import { createBrowserRouter, RouterProvider } from "react-router-dom";

// If qwe import Blog it will be eager load
//import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from "./pages/Home";
import PostPage, { loader as postLoader } from "./pages/Post";
import RootLayout from "./pages/Root";
import { lazy, Suspense } from "react";

// to use lazy load:
const BlogPage = lazy(() => import("./pages/Blog"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "posts",
        children: [
          //Lazy
          {
            index: true,
            element: (<Suspense fallback={<p>Loading...</p>}><BlogPage /></Suspense>),
            loader: () =>
              import("./pages/Blog").then((module) => module.loader()),
          },
          //Eager { index: true, element: <BlogPage />, loader: postsLoader },
          { path: ":id", element: <PostPage />, loader: postLoader },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
