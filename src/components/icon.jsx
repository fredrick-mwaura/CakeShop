import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Icon = ({ icon, size, color = "black", onClick = () => {} }) => {
  return <FontAwesomeIcon icon={icon} size={size} style={{ color }} onClick={onClick} className="iconn"/>;
};

Icon.propTypes = {
  icon: PropTypes.object.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Icon;
