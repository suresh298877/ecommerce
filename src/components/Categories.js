import { Link } from 'react-router-dom';
import logo from './logo.svg';
import { useEffect, useState } from 'react';
function Categories() {
    const baseUrl = 'http://127.0.0.1:8000/api'
    const [categories, SetCategories] = useState([])
    const [totalResult, setTotalResults] = useState(0)

    useEffect(() => {
        fetchData(baseUrl + '/categories');
    }, []);

    function fetchData(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                SetCategories(data.results)
                setTotalResults(data.count)
            })
    }

    function changeUrl(baseUrl) {
        fetchData(baseUrl)
    }

    var links = []
    var limit=12;
    var totalLinks=totalResult/limit;
    for (let i = 1; i <= totalLinks; i++) {
        links.push(<li className="page-item"><Link className="page-link" onClick={() => changeUrl(baseUrl + `/categories/?page=${i}`)} to={`/categories/?page=${i}`}>{i}</Link></li>)
    }
    return (
        <section className="container mt-4">
            {/*  Categories */}
            <h3 className='mb-2'>All Categories</h3>
            <div className='row mb-2'>
                {
                    categories.map((category) =>
                        <div className='col-12 col-md-3 mb-4'>
                            <div className="card">
                                <img src={logo} className="card-img-top" alt={category.title} />
                                <div className="card-body">
                                    <h4 className="card-title"><Link to={`/category/${category.title}/${category.id}`}>{category.title}</Link></h4>
                                </div>
                                <div className='card-footer'>
                                    Product Downloads: 2356
                                </div>
                            </div>
                        </div>
                    )
                }
                {/* Category Box */}

                {/* Category Box End */}
            </div>
            {/* End categories */}
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {links}
                </ul>
            </nav>
        </section>
    )
}

export default Categories;