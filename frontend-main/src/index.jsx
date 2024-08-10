import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
import {
  useParams, RouterProvider, createBrowserRouter, Outlet,
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserQuestions from './pages/UserQuestions';
import Recruiting from './pages/Recruiting';
import LandingPage from './pages/LandingPage';
import Endorsements from './pages/Endorsements';
import UserProfile from './pages/UserProfile';

function Layout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

// function Welcome() {
//   return (
//     <div>Welcome</div>
//   );
// }

function About() {
  return <div>All there is to know about me</div>;
}

function Test() {
  const { id } = useParams();
  return <div>ID: {id}</div>;
}

function FallBack() {
  return <div>URL Not Found</div>;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'user-questionnaire', element: <UserQuestions /> },
      { path: 'recruiting', element: <Recruiting /> },
      { path: 'endorsements', element: <Endorsements /> },
      { path: 'profile', element: <UserProfile /> },
      // { path: 'landing-page', element: <Suspense fallback={<div>Loading...</div>}><LandingPage /></Suspense> },
      { path: 'about', element: <About /> },
      { path: 'test/:id', element: <Test /> },
      { path: '*', element: <FallBack /> },
    ],
  },
]);

const root = createRoot(document.getElementById('main'));
root.render(<RouterProvider router={router} />);
