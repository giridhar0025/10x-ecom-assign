import React, {useState, useEffect} from 'react'



const Products = () => {

    const [productsData, setProductsData] = useState([])


    useEffect(() => {
        fetch('https://api.npoint.io/74526212daacbe4a8032')
            .then(res=>res.json())
            .then(data=> {
                console.log(data.item)
                setProductsData(data.item)
            })
    }, [])

    console.log(productsData)



  return (
    <>
       <div className="Products-main-container">
           <div className="Product-header">
               <h2>Available Products</h2>
           </div>
           
           <div className="products-div">
                {
                    productsData.map((item, key) => {
                        return (
                            <>
                               <div className="Product-card">
                                    <img src={item.item_image} alt=""></img>
                               </div>
                            </>
                        )
                    })
                }
           </div>
       </div>
    </>
  )
}

export default Products