import React from 'react'
import "./shopping.css"


const Newitem = () => {

  const newitem=[
    {id :1 , name : "하이볼 센티드 블렌드 오일 키트", price :'39,000원',img :"/img/new1.png"},
    {id :2, name : "바이탈라이징 로즈마리 탄력 크림 50ML", price:'34,200원',img:"/img/new2.png"},
    {id :3, name: "세라믹 시손느 디퓨저 2종(택1)", price:'45,000원',img:"/img/new3.png"},
    {id :4, name:"리드 디퓨저 4종(택1)", price:'26,100원', img:"/img/new4.png"},
    {id:5, name:"세라믹 페탈 디퓨저 & 마인드 풀니스 디퓨징 오일 세트", price:'46,800원',img:'/img/new5.png'},
    {id :6, name:"바이탈라이징 로즈마리 포어 클리어핑 폼 150ML",price:'18,000원',img:"/img/new6.png"},
    {id:7, name:"글로우 비타 오일 인 젤 클렌저 오렌지&네롤리 150ML", price:'27,000원',img:'/img/new7.png'},
    {id:8, name:"서큘레이팅 마사지 크림 주니퍼베리 &레몬", price:'21,600원',img:'/img/new8.png'},
    {id:9, name:"리플레니싱 리브-인 트리트먼트 라벤더 & 패츌리 150ML", price:'20,000원',img:'img/new9.png'}
]

  return (
    <div className='shopping-mall'>
                <h2>New Item</h2>
                <div className='item-grid'>
                    {newitem.map((item)=>(
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

export default Newitem