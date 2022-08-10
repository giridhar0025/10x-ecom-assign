import React, { useEffect, useState } from 'react'
import Pagination from './Pagination';
import "./style.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function MyVerticallyCenteredModal(props) {

  console.log(props)



  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.itemData.category}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body-div">
          <img style={{width: "100px"}} src={props.itemData.image}></img>
          <div className="modal-body-des">
            <span><strong>Description :</strong>{props.itemData.description}</span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}



const Product = () => {

  
    const showPerPage = 10;
    const [pagination , setpagination] = useState({
        start : 0,
        end : showPerPage
    })

    const [allProductsData, setAllProductsData] = useState([])
    const [productsData,setProductsData] = useState([])
    const [productRefresh, setProductRefresh] = useState(true)
    const [modalShow, setModalShow] = useState(false);
    const [dataSend, setDataSend] = useState([])

  

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=> {
              setAllProductsData(data)
                setProductsData(data)
            })
    }, [productRefresh])

   

    const onPaginationChange = (start,end)=>{
        setpagination({start : start,end : end})
    }
    

    const handleFilter = (e) => {
      if (e.target.value === "all") {
        setProductRefresh(!productRefresh)
      } else {      
        const newData = allProductsData.filter((item) => {
          return item.category.includes(e.target.value)
        })
        setProductsData(newData)
      }
    }

    const handleDataSend = (item) => {
      setDataSend(item)
    }


  return (
    <div>
      <div className='header'>
        <h1>Available Products</h1>
      </div>
      <div>
      <div className="filter-categories">
           <label for="categories">Choose a Category:</label>
              <select onChange={(e) => handleFilter(e)}>
                <option value="all">All</option>
                <option value="electronics">Electronics</option>
                <option value="men's clothing">men's clothing</option>
                <option value="jewelery">jewelery</option>
                <option value="women's clothing">women's clothing</option>
              </select>
           </div>
           <div className="product-cards-container">
        {productsData.slice(pagination.start , pagination.end).map((item)=>{
            return (
              <>
                 <div onClick={() => handleDataSend(item)}><img variant="primary" onClick={() => setModalShow(true)} className="product-card" src={item.image} alt=""></img></div>  
                   <MyVerticallyCenteredModal
                   show={modalShow} itemData={dataSend}
                   onHide={() => setModalShow(false)}
                 />
              </>
            )
        })}
        </div>
      </div>
      <div className='pagination'>
        <Pagination showPerPage ={showPerPage} total = {productsData.length} onPaginationChange = {onPaginationChange}/>
      </div>
    </div>
  )
}

export default Product
