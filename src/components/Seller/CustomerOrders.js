import { Link, json, useParams } from 'react-router-dom';
import logo from '../logo.svg';
import SellerSidebar from './SellerSidebar';
import { useEffect, useState } from 'react';

const baseUrl = 'http://127.0.0.1:8000/api/';
function CustomerOrders(props) {
    const { customer_id } = useParams();
    const vendor_id = localStorage.getItem('vendor_id');
    const [OrderItems, setOrderItems] = useState([]);
    useEffect(() => {
        fetchData(`${baseUrl}vendor/${vendor_id}/customer/${customer_id}/orderitems/`);
    }, []);

    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                // console.log('data',data.results);
                setOrderItems(data.results);
                // console.log(OrderItems)
            });
    }

    function changeOrderStatus(order_id, status) {
        fetch(baseUrl + 'order-modify/' + order_id + '/', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ order_status: status })
        })
            .then(function (response) {
                if (response.status == 200) {
                    fetchData(`${baseUrl}vendor/${vendor_id}/customer/${customer_id}/orderitems/`);
                }
            });
    }
    
    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <SellerSidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='row'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {console.log(OrderItems)} */}
                                    {
                                        OrderItems.map((item, index) => <tr>
                                            <td>{index + 1}</td>
                                            <td>
                                                <Link><img src={'http://127.0.0.1:8000' + item.product.image} className="img-thumbnail" width={80} alt="..." /></Link>
                                                <p><Link>{item.product.title}</Link></p>
                                            </td>
                                            <td>{item.product.price}</td>
                                            <td>
                                                {
                                                    item.order.order_status && <span className='text-success'><i className='fa fa-check-circle'></i>Completed</span>
                                                }
                                                {
                                                    !item.order.order_status && <span className='text-danger'><i className='fa fa-spinner'></i>Pending</span>
                                                }
                                            </td>
                                            <td>
                                                <div class="dropdown">
                                                    <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Change Status
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li>
                                                            {console.log(item.order.order_status)}
                                                            {
                                                                !item.order.order_status && <a class="dropdown-item" onClick={() => changeOrderStatus(item.order.id, true)} href="#">Complete</a>
                                                            }
                                                            {
                                                                item.order.order_status && <a class="dropdown-item" onClick={() => changeOrderStatus(item.order.id, false)} href="#">Pending</a>
                                                            }
                                                            {/* <a class="dropdown-item" onClick={() => changeOrderStatus(item.order.id, true)} href="#">Complete</a> */}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>)
                                    }

                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CustomerOrders;