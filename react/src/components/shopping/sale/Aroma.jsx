import React from 'react'
import "./shopping.css"


const Aroma = () => {

  const aroma=[
    { id :1, name : "도테라 샌달우드 5ml 오일", price : '99,000원', img:"/emoji/oil1.png" },
    { id :2, name : "도테라 텐저린 15ml 오일", price :'24,400원' , img:"/emoji/oil2.png"},
    { id :3, name : "도테라 수퍼민트 15ml 오일", price :'40,000원', img:"/emoji/oil3.png"},
    { id :4, name : "도테라 세레니티 이지에어 15ml 오일", price:'36,000원',img:"/emoji/oil4.png"},
    { id :5, name : "도테라 오렌지 페퍼민트 15ml 오일", price:'16,000원', img:'/emoji/oil5.png'},
    {id:6, name:"불가리아 클림텍 라벤더 불가리안 유기농 에센셜오일",price:'19,000원',img:'/emoji/oil6.png'},
    {id:7, name:"보타닉 라벤더 프렌치 에센셜 오일 10ML", price:'6,500원',img:'/emoji/oil7.png'},
    {id:8, name:"노이몬트 라벤더 유기농 에센셜 오일 10ML",price:'33,000원',img:'/emoji/oil8.png'},
    {id:9, name:"앱솔루트 라벤더 HA 유기농 에센셜 오일 10ML", price:'35,000원',img:'/emoji/oil9.png'}
]


  return (
    <div className='shopping-mall'>
                  <h2>Aroma Oil</h2>
                  <div className='item-grid'>
                      {aroma.map((item)=>(
                          <div className='item-card' key={item.id}>
                              <img src={item.img} alt={item.name} className='item-image'/>
                              <p className='item-name'>{item.name}</p>
                              <p className='item-price'>{item.price}</p>
                          </div>
                      ))}
                  </div>
      </div>
  )
}

export default Aroma