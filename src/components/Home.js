import { Link } from 'react-router-dom';
import logo from './logo.svg';
import SingleProduct from './SingleProduct';
import { useEffect, useState } from 'react';
function Home() {
    const baseUrl = 'http://127.0.0.1:8000/api'
    const [products, setProducts] = useState([])
    // const [totalResult, setTotalResults] = useState(0)
    useEffect(() => {
        fetchData(baseUrl + '/products/?fetch_limit=4');
    }, []);

    function fetchData(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.results)
                // setTotalResults(data.count)
            })
    }
    return (
        <main className='mt-4'>
            <div className='container'>
                {/* Latest Products */}
                <h3 className='mb-4'>Latest Products <Link to="/products" className='float-end btn btn-dark'>View All Products<i className="fa-solid fa-arrow-right"></i></Link></h3>
                <div className='row mb-4'>
                    {
                        products.map((product, index) => <SingleProduct product={product} />)
                    }
                </div>
                {/* End Latest Products */}

                
                {/* Popular Categories */}
                {/* <h3 className='mb-4'>Popular Categories <a href="#" className='float-end btn btn-dark'>View All Categories <i className="fa-solid fa-arrow-right"></i></a></h3> */}
                {/* <div className='row mb-4'> */}
                    {/* Category Box */}
                    {/* <div className='col-12 col-md-3 mb-4'> */}
                        {/* <div className="card"> */}
                            {/* <img src={logo} className="card-img-top" alt="..." /> */}
                            {/* <div className="card-body"> */}
                                {/* <h4 className="card-title">Category title</h4> */}
                            {/* </div> */}
                            {/* <div className='card-footer'> */}
                                {/* Product Downloads: 2356 */}
                            {/* </div> */}
                        {/* </div> */}
                    {/* </div> */}
                    {/* Category Box End */}
                {/* </div>   */}
                {/* End Popular categories */}


                {/* Popular Products */}
                {/* <h3 className='mb-4'>Popular Products <a href="#" className='float-end btn btn-dark'>View All Products <i className="fa-solid fa-arrow-right"></i></a></h3> */}
                {/* <div className='row mb-4'> */}
                    {/* Product Box */}
                    {/* <div className='col-12 col-md-3 mb-4'> */}
                        {/* <div className="card"> */}
                            {/* <img src={logo} className="card-img-top" alt="..." /> */}
                            {/* <div className="card-body"> */}
                                {/* <h4 className="card-title">Product title</h4> */}
                                {/* <h5>Price: Rs. 500</h5> */}
                            {/* </div> */}
                            {/* <div className='card-footer'> */}
                                {/* <button title='Add to Cart' className='btn btn-success btn-sm'> */}
                                    {/* <i className="fa-solid fa-cart-plus"></i> */}
                                {/* </button> */}
                                {/* <button title='Add to Wishlist' className='btn btn-danger btn-sm ms-1'> */}
                                    {/* <i className="fa fa-heart"></i> */}
                                {/* </button> */}

                            {/* </div> */}
                        {/* </div> */}

                    {/* </div> */}
                    {/* Product Box End */}

                {/* </div> */}
                {/* End Popular Products */}
                {/* Popular Sellers */}
                {/* <h3 className='mb-4'>Popular Sellers <a href="#" className='float-end btn btn-dark'>View All Sellers <i className="fa-solid fa-arrow-right"></i></a></h3> */}
                {/* <div className='row mb-4'> */}
                    {/* Seller Box */}
                    {/* <div className='col-12 col-md-3 mb-4'> */}
                        {/* <div className="card"> */}
                            {/* <img src={logo} className="card-img-top" alt="..." /> */}
                            {/* <div className="card-body"> */}
                                {/* <h4 className="card-title">Seller Name</h4> */}
                            {/* </div> */}
                            {/* <div className='card-footer'> */}
                                {/* Categories: <a href='#'>Python</a>,<a href='#'>Php</a> */}
                            {/* </div> */}
                        {/* </div> */}
                    {/* </div> */}
                    {/* Seller Box End */}
                {/* </div> */}
                {/* End Popular Sellers */}
                {/* Rating and Reviews */}
                <div id="carouselExampleIndicators" className="carousel slide my-4 border bg-dark text-white p-5" data-bs-ride="true">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <figure className="text-center">
                                <blockquote className="blockquote">
                                    <p>A well-known quote, contained in a blockquote element.</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    <i className="fa-solid fa-star text-warning"></i>
                                    <cite title="Source Title">Customer Name</cite>
                                </figcaption>
                            </figure>
                        </div>
                        <div className="carousel-item">
                            <figure className="text-center">
                                <blockquote className="blockquote">
                                    <p>A well-known quote, contained in a blockquote element.</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    <i className="fa-solid fa-star text-warning"></i>
                                    <cite title="Source Title">Customer Name</cite>
                                </figcaption>
                            </figure>
                        </div>
                        <div className="carousel-item">
                            <figure className="text-center">
                                <blockquote className="blockquote">
                                    <p>A well-known quote, contained in a blockquote element.</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    <i className="fa-solid fa-star text-warning"></i>
                                    <cite title="Source Title">Customer Name</cite>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                {/* End of ratign and reviews */}


            </div>
        </main>
    )
}

export default Home;