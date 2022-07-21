import React from 'react'
import { useState, useEffect } from 'react';
import './index.css'
import Product from '../../model/product';
export const Dialog = (isOpen,) => {

  let name = '';
  let price = '';
  let quantity = '';
  let categoryVal = ''

  const productVal = new Product(name, categoryVal, quantity, price);

  const [category, setCategories] = useState([]);

  useEffect(() => {
    const result = fetch("http://localhost:8080/category/list").then(resp => resp.json().then(sup => setCategories(sup[0].category)))

  }, [category])

  function takeInput() {
    productVal.name = document.querySelector('#productName').value;
    productVal.price = document.querySelector('#price').value;
    productVal.qty = document.querySelector('#qty').value
    productVal.category = document.querySelector('#category').value;
  }

  function addProduct(e) {
    e.preventDefault();
    fetch(" http://localhost:8080/product/add", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(productVal)
    }).then((res) => res.json().then(res => {
      console.log(res)
      document.querySelector(".add-product-form").close()
    }))

  }

  return (
    <>
      <dialog className="add-product-form">
        <h2>Add Product</h2>
        <button className="btn--close" onClick={() => { document.querySelector(".add-product-form").close() }}><span>&#10006;</span></button>
        <form onSubmit={addProduct}>
          <input type="text" id="productName" name="ProductName" placeholder="Product Name" required />
          <select name="Category" id="category" placeholder="Category" >
            {
              category.map((item) => {
                return <option key={item} value={item}>{item}</option>
              })
            }
          </select>
          <input type="number" id="price" name="price" placeholder="Price" required />
          <input type="number" id="qty" name="qty" placeholder="Quantity" required />
          <button type="submit" onClick={() => {
            takeInput()
          }}>Add Product</button>
        </form>
      </dialog>
      <dialog className='delete-category-form' >
        <form >
          <p>Select Category to Delete</p>
          <select name="Category" id="category" placeholder="Category">
            {
              category.map((item) => {
                return <option key={item} value={item}>{item}</option>
              })
            }
          </select>
          <button onClick={(e) => {
            e.preventDefault();
          }}>delete</button>
          <button onClick={(e) => {
            e.preventDefault();
            document.querySelector(".delete-category-form").close();
          }}>Cancel</button>

        </form>
      </dialog>

    </>





  )
}

