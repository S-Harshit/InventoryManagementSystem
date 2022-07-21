import { Dialog } from "../../components/dialog"
import Product from "../../components/product"
import "./index.css"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const Dashboard = () => {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const product = fetch('http://localhost:8080/product/list').then(response => response.json().then(data => ({ data: data, status: response.status }))).then(res => setProducts(res.data))
    }
    else {
      navigate('/');
    }
    // setInterval(() => {
    //   const product = fetch('http://localhost:8080/product/list').then(response => response.json().then(data => ({ data: data, status: response.status }))).then(res => setProducts(res.data))
    //   console.log(product)
    // }, 50000)
  }, [products])


  function deleteItem() {
    fetch("http://localhost:8080/product/delete", {
      method: 'POST',
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify({ name: window.productName })
    }).then(res => res.json().then(res => {
      console.log(res)
    }
    ))




  }

  function getProductName(e) {
    const productArray = e.target.parentElement.parentElement.innerHTML.split("<td>")
    window.productName = productArray[1].slice(0, -5)
    window.productCategory = productArray[2].slice(0, -5)
    window.productQty = Number(productArray[3].slice(0, -5))
    window.productPrice = Number(productArray[4].slice(0, -5))

  }

  function editProductName() {
    fetch("http://localhost:8080/product/update", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ name: window.productName, qty: window.productQty, price: window.productPrice })
    }).then(res => res.json().then(res => {
      console.log(res)
    }))

    fetch('http://localhost:8080/product/list').then(response => response.json().then(data => ({ data: data, status: response.status }))).then(res => setProducts(res.data))

    document.querySelector(".edit").close()

  }

  function addCategory() {
    fetch(" http://localhost:8080/category/add", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ category: window.Category })
    }).then((res) => res.json().then(res => console.log(res)))
    document.querySelector('.add-category-form').close();
  }


  function deleteCategory() {

  }

  return (
    <>
      <h2>
        Products
      </h2>
      <button className="btn-add" onClick={() => {
        document.querySelector('.add-product-form').showModal();
      }
      }>Add Product</button>
      <button className="btn-add category" onClick={() => {
        document.querySelector('.add-category-form').showModal();
      }
      }>Add Category</button>

      {/* <button type="submit" className="delete-category-btn" onClick={() => {
        document.querySelector('.delete-category-form').showModal();
      }}>delete Category</button> */}
      <table className="products">
        <tr>
          <th>Product Name</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Options</th>
        </tr>
        <tbody className='container--product'>
          {/* <div className="products-table"> */}
          {products.map(item => {
            return <Product key={item.name} item={item} getProductName={getProductName} />
          })}
        </tbody>
        {/* </div> */}
      </table>

      <dialog className="edit">
        <form onSubmit={(e) => {
          e.preventDefault()
        }}></form>
        {/* <h2>{window.productName}</h2> */}
        <h3>Change Quantity</h3>
        <input required placeholder="Quantity" id="edit-qty" type="number" defaultValue={window.productQty} onChange={(e) => {
          window.productQty = Number(e.target.value)
        }} />
        <h3>Change Price</h3>
        <input required placeholder="Price" id="edit-price" type="number" defaultValue={window.productPrice} onChange={(e) => {
          window.productPrice = Number(e.target.value)
        }} />
        <button className="btn-component" type="submit" onClick={() => {
          window.qty = document.querySelector("#edit-qty").value
          window.price = document.querySelector('#edit-price').value
          editProductName();
          window.qty = 0;
          window.price = 0;
        }}>Confirm</button>
        <button className="btn-component" onClick={() => document.querySelector(".edit").close()}>Cancel</button>
      </dialog>

      <dialog className="delete">
        <p>Are you sure you want to Delete?</p>
        <button className="btn-component" onClick={(e) => {
          deleteItem()
          document.querySelector(".delete").close()
        }
        }>Confirm</button>
        <button className="btn-component" onClick={() => document.querySelector(".delete").close()}>cancel</button>
      </dialog>

      <dialog className="add-category-form">
        <form onSubmit={(e) => {
          e.preventDefault();

        }}>
          <input required onChange={(e) => {
            window.Category = e.target.value;
          }} type="text" placeholder="Category" />
          <button type="submit" onClick={() => {
            addCategory();
          }}>Add</button>
          <button onClick={() => { document.querySelector(".add-category-form").close() }}>Cancel</button>
        </form>
      </dialog>



      <Dialog />
    </>
  )
}

export default Dashboard;