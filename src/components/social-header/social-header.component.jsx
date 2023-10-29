import { Link } from "react-router-dom";
import "./social-header.styles.css";

const SocialHeader = ({ headerText, loginLink, className }) => {
  return (
    <>
      <div className={className}>
        {headerText}
        <span className="required">* Required</span>
      </div>
      {loginLink && (
        <div className="have-account">
          Already have account? <Link to="/sign-in">Login</Link>
        </div>
      )}
      <div className="social">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <hr />
    </>
  );
};

export default SocialHeader;
