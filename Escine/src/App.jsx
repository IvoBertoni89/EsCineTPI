// App.js

import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthenticationContextProvider } from './components/sevices/authentication/autentication.context'; // Asegúrate de ajustar la ruta de importación según tu estructura

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import Protected from './components/protected/Protected';
import Landing from './components/landing/Landing';
import BadRequest from './components/badRequest/BadRequest';

function App() {
    const router = createBrowserRouter([
        { path: '/', element: <Landing /> },
        { path: '/login', element: <Login /> },
        {
            path: '/dashboard',
            element: (
                <Protected>
                    <Dashboard />
                </Protected>
            ),
        },
        { path: '/404', element: <BadRequest /> },
        { path: '*', element: <Navigate to="/404" /> },
    ]);

    return (
        <RouterProvider router={router}>
            <AuthenticationContextProvider>
                <div className="App">
                    {/* Aquí va el contenido de tu aplicación */}
                </div>
            </AuthenticationContextProvider>
        </RouterProvider>
    );
}

export default App;
