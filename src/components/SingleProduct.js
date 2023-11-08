import { Link } from 'react-router-dom';
import logo from './logo.svg';
import { useContext } from 'react';
import { CurrencyContext } from '../Context';
function SingleProduct(props) {
    const {CurrencyData}=useContext(CurrencyContext);
    return (
        <div className='col-12 col-md-3 mb-4'>
            <div className="card">
                <Link to={`/product/${props.product.title}/${props.product.id}`}><img style={{ width: 300, height: 200 }} src={props.product.image} className="card-img-top" alt="..." /></Link>
                <div className="card-body">
                    <h5 className="card-title"><Link to={`/product/${props.product.title}/${props.product.id}`}>{props.product.title}</Link></h5>
                    {
                        CurrencyData!='usd' && <h5 className='card-title text-muted'>Price: Rs.{props.product.price}</h5>
                    }
                    {
                        CurrencyData=='usd' && <h5 className='card-title text-muted'>Price: ${props.product.usd_price}</h5>
                    }
                    {/* <h5>Price: Rs. {props.product.price}</h5> */}
                </div>
                {/* <div className='card-footer'>
                    <button title='Add to Cart' className='btn btn-success btn-sm'>
                        <i className="fa-solid fa-cart-plus"></i>
                    </button>
                    <button title='Add to Wishlist' className='btn btn-danger btn-sm ms-1'>
                        <i className="fa fa-heart"></i>
                    </button>
                </div> */}
            </div>
        </div>
    )
}
export default SingleProduct;