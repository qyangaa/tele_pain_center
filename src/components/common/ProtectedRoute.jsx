import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const curUid = useSelector((state) => state.firebase.auth.uid);
  console.log({ curUid });
  return (
    <Route
      {...rest}
      render={(props) => {
        return curUid ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
}
