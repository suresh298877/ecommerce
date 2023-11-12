import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import { useContext, useEffect, useState } from 'react';
import { CurrencyContext } from '../../Context'
import { findAllInRenderedTree } from 'react-dom/test-utils';
import axios from 'axios';
function Wishlist(props) {

    //checking whether added or not
    const { CurrencyData } = useContext(CurrencyContext)
    const baseUrl = 'https://suresh2988.pythonanywhere.com/api';
    // const baseUrl = 'http://127.0.0.1:8000/api';
    const customerId = localStorage.getItem('customer_id');
    const [WishItems, setWishItems] = useState([]);
    useEffect(() => {
        fetchData(baseUrl + '/customer/' + customerId + '/wishitems');
    }, []);

    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                // console.log('data',data.results);
                setWishItems(data.results);
                // console.log(OrderItems)
            });
    }

    function removeFromWishList(wishlist_id) {
        // console.log(wishlist_id);
        // const customerId = localStorage.getItem('customer_id')
        const formData = new FormData();
        formData.append('wishlist_id', wishlist_id);
        // formData.append('product', productData.id);
        // formData.append('total_usd_amount', total_usd_amount);

        //submit data
        axios.post(baseUrl + '/remove-from-wishlist/', formData)
            .then(function (response) {
                console.log(response);
                if (response.data.bool == true) {
                    document.getElementById('row' + wishlist_id).remove();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <Sidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='row'>
                        {WishItems.length == 0 && <h3>No wished Items</h3>}
                        {WishItems.length != 0 && <div className='table-responsive'>
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
                                        WishItems.map((item, index) => {
                                            return (
                                                <tr id={`row${item.id}`}>
                                                    <td>1</td>
                                                    <td>
                                                    {/* {console.log(item.product.image)} */}
                                                        <Link><img src={'http://127.0.0.1:8000/'+item.product.image} className="img-thumbnail" width={80} alt="..." /></Link>
                                                        <p><Link>{item.product.title}</Link></p>
                                                    </td>

                                                    {
                                                        CurrencyData != 'usd' && <td>Rs.{item.product.price}</td>
                                                    }
                                                    {
                                                        CurrencyData == 'usd' && <td>${item.product.usd_price}</td>
                                                    }

                                                    <td><button className='btn btn-danger btn-sm' onClick={() => removeFromWishList(item.id)}>Remove</button></td>
                                                </tr>
                                            )
                                        })
                                    }


                                </tbody>

                            </table>
                        </div>}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Wishlist;