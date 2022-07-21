import './index.css'

const Product = ({ item, getProductName }) => {

  return (
    <>

      <tr>
        <td>{item.name}</td>
        <td>{item.category}</td>
        <td>{item.qty}</td>
        <td>{item.price}</td>
        <td><button className="btn-component" onClick={(e) => {
          document.querySelector(".edit").showModal();
          getProductName(e);
        }}>
          edit</button>
          <button className="btn-component" onClick={(e) => {
            getProductName(e)
            document.querySelector(".delete").showModal();
          }}>delete</button></td>
      </tr>




    </>
  )
}

export default Product;