import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';
import { lazy, Suspense } from 'react';

const BlogPage = lazy(() => import('./pages/Blog'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          // { index: true, element: <BlogPage />, loader: postsLoader },
          {
            index: true,
            element: (<Suspense fallback={<p>Loadking...</p>}><BlogPage /></Suspense>),
            loader: () => import('./pages/Blog').then(module => module.loader()) 
          },
          { path: ':id', element: <PostPage />, loader: postLoader },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
