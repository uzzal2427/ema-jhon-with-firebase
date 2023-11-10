import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { authContext } from '../AuthProvider/AuthProvider';

const Header = () => {
    const { logOut, user } = useContext(authContext);

    const handleLogOut = ()=>{
        logOut()
        .then(()=>{})
        .catch(error =>{
            console.log(error.message);
        })
    }

    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to={"/"}>Shop</Link>
                <Link to={"/order"}>Oeder</Link>
                <Link to={"/inventory"}>Inventory</Link>
                <Link to={"/login"}>Login</Link>
                <Link to={"/singup"}>Sing up</Link>
                {
                    user && <span className='text-amber-400 px-2'>
                        Hello {user.email}
                        <button onClick={handleLogOut} className='text-amber-400 pl-3'>sing Out</button>
                    </span>
                }

            </div>
        </nav>
    );
};

export default Header;