import { Outlet, Link } from 'react-router-dom';
import {ReactComponent as Logo} from '../../assests/rescounts logoo events new-01.svg';
import './home.styles.css';

const Home = ()=>{
    return (
      <div className="page-container">
        <Link to="/">
            <Logo className='logo' />
        </Link>

        <Outlet />
        
        <div className="rights">@2022 Rescounts All rights reserved</div>
      </div>
    );
}

export default Home;