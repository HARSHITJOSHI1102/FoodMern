import React, { useContext, useState } from 'react';
import "./PlaceOrder.css";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    token,
    food_list,
    cartItems,
    url,
    setCartItems
  } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const navigate = useNavigate();

  const placeOrder = async (event) => {
    event.preventDefault();

    if (getTotalCartAmount() === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        ...item,
        quantity: cartItems[item._id]
      }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // Add delivery fee
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: {
          token: token // ✅ OR use Authorization: `Bearer ${token}` if needed
        }
      });

      if (response.data.success) {
        toast.success("Order placed successfully!");
        setCartItems({});
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error("Failed to place order");
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Something went wrong");
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-feilds">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-feilds">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-feilds">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
