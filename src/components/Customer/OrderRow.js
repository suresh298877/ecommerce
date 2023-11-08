import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function OrderRow(props) {
    const index = props.index;
    const item = props.item;
    const baseUrl = 'http://127.0.0.1:8000';
    const baseApiUrl = 'http://127.0.0.1:8000/api';
    const [TotalDownloads, setTotalDownloads] = useState(item.product.downloads)
    const countDownloads = (product_id) => {
        const formData = new FormData();
        formData.append('product_id', product_id);
        axios.post(baseApiUrl + '/update_product_download_count/' + product_id + '/')
        .then(function (response) {
                // console.log(product_id);
                if (response.data.bool == true) {
                    setTotalDownloads(++item.product.downloads);
                    window.open(
                        'http://127.0.0.1:8000'+item.product.product_file,
                        '_blank'
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <Link to={`/product/${item.product.slug}/${item.product.id}`}>
                    <img src={`${baseUrl}/${item.product.image}`} className="img-thumbnail" width='80' alt="..." />
                </Link>
                <p><Link to={`/product/${item.product.slug}/${item.product.id}`}>{item.product.title}</Link></p>
            </td>
            <td>Rs. {item.product.price}</td>
            <td><span>
                {
                    item.order.order_status == true && <i className='fa fa-check-circle text-success'></i>
                }
                {
                    item.order.order_status == false && <i className='fa fa-check-circle text-dark'></i>
                }
            </span></td>
            <td>
                {
                    item.order.order_status == true && <button target='_blank' onClick={() => countDownloads(item.product.id)} className='btn btn-primary btn-sm'>Download
                        <span className='badge ms-1 text-dark bg-white'>{TotalDownloads}</span>
                    </button>
                }
            </td>
        </tr>
    )
}

export default OrderRow;