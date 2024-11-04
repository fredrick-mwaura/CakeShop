import styles from "./Button.module.css";
import PropTypes from "prop-types";
const Button = ({ isOutline, text, icon }) => {
  return (
    <button className={isOutline ? styles.outline_btn : styles.primary_btn}>
      {icon}
      {text}
    </button>
  );
};
Button.propTypes = {
    isOutline: PropTypes.bool,
    text: PropTypes.string.isRequired,
    icon: PropTypes.element,
  };
  Button.defaultProps = {
    isOutline: false,
    icon: null,
  };
export default Button;
