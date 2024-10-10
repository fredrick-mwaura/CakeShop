import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Icon = ({ icon, size, color = "black" }) => {
  return <FontAwesomeIcon icon={icon} size={size} style={{ color }} />;
};

Icon.propTypes = {
  icon: PropTypes.object.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
};

export default Icon;
