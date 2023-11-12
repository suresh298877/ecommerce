import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import SellerSidebar from './SellerSidebar';
import { useEffect, useState } from 'react';
const baseUrl = 'https://suresh2988.pythonanywhere.com/api/';
// const baseUrl = 'http://127.0.0.1:8000/api/';
function Customers(props) {
    const vendor_id = localStorage.getItem('vendor_id');
    const [CustomerList, setCustomerList] = useState([]);
    useEffect(() => {
        fetchData(baseUrl + 'vendor/' + vendor_id + '/customers/');
    }, []);

    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                // console.log('data',data.results);
                setCustomerList(data.results);
                // console.log(OrderItems)
            });
    }

    function showConfirm(customer_id) {
        var _confirm = window.confirm('Are you sure to delete this order?');
        if (_confirm) {
            fetch(baseUrl + 'delete-customer-orders/' + customer_id, {
                method: 'DELETE'
            })
                .then((response) => {
                    if (response.bool==true) {
                        fetchData(baseUrl + 'seller/products/'+customer_id+'/orderitems/');
                    }
                });
        }
    }
    // console.log(CustomerList);

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
                                {CustomerList.length==0 && <h3>No customers</h3>}
                                {CustomerList.length!=0 && <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Action</th>
                                    </tr>}
                                    
                                </thead>
                                <tbody>
                                {
                                    CustomerList.map((item,index)=><tr>
                                        <td>{index+1}</td>
                                        <td>
                                        {item.user.username}
                                        </td>
                                        <td>{item.user.email}</td>
                                        <td>{item.order.customer.mobile}</td>
                                        {/* <td><span className='text-success'><i className='fa fa-check-circle'></i>Completed</span></td> */}
                                        <td>
                                            <Link to={`/seller/customer/${item.customer.id}/orderitems/`} className='btn btn-primary btn-sm ms-1'>Orders</Link>
                                            <Link onClick={()=>showConfirm(item.customer.id)} className='btn btn-danger btn-sm ms-1'>Remove from list</Link>
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

export default Customers;