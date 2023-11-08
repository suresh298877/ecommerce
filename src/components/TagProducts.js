import { useEffect, useState } from 'react';
import SingleProduct from './SingleProduct';
import { Link, useParams } from 'react-router-dom';
function TagProducts(props) {
    const baseUrl = 'http://127.0.0.1:8000/api'
    const [products, setProducts] = useState([])
    const [totalResult, setTotalResults] = useState(0)
    const {tag}=useParams();

    useEffect(() => {
        fetchData(baseUrl + '/products/'+tag);
    }, []);

    function fetchData(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.results)
                setTotalResults(data.count) 
            })
    }

    function changeUrl(baseUrl) {
        fetchData(baseUrl)
    }

    var links = []
    var limit = 12;
    var totalLinks = totalResult / limit;
    for (let i = 1; i <= totalLinks; i++) {
        links.push(<li className="page-item"><Link className="page-link" onClick={() => changeUrl(baseUrl + `/products/${tag}/?page=${i}`)} to={`/products/${tag}/?page=${i}`}>{i}</Link></li>)
    }


    return (
        <section className='container mt-4'>
            {/* Latest Products */}
            <h3 className='mb-4'>All Products</h3>
            <div className='row mb-4'>
                {
                    products.map((product, index) => <SingleProduct product={product} />)
                }


            </div>
            {/* End Latest Products */}
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {links}
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </section>
    )
}
export default TagProducts;