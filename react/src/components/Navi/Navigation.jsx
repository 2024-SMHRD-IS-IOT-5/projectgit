import React from 'react'
import {useNavigate} from 'react-router-dom'
import "./Navigation.css"

const Navigation = () => {
    const navigate=useNavigate()


return (
    <div className='footer-toolbar'>
            {/* Tool */}
            <div className='toolbar-item' onClick={()=>navigate("/shopping")}>
                <img src="/emoji/sale.png" alt="sale" className='icon'/>
                <span>Sale</span>
            </div>
            {/* Main */}
            <div className='toolbar-item' onClick={()=>{navigate("/main")}}>
                <img src="/emoji/main-icon.png" alt="Main icon" className='icon'/>
                <span>Main</span>
            </div>
            {/* Setting */}
            <div className='toolbar-item' onClick={()=>{navigate("/setting")}}>
                <img src="/emoji/setting-icon.png" alt="Setting Icon" className='icon'/>
                <span>Setting</span>
            </div>
        </div>
)
}

export default Navigation