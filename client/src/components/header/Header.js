import React from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import Search from './Search'
import Logo from '../../images/dmLogo.png';
import { useSelector } from 'react-redux';

const Header = () => {
    const { theme } = useSelector(state => state)

    return (
        <div className="header bg-light">
            <nav className="navbar navbar-expand-lg navbar-light 
            bg-light justify-content-between align-middle">

                <Link to="/" className="logo">
                    <img alt='D_Media'
                        src={Logo} 
                        className='navbar-brand text-center p-0 m-1'
                        style={{ filter: `${theme ? 'invert(1)' : 'invert(0)'}`, width:'200px', height:'50px' }}
                        onClick={() => window.scrollTo({top: 0})}
                    />
                    {/* <h1 className="navbar-brand text-uppercase p-0 m-0"
                    onClick={() => window.scrollTo({top: 0})}>
                        D_Media
                    </h1> */}
                </Link>

                <Search />

                <Menu />
            </nav>
        </div>
    )
}

export default Header