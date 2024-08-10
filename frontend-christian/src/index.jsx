import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
import {
  NavLink, RouterProvider, createBrowserRouter, Outlet,
} from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

function Nav() {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/test/id1">Test ID1</NavLink></li>
        <li><NavLink to="/test/id2">Test ID2</NavLink></li>
      </ul>
    </nav>
  );
}

// New EC Function
function Layout() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
}

function Welcome() {
  return (
    <div>Welcome</div>
  );
}

function About() {
  return <div>All there is to know about me</div>;
}

function Test() {
  function getData() {
    axios({
      method: 'GET',
      url: '/output',
    })
      .then((response) => {
        const res = response;
        console.log(res);
        return res;
      }).catch((error) => {
        if (error.response) {
          console.log('Error');
        }
      });
  }

  const res = getData();
  return <div>ID: {res}</div>;
}

function FallBack() {
  return <div>URL Not Found</div>;
}

// Doing the EC stuff
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Welcome /> },
      { path: 'about', element: <About /> },
      { path: 'test/:id', element: <Test /> },
      { path: '*', element: <FallBack /> },
    ],
  },
]);

const root = createRoot(document.getElementById('main'));
root.render(<RouterProvider router={router} />);
