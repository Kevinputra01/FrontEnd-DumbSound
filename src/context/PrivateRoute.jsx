import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "./UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(UserContext);

  return (
    <>
      <Route {...rest} render={(props) => (state.isLogin ? <Component {...props} /> : <Redirect to="/" />)} />
    </>
  );
};

export default PrivateRoute;
