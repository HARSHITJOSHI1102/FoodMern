import React, { useContext, useState } from 'react';
import "./PlaceOrder.css";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems } = useContext(StoreContext);
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

  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone); // Optional phone validation
  const validateZipcode = (zipcode) => /^[0-9]{5}$/.test(zipcode); // Optional zipcode validation

  const placeOrder = async (event) => {
    event.preventDefault();

    // Check if cart is empty
    if (getTotalCartAmount() === 0) {
      toast.error("Your cart is empty! Please add some items.");
      return;
    }

    // Validate phone number
    if (!validatePhone(data.phone)) {
      toast.error("Invalid phone number!");
      return;
    }

    // Validate zipcode
    if (!validateZipcode(data.zipcode)) {
      toast.error("Invalid zipcode!");
      return;
    }

    // Prepare order items data
    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({ ...item, quantity: cartItems[item._id] }));

    // Prepare the order data object
    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // Adding delivery fee of 2
    };

    try {
      // Call the backend API to place the order
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { Authorization: `Bearer ${token}` }, // Send the JWT token in the Authorization header
      });

      // Check if order placement is successful
      if (response.data.success) {
        toast.success("Order placed successfully!");

        // Clear the cart in the frontend context
        setCartItems({}); // Reset the cart in the context
        localStorage.removeItem('cartData'); // Optionally clear cart data in localStorage (if used)

        // Redirect after 1 second
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error("Failed to place order");
      }
    } catch (error) {
      console.error("Order error:", error);

      // Show the error message from the backend, if available
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
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
          <button type='submit'>{getTotalCartAmount() === 0 ? "Add Items" : "Proceed to Payment"}</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
