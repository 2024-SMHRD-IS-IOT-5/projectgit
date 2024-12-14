import React from 'react'
import "./shopping.css"

const Bestlist = () => {

    const bestitem=[
        {id :1, name: "로즈마리 스칼프 스케일링 샴푸 400ML",price :'24,000원',img:"/img/best1.png"},
        {id :2, name: "로즈마리 헤어 씨크닝 컨디셔너 180ML",price :'14,000원',img:"/img/best2.png"},
        {id :3, name: "로즈마리 루트 인핸서 100ML",price:'16,000원',img:"/img/best3.png"},
        {id :4, name: "수딩 알로에 베라 젤 300ML", price:'11,000원',img:"/img/best4.png"},
        {id :5, name: "바디오일 & 바디 괄사", price:'48,000원', img:"/img/best5.png"},
        {id: 6, name: "글로우 비타 씨 토닝 세럼 오렌지 앤 네롤리", price:'35,000원',img:'/img/best6.png'},
        {id:7,name:"바이탈라이징 로즈마리 탄력 앰플 30ML",price:'35,000원', img:'/img/best7.png'},
        {id:8,name:"바이탈라이징 로즈마리 컨센트레이티드 에센스 100ML",price:'30,000원', img:'/img/best8.png'},
        {id:9,name:"제스티 핸드 솝 그레이프프롯 &탠저린 300ML",price:'16,000원', img:'img/best9.png'},
        {id:10, name:"언버든 스트레스 릴리프 밤", price:'28,000원', img:'img/best10.png'}
    ]
return (
    <div className='shopping-mall'>
                <h2>Best Item</h2>
                <div className='item-grid'>
                    {bestitem.map((item)=>(
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

export default Bestlist