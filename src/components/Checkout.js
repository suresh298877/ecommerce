import { Link } from 'react-router-dom';
import logo from './logo.svg';
import { useContext, useState } from 'react';
import { CartContext, CurrencyContext } from '../Context';

function Checkout(props) {
    var { cartData, setCartData } = useContext(CartContext);
    if(cartData==null){
        cartData=[];
    }
    // const [cartButtonClickStatus, setCartButtonClickStatus] = useState(false)
    // const [productData, setProductData] = useState([])
    const { CurrencyData } = useContext(CurrencyContext);
    var cartItems;
    if (cartData == null) {
        cartItems = 0;
    } else {
        cartItems = cartData.length;
    }



    var sum = 0;
    if (cartItems > 0) {
        cartData.map((item, index) => {
            if (CurrencyData == 'inr' || CurrencyData == undefined) {
                sum += parseFloat(item.product.price);
            } else if (CurrencyData == 'usd') {
                sum += parseFloat(item.product.usd_price);
            }
        })
    }

    const cartRemoveButtonHandler = (product_id) => {
        var previousCart = localStorage.getItem('cartData');
        var cartJson = JSON.parse(previousCart);
        cartJson.map((cart, index) => {
            if (cart != null && cart.product.id == product_id) {
                // delete cartJson[index];
                cartJson.splice(index, 1);
            }
        });
        var cartString = JSON.stringify(cartJson);
        localStorage.setItem('cartData', cartString);
        // setCartButtonClickStatus(false);
        setCartData(cartJson);
    }


    return (
        <div className='container mt-4'>
            <h3 className='mb-4'>All Items ({cartItems})</h3>
            {/* {console.log(cartData)} */}
            {
                cartData.length == 0 &&
                <Link to="/" className='btn btn-success'>Home</Link>
            }
            {
                cartData.length != 0 &&
                <div className='row'>
                    <div className='col-12'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartData &&
                                        cartData.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <Link><img src={item.product.image} width='80' className="img-thumbnail" alt={item.product.title} /></Link>
                                                        <p><Link>{item.product.title}</Link></p>
                                                    </td>
                                                    {
                                                        (CurrencyData == 'inr' || CurrencyData == undefined) && <td>Rs.{item.product.price}</td>
                                                    }
                                                    {
                                                        CurrencyData == 'usd' && <td>$.{item.product.usd_price}</td>
                                                    }
                                                    <td>
                                                        <button title='Remove from cart' type='button' onClick={() => cartRemoveButtonHandler(item.product.id)} className='btn btn-warning ms-1'>
                                                            <i className="fa-solid fa-cart-plus"></i> Remove from cart
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th>Total</th>
                                        <th>
                                            {
                                                (CurrencyData == 'inr' || CurrencyData == undefined) && <td>Rs.{sum}</td>
                                            }
                                            {
                                                CurrencyData == 'usd' && <td>${sum}</td>
                                            }
                                        </th>
                                    </tr>
                                    <tr>
                                        <td colSpan='3' align='center'>
                                            <Link to="/categories" className='btn btn-secondary'>Continue Shopping</Link>
                                            <Link to='/confirm-order' className='btn btn-success ms-1'>Proceed to Payment</Link>

                                        </td>
                                    </tr>
                                </tfoot>

                            </table>
                        </div>
                    </div>

                </div>
            }
            

        </div>
    )
}

export default Checkout;