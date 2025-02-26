// importa React Router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// importa i layout
import DefaultLayout from "./components/DefaultLayout";

// importa le pagine
import HomePage from "./route/HomePage";
import AboutPage from "./route/AboutPage";
import PostsPage from "./route/PostsPage";
import AddPostPage from "./route/AddPostPage";
import SinglePostPage from "./route/SinglePostPage";
import NotFoundPage from "./route/NotFoundPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/posts">
            <Route index element={<PostsPage />} />
            <Route path="addpost" element={<AddPostPage />} />
            <Route path="post/:id" element={<SinglePostPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />




        </Route>

      </Routes>
    </BrowserRouter >
  );
}
