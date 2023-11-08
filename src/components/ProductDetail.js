import { Link, json, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import SingleRelatedProduct from './SingleRelatedProduct';
import { CartContext, CurrencyContext, UserContext } from '../Context';
import axios from 'axios';
function ProductDetail() {
    const baseUrl = 'http://127.0.0.1:8000/api'
    const [productData, setProductData] = useState([])
    const [productImgs, setproductImgs] = useState([])
    const [productTags, setProductTags] = useState([])
    const [relatedProducts, setrelatedProducts] = useState([])
    const [cartButtonClickStatus, setCartButtonClickStatus] = useState(false)
    const [productInWishList, setProductInWishList] = useState(false)
    const { product_id } = useParams();
    const { cartData, setCartData } = useContext(CartContext)
    const { CurrencyData } = useContext(CurrencyContext);
    const _currency = localStorage.getItem('currency')

    const userContext = useContext(UserContext);
    // console.log(userContext);


    useEffect(() => {
        fetchData(baseUrl + '/product/' + product_id);
        fetchRelatedData(baseUrl + '/related-product/' + product_id);
        checkProductInCart(product_id);
        checkProductInWishList(baseUrl+'/check-in-wishlist/',product_id);
        // localStorage.removeItem('cartData');
    }, []);

    const tagsLinks = []
    for (let i = 0; i < productTags.length; i++) {
        let tag = productTags[i].trim()
        tagsLinks.push(<Link className='badge bg-secondary text-white me-1' to={`/products/${tag}`}>{tag}</Link>)
    }

    //save in wishlist


    const cartAddButtonHandler = () => {
        let previousCart = localStorage.getItem('cartData');
        let cartJson = JSON.parse(previousCart);
        const cartData =
        {
            'product': {
                'id': productData.id,
                'title': productData.title,
                'price': productData.price,
                'usd_price': productData.usd_price,
                'image': productData.image,
            },
            'user': {
                'id': 1
            },
            'total_amount': 10
        }
        if (cartJson != null) {
            cartJson.push(cartData);
            var cartString = JSON.stringify(cartJson);
            localStorage.setItem('cartData', cartString);
            setCartData(cartJson);
        } else {
            var newCartList = [];
            newCartList.push(cartData);
            var cartString = JSON.stringify(newCartList);
            localStorage.setItem('cartData', cartString);
        }
        setCartButtonClickStatus(true);
    }

    const cartRemoveButtonHandler = () => {
        var previousCart = localStorage.getItem('cartData');
        var cartJson = JSON.parse(previousCart);
        cartJson.map((cart, index) => {
            if (cart != null && cart.product.id == productData.id) {
                // delete cartJson[index];
                cartJson.splice(index, 1);
            }
        });
        var cartString = JSON.stringify(cartJson);
        localStorage.setItem('cartData', cartString);
        setCartButtonClickStatus(false);
        setCartData(cartJson);
    }

    function checkProductInCart(product_id) {
        var previousCart = localStorage.getItem('cartData');
        var cartJson = JSON.parse(previousCart);
        if (cartJson != null) {
            cartJson.map((cart) => {
                if (cart != null && cart.product.id == product_id) {
                    setCartButtonClickStatus(true);
                }
            })
        }
    }

    function fetchData(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                // console.log('usd_price', data);
                setProductData(data);
                setproductImgs(data.product_imgs);
                setProductTags(data.tag_list);
            })
    }

    function fetchRelatedData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                setrelatedProducts(data.results);

            })
    }

    function saveInWishList() {
        const customerId = localStorage.getItem('customer_id')
        const formData = new FormData();
        formData.append('customer', customerId);
        formData.append('product', productData.id);
        // formData.append('total_usd_amount', total_usd_amount);

        //submit data
        axios.post(baseUrl + '/wishlist/', formData)
            .then(function (response) {
                if(response.data.id){
                    setProductInWishList(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function checkProductInWishList(baseUrl,product_id) {
        const customerId = localStorage.getItem('customer_id')
        const formData = new FormData();
        formData.append('customer', customerId);
        formData.append('product', product_id);
        // formData.append('total_usd_amount', total_usd_amount);

        //submit data
        axios.post(baseUrl,formData)
            .then(function (response) {
                if(response.data.bool==true){
                    setProductInWishList(true);
                }else{
                    setProductInWishList(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <section className="container mt-4">
            <div className="row">
                <div className="col-4">
                    <div id="ProductThumbnailSlider" className="carousel carousel-dark slide carousel-fade" >
                        <div className="carousel-indicators">
                            {
                                productImgs.map((img, index) => {
                                    if (index === 0) {
                                        return <button type='button' data-bs-target="#productThumbnailSlider" data-bs-slide-to={index} className='active' aria-current='true' aria-label="Slide 1">
                                        </button>
                                    }
                                    else {
                                        return <button type='button' data-bs-target="#productThumbnailSlider" data-bs-slide-to={index} aria-current='true' aria-label="Slide 1">
                                        </button>
                                    }
                                }
                                )
                            }
                        </div>
                        <div className="carousel-inner">
                            {
                                productImgs.map((img, index) => {
                                    if (index === 0) {
                                        return <div className='carousel-item active'>
                                            <img src={img.image} className='img-thumbnail mb-5' alt={index} />
                                        </div>
                                    }
                                    else {
                                        return <div className='carousel-item'>
                                            <img src={img.image} className='img-thumbnail mb-5' alt={index} />
                                        </div>
                                    }
                                })
                            }
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#ProductThumbnailSlider" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#ProductThumbnailSlider" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="col-8">
                    <h3>{productData.title}</h3>
                    <p className='mt-3'>
                        {productData.detail}
                    </p>
                    {
                        CurrencyData != 'usd' && <h5 className='card-title'>Price: Rs.{productData.price}</h5>
                    }
                    {
                        CurrencyData == 'usd' && <h5 className='card-title'>Price: ${productData.usd_price}</h5>
                    }
                    {/* <h5>Price: Rs.{productData.price}</h5> */}
                    <p className='mt-3'>
                        <Link title='Demo' to={productData.demo_url} target='_blank' className='btn btn-dark'>
                            <i className="fa-solid fa-cart-plus"></i> Demo
                        </Link>
                        {
                            !cartButtonClickStatus &&
                            <>
                                <button title='Add to Cart' type='button' onClick={cartAddButtonHandler} className='btn btn-primary ms-1'>
                                    <i className="fa-solid fa-cart-plus"></i> Add to cart
                                </button>
                            </>
                        }
                        {
                            cartButtonClickStatus &&
                            <>
                                <button title='Remove from cart' type='button' onClick={cartRemoveButtonHandler} className='btn btn-warning ms-1'>
                                    <i className="fa-solid fa-cart-plus"></i> Remove from cart
                                </button>
                            </>
                        }
                        <button title='Add to Cart' className='btn btn-success ms-1'>
                            <i className="fa-solid fa-bag-shopping"></i> Buy now
                        </button>
                        {
                            (userContext && !productInWishList) && <button onClick={() => {
                                saveInWishList()
                            }} title='Add to Wishlist' className='btn btn-danger  ms-1'>
                                <i className="fa fa-heart"></i> Wishlist
                            </button>
                        }
                        {
                            userContext == null && <button title='Add to Wishlist' className='btn btn-danger  ms-1 disabled'>
                                <i className="fa fa-heart"></i> Wishlist
                            </button>
                        }

                        {
                            (userContext && productInWishList) && <button onClick={() => {
                                saveInWishList()
                            }} title='Add to Wishlist' className='btn btn-danger  ms-1 disabled'>
                                <i className="fa fa-heart"></i> Wishlist
                            </button>
                        }

                    </p>
                    <div className='producttags'>
                        <h5 className='mt-4'>Tags</h5>
                        <p>
                            {tagsLinks}
                        </p>
                    </div>
                </div>
            </div>
            {/* Releted Products */}
            {relatedProducts.length > 0 &&
                <>
                    <h3 className='mt-5 mb-3 text-center'>Releted Products</h3>
                    <div id="relatedProductsSlider" className="carousel carousel-dark slide" >
                        <div className="carousel-indicators">
                            {
                                relatedProducts.map((product, index) => {
                                    if (index === 0) {
                                        return <button type='button' data-bs-target="#relatedProductsSlider" data-bs-slide-to={index} className='active' aria-current='true' aria-label="Slide 1">
                                        </button>
                                    }
                                    else {
                                        return <button type='button' data-bs-target="#relatedProductsSlider" data-bs-slide-to={index} aria-current='true' aria-label="Slide 1">
                                        </button>
                                    }
                                }
                                )
                            }

                        </div>
                        <div className="carousel-inner">
                            {
                                relatedProducts.map((product, index) => {
                                    if (index === 0) {
                                        return <div className='carousel-item active'>
                                            <SingleRelatedProduct product={product} />
                                            {/* <SingleProduct  /> */}
                                        </div>
                                    }
                                    else {
                                        return <div className='carousel-item'>
                                            {/* <SingleProduct product={product} /> */}
                                            <SingleRelatedProduct product={product} />
                                        </div>
                                    }
                                })
                            }
                        </div>
                        {/* <button className="carousel-control-prev" type="button" data-bs-target="#relatedProductsSlider" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#relatedProductsSlider" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button> */}
                    </div>
                </>
            }

            {/* End Releted Products */}
        </section>
    )
}
export default ProductDetail;