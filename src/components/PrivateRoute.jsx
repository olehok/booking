import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useWithLng from "../hooks/useWithLng";

export default function PrivateRoute({ children }) {
  const { lng } = useWithLng();
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  // return children;
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to={`/${lng}/login`} replace />;
  }
  
  return children;
}
