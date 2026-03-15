import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useWithLng from "../../hooks/useWithLng";

export default function PrivateRoute({ children }) {
  const { lng } = useWithLng();
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to={`/${lng}/login`} replace />;
  }
  
  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
