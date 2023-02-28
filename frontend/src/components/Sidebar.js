import React from 'react'
import { Link} from 'react-router-dom';
import './Sidebar.css'

export default function SideBar() {
  return (
    <>

      <div className='wrapper '>
<div className="sidebar bg-light">
        <h2>Sidebar</h2>
        <ul>
            <li><a href="#"><i className="fas fa-home"></i><Link to = {'/'}>Home</Link></a></li>
            <li><a href="#"><i className="fas fa-user"></i><Link to = {'/questionBanks'}>QuestionBank</Link></a></li>
            <li><a href="#"><i className="fas fa-user"></i><Link to = {'/questionBanks'}>Exam</Link></a></li>
        </ul> 
     </div>
    </div>
    </>
  )
}
