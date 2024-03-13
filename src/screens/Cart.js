import React from 'react'
import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import {loadStripe} from '@stripe/stripe-js'
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  const handleRemove = (index)=>{
    dispatch({type:"REMOVE",index:index})
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    const stripe = await loadStripe("pk_test_51OXG5USFVTAtLYeu0c30ADS4A3qHVYJoPWr9ZriVeocO2kpTY5Y3CYKda4JuqZKRqVOhj9tYKXGz423JyUpezs6400nltnkZ3f")
    const body={
      email:userEmail,
      order_data:data
    }
    const headers={
      'Content-Type':'application/json'
    }
    const response = await fetch("https://food-backend-tjsa.onrender.com/api/auth/payment", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: headers,
      body:JSON.stringify(body)
    })
    const { session }=await response.json();
    const {id, url} = session;
    // stripe.redirectToCheckout(url, ()=>{
      
    // })
    // if(url){
    //   window.location.href=url;
    // }
    // var url=sess.url
    // if(sess){
    //   const red=sess.url;
    //   window.location.href=red;
    // }
    const checkout = await stripe.redirectToCheckout({
      sessionId: id,
    });
    // const sessionId = await createCheckoutSession();
  //   const checkout= await stripe.redirectToCheckout({
  //     sessionId: sessionId,
  //     customerEmail: userEmail, // Add the customer's email
  // //customerName: 'John Doe', // Add the customer's name
  // customerAddress: {
  //   line1: '123 Main St',
  //   city: 'City',
  //   postal_code: '12345',
  //   country: 'IN',
  // }})
    
    // if(result.error){console.log(response.error);}
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    // let response = await fetch("https://food-backend-tjsa.onrender.com/api/auth/orderData", {
    //   // credentials: 'include',
    //   // Origin:"http://localhost:3000/login",
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     order_data: data,
    //     email: userEmail,
    //     order_date: new Date().toDateString()
    //   })
    // });
    // if (response.status === 200) {
    //   dispatch({ type: "DROP" })
    // }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><Delete type="button" className="btn p-0" onClick={handleRemove} /> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}
