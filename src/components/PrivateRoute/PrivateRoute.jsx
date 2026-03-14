import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useWithLng from "../../hooks/useWithLng";

export default function PrivateRoute({ children }) {
  const { lng } = useWithLng();
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to={`/${lng}/login`} replace />;
  }
  
  return children;
}
