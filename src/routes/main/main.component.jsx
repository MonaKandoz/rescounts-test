import { Link } from 'react-router-dom';
import './main.styles.css';

const Main = ()=>{
    return (
      <div className="main">
        <Link className="main-link" to="/sign-in">
          Sign-in
        </Link>
        <Link className="main-link" to="/sign-up">
          Sign-up
        </Link>
      </div>
    );
}

export default Main;