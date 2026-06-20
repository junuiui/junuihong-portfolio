import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import './index.css'
import RootLayout from './pages/Root';
import HomePage from './pages/Home';
import AboutMePage from './pages/AboutMe';
import ContactPage from './pages/Contact';
import ProjectPage from './components/Project';
import ErrorPage from './pages/Error';
import BlogPage from './components/Blog';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'aboutme',
        element: <AboutMePage />
      },
      {
        path: 'project',
        element: <ProjectPage />
      },
      {
        path: 'blog',
        element: <BlogPage />
      },
      {
        path: 'contact',
        element: <ContactPage />
      },
      {
        path: '*',
        element: <ErrorPage />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App