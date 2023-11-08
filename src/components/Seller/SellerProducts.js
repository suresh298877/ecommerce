import { Link } from "react-router-dom";
import SellerSidebar from "./SellerSidebar";
import { useEffect, useState } from "react";

function SellerProducts(props) {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [ProductData, setProductData] = useState([]);
    const vendor_id=localStorage.getItem('vendor_id');
    // console.log(vendor_id);

    useEffect(() => {
        fetchData(baseUrl + '/vendor-products/'+vendor_id+'/');
    }, []);

    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                // console.log('data',data.results);
                setProductData(data.results);
                // console.log(OrderItems)
            });
    }

    function showConfirm(product_id) {
        var _confirm = window.confirm('Are you sure to delete this product?');
        if (_confirm) {
            fetch(baseUrl + '/product/' + product_id, {
                method: 'DELETE'
            })
                .then((response) => {
                    if (response.status == 204) {
                        fetchData(baseUrl + '/products/');
                    }
                });
        }
    }
    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <SellerSidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    {ProductData.length == 0 && <h3>No products</h3>}
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <td colspan="5">
                                        <Link to='/seller/add-product' className='btn btn-primary'><i className="fa fa-plus-circle"></i>Add Product</Link>
                                    </td>
                                </tr>
                                {ProductData.length != 0 && <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>USD_Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>}
                            </thead>
                            <tbody>
                                {ProductData.map((product, index) =>
                                    <tr>
                                        <td>{product.id}</td>
                                        <td><Link to={`/seller/update-product/${product.id}`}>{product.title}</Link></td>
                                        <td>&#8377;  {product.price}</td>
                                        <td>$ {product.usd_price}</td>
                                        <td>
                                            {
                                                product.published_status && <span className="text-success">Published</span>
                                            }
                                            {
                                                !product.published_status && 'Pending'
                                            }
                                        </td>
                                        <td>
                                            {/* <a href="#" className="btn btn-info">View</a> */}
                                            <Link to={`/seller/update-product/${product.id}`} className="btn btn-primary ms-1">Edit</Link>
                                            <Link to={`/seller/products`} onClick={() => showConfirm(product.id)} className="btn btn-danger ms-1">delete</Link>
                                        </td>
                                    </tr>
                                )
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default SellerProducts;