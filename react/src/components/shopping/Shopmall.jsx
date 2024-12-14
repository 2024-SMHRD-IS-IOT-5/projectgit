import React, { useRef, useState } from 'react'
import Aroma from './sale/Aroma'
import Bestitem from './sale/Bestlist'
import Newitem from './sale/Newitem'
import "./sale.css"

const Shoppingmall = () => {

    const [tab,setTab]=useState('best')

    const searchRef = useRef();

    const searchBtn=()=>{
        console.log(searchRef.current.value)

    }

return (
    
    <div>
        <header className='header'>
            <div className='header-container'>
                <div className='search-bar'>
                    <div className='search-icon'>
                        <img src="/emoji/search.png" alt="search" onClick={searchBtn}/>
                    </div>
                    <input type='text' placeholder='2024 마지막  빅타임 세일 찬스' ref={searchRef}/>            
                </div>
                <div className='cart-icon'>
                    <img src="/emoji/cart.png" alt="cart"/>
                </div>
            </div>
            
        </header>
        <div className='main-image'>
            <img src="./emoji/aroma-pic.png" alt='cummercial'/>
        </div>
        <div className='main-icons'>
            <div className='toolbar-item' onClick={()=>setTab("best")}  >
                <img src="/emoji/trophy.png" alt="water" className='icon'/>
                <span>Best Item</span>
            </div>
            <div className='toolbar-item' onClick={()=>setTab("aroma")}>
                <img src="./emoji/aroma.png" alt="watertemp" className='icon'/>
                <span>Aroma Oil</span>
            </div>
            <div className='toolbar-item'  onClick={()=>setTab("new")}>
                <img src="./emoji/new.png" alt='fold'  className='icon' />
                <span>New Item</span>
            </div>
        </div>

        <div>
            
            {tab==='best' &&< Bestitem/>}
            {tab==='aroma' &&< Aroma/>}
            {tab==='new' &&< Newitem/>}
        </div>

        
        
        
    </div>
)
}

export default Shoppingmall