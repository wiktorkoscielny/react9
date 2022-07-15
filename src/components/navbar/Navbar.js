import React, {useState} from 'react'

// styles
import './Navbar.css'

// icons
import { AiOutlineCalendar } from 'react-icons/ai'
import { AiOutlineHome } from 'react-icons/ai'
import { TbMath } from 'react-icons/tb'

const Navbar = () => {
    const [activeNav, setActiveNav] = useState('#')
  return (
        <div className='navigation'>
            <ul>
                <li className={activeNav === '#calendar' ? 'active' : ''}>
                    <a href='#calendar' onClick={() => setActiveNav('#calendar')} >
                        <span className='icon'><AiOutlineCalendar /></span>
                        <span className='text'>Calendar</span>
                    </a>
                </li>
                <li className={activeNav === '#' ? 'active' : ''}>
                    <a href='#' onClick={() => setActiveNav('#')} >
                        <span className='icon'><AiOutlineHome /></span>
                        <span className='text'>Home</span>
                    </a>
                </li>
                <li className={activeNav === '#count' ? 'active' : ''}>
                    <a href='#count' onClick={() => setActiveNav('#count')}>
                        <span className='icon'><TbMath /></span>
                        <span className='text'>Counter</span>
                    </a>
                </li>
                <div className='indicator'></div>
            </ul>

        </div>
  
  )
}

export default Navbar