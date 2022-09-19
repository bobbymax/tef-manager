/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute, GuestRoute } from "./guards";
import { routes } from "./routes";
import "./App.css";

const App = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        {routes.guest.map((page, i) => (
          <Route
            exact
            key={i}
            path={page.path}
            element={<GuestRoute>{page.component}</GuestRoute>}
          />
        ))}
        {routes.protected.map((page, i) => (
          <Route
            key={i}
            exact
            path={page.path}
            element={<ProtectedRoute>{page.component}</ProtectedRoute>}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default App;
