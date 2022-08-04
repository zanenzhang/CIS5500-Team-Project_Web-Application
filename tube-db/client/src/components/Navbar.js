import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import {BsFillPlayBtnFill, BsFillPersonFill, BsBookmarkHeartFill} from 'react-icons/bs';
import * as IoIcons from 'react-icons/io';
import { MdOutlineOndemandVideo } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { IconContext } from 'react-icons';

const SidebarData = [ 
  {
    title: 'Videos',
    path: '/trendingvideos',
    icon: < BsFillPlayBtnFill />,
    cName: 'nav-text'
  },
  {
    title: 'Channels',
    path: '/topchannels',
    icon: < MdOutlineOndemandVideo />,
    cName: 'nav-text'
  },
  {
    title: 'Favorites',
    path: '/savedvideos',
    icon: < BsBookmarkHeartFill />,
    cName: 'nav-text'
  },
  {
    title: 'Login',
    path: '/login',
    icon: < BsFillPersonFill />,
    cName: 'nav-text'
  },
  
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];

function Navbar() {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navigation'>
        <nav className='nav-menu'>
          <ul className='nav-menu-items'>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;