import React, { useContext, useState } from 'react'
import { CartContext, CurrencyContext, UserContext } from '../Context'
import axios, { formToJSON } from 'axios';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const baseUrl = 'https://suresh2988.pythonanywhere.com/api';
// const baseUrl = 'http://127.0.0.1:8000/api';
function ConfirmOrder() {
  const [ConfirmOrder, SetConfirmOrder] = useState(false);
  const [PayMethod, SetPayMethod] = useState('');
  const [orderId, SetorderId] = useState('');
  const [orderAmount, SetorderAmount] = useState(0);

  const userContext = useContext(UserContext);
  const { CurrencyData } = useContext(CurrencyContext);

  const { cartData, setCartData } = useContext(CartContext);
  if (userContext == null) {
    window.location.href = '/customer/login'
  } else {
    if (ConfirmOrder == false) {
      addOrderInTable();
    }
  }

  function addOrderInTable() {
    const customerId = localStorage.getItem('customer_id');
    var previousCart = localStorage.getItem('cartData');
    var cartJson = JSON.parse(previousCart);
    var total_amount = 0;
    var total_usd_amount = 0;
    cartJson.map((cart, index) => {
      total_amount += parseFloat(cart.product.price);
      total_usd_amount += parseFloat(cart.product.usd_price);
    })
    const formData = new FormData();
    formData.append('customer', customerId);
    formData.append('total_amount', total_amount);
    formData.append('total_usd_amount', total_usd_amount);

    //submit data
    axios.post(baseUrl + '/orders/', formData)
      .then(function (response) {
        console.log(response)
        var orderId = response.data.id;
        orderItems(orderId);
        if (CurrencyData == 'usd') {
          SetorderAmount(response.data.total_usd_amount);
        } else {
          SetorderAmount(response.data.total_usd_amount);
        }
        SetorderAmount(response.data.total_amount);
        SetorderId(orderId);
        SetConfirmOrder(true);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  function updateOrderStatus(order_status) {
    axios.post(baseUrl + '/update-order-status/' + orderId + '/')
      .then(function (response) {
        window.location.href = '/order/success';
      })
      .catch(function (error) {
        console.log(error);
        window.location.href = '/order/failure';
      })
  }

  function orderItems(orderId) {
    var previousCart = localStorage.getItem('cartData');
    var cartJson = JSON.parse(previousCart);
    if (cartJson != null) {
      cartJson.map((cart, index) => {
        const formData = new FormData();
        formData.append('order', orderId);
        formData.append('product', cart.product.id);
        formData.append('qty', 1);
        formData.append('price', cart.product.price);
        formData.append('usd_price', cart.product.usd_price);

        console.log(cartJson, index);
        axios.post(baseUrl + '/orderitems/', formData)
          .then(function (response) {
            console.log(response);
            cartJson.splice(0, 1);
            console.log(cartJson);
            localStorage.setItem('cartData', JSON.stringify(cartJson));
            setCartData(cartJson);
          })
          .catch(function (error) {
            console.log(error);
          });

      });
      //   var previousCartUpdated=localStorage.getItem('cartData');
      // var cartJsonUpdated=JSON.parse(previousCart);
      //   setCartData(cartJsonUpdated);
    }
  }

  function changePaymentMethod(payMethod) {
    SetPayMethod(payMethod);
  }

  function PayNowButton() {
    if (PayMethod != '') {
      changePaymentMethod(PayMethod);
    } else {
      alert('Select Payment Method')
    }
    changePaymentMethod(PayMethod);
  }
  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col-6 offset-3'>
          <div className='card py-3 text-center'>
            <h3><i className='fa fa-check-circle text-success'></i>Your order has been confirmed</h3>
            <h5>ORDER ID:{orderId}</h5>
          </div>
          <div className='card p-3 mt-4'>
            <form>
              {
                CurrencyData == 'usd' &&
                <>
                  <div className='form-group'>
                    <label>
                      <input type='radio' onChange={() => changePaymentMethod('paypal')} name='payMethod' /> PayPal
                    </label>
                  </div>
                  <div className='form-group'>
                    <label>
                      <input type='radio' onChange={() => changePaymentMethod('stripe')} name='payMethod' /> Stripe
                    </label>
                  </div>
                </>
              }
              {
                CurrencyData != 'usd' &&
                <>
                  <div className='form-group'>
                    <label>
                      <input type='radio' onChange={() => changePaymentMethod('razorpay')} name='payMethod' /> Razorpay
                    </label>
                  </div>
                  {/* <div className='form-group'>
                <label>
                  <input type='radio' onChange={() => changePaymentMethod('paytm')} name='payMethod' /> Paytm
                </label>
              </div> */}
                </>
              }


              <button type='button' onClick={PayNowButton} className='btn btn-sm btn-success mt-3'>Next</button>
            </form>
            {/* AR9DpJ_QHyZKij4N9FQt9DucClaU2YwqkPx6jE7P7-7f7hwKq8gJAzDxco89LoVmc6tQ3xrgG0VFzdVY */}
            {
              PayMethod == 'paypal' &&

              <PayPalScriptProvider options={{ 'client-id': 'AfOkDk5Ou_XokRxfxq6WQj88y5KcXqhwo0uAgPXfXrvzmzvP1poS7oOPVvXQ_ED4SQykLeR4_FUn__sV' }}>
                <PayPalButtons className='mt-3'
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            currency_code: 'USD',
                            value: orderAmount,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      const name = details.payer.name.given_name;
                      alert(`Transaction completed by ${name}`);
                      updateOrderStatus(true);
                      localStorage.removeItem('cartData');
                      // var cartString = JSON.stringify({'':''});
                      // localStorage.setItem('cartData','');
                    });
                  }}
                />
              </PayPalScriptProvider>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmOrder
