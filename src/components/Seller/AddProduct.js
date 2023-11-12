import { useEffect, useState } from 'react';
import SellerSidebar from './SellerSidebar';
import axios from 'axios';
function AddProduct(props) {
    // const baseUrl = 'http://127.0.0.1:8000/api';
    const baseUrl = 'https://suresh2988.pythonanywhere.com/api';
    const vendor_id = localStorage.getItem('vendor_id');
    const [CategoryData, setCategoryData] = useState([]);



    const [ErrorMsg, setErrorMsg] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState('')
    const [ProductData, setProductData] = useState({
        // 'vendor': vendor_id,
        'vendor': vendor_id,
        'category': '',
        'title': '',
        'slug': '',
        'detail': '',
        'price': '',
        'usd_price': '',
        'tags': '',
        'image': '',
        'demo_url': '',
        'product_file': ''
    });

    const [ProductImgs, setProductImgs] = useState([]);
    // const [ImgUploadErrorMsg, setImgUploadErrorMsg] = useState('');
    // const [ImgUploadSuccessMsg, setImgUploadSuccessMsg] = useState('');



    const inputHandler = (event) => {
        setProductData({
            ...ProductData,
            [event.target.name]: event.target.value,
        });
    }

    const fileHandler = (event) => {
        setProductData({
            ...ProductData,
            [event.target.name]: event.target.files[0]
        });
    }

    const multipleFileHandler = (event) => {
        var files = event.target.files;
        if (files.length > 0) {
            setProductImgs(files);
        }
    }

    const submitHandler = () => {
        var formData = new FormData();
        formData.append('vendor', ProductData.vendor);
        formData.append('category', ProductData.category);
        formData.append('title', ProductData.title);
        formData.append('slug', ProductData.slug);
        formData.append('detail', ProductData.detail);
        formData.append('price', ProductData.price);
        formData.append('usd_price', ProductData.usd_price);
        formData.append('tags', ProductData.tags);
        formData.append('image', ProductData.image);
        formData.append('demo_url', ProductData.demo_url);
        formData.append('product_file', ProductData.product_file);

        axios.post(baseUrl + '/products/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important header for file upload
            },
        })
            .then(function (response) {
                if (response.status == 201) {
                    setProductData({
                        'category': '',
                        'title': '',
                        'slug': '',
                        'detail': '',
                        'price': '',
                        'usd_price': '',
                        'tags': '',
                        'image': '',
                        'demo_url': '',
                        'product_file': '',
                    });


                    for (let i = 0; i < ProductImgs.length; i++) {
                        const ImageFormData = new FormData();
                        ImageFormData.append('product', response.data.id);
                        ImageFormData.append('image', ProductImgs[i]);

                        //submit multiple images
                        axios.post(baseUrl + '/product-imgs/', ImageFormData)
                            .then(function (response) {
                                console.log(response);
                            })
                            .catch(function (error) {
                                console.log(error)
                            });
                    }
                    setProductImgs('');
                    alert('product has been added successfully');


                    //End Upload Image
                } else {
                    setSuccessMsg('')
                    setErrorMsg(response.statusText);
                    alert('Failed to add product');
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    useEffect(() => {
        setProductData({
            ...ProductData,
            'vendor': vendor_id
        });
        fetchData(baseUrl + '/categories/');
    }, []);

    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                // console.log('data',data.results);
                setCategoryData(data.results);
                // console.log(OrderItems)
            });
    }

    console.log(ProductData);

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <SellerSidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='card'>
                        <h4 className='card-header'>Add Product</h4>
                        <div className='card-body'>
                            {SuccessMsg && <p className="text-success">{SuccessMsg}</p>}
                            {ErrorMsg && <p className="text-danger">{ErrorMsg}</p>}
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="Title" className="form-label">Category</label>
                                    <select className='form-control' name='category' onChange={inputHandler}>
                                        {
                                            CategoryData.map((item, index) => <option value={item.id}>{item.title}</option>)
                                        }

                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Title" className="form-label">Title</label>
                                    <input type="text" name='title' value={ProductData.title} onChange={inputHandler} className="form-control" id="Title" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Slug" className="form-label">Slug</label>
                                    <input type="text" name='slug' value={ProductData.slug} onChange={inputHandler} className="form-control" id="Slug" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="INR_Price" className="form-label">INR Price</label>
                                    <input type="number" name='price' value={ProductData.price} onChange={inputHandler} className="form-control" id="INR_Price" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="USD_Price" className="form-label">USD Price</label>
                                    <input type="number" name='usd_price' value={ProductData.usd_price} onChange={inputHandler} className="form-control" id="USD_Price" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Detail" className="form-label">Detail</label>
                                    <textarea className="form-control" name='detail' value={ProductData.detail} onChange={inputHandler} rows='5' id="Detail" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Tags" className="form-label">Tags</label>
                                    <textarea className="form-control" name='tags' value={ProductData.tags} onChange={inputHandler} rows='5' id="Tags" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="USD_Price" className="form-label">Demo URL</label>
                                    <input type="url" name='demo_url' value={ProductData.demo_url} onChange={inputHandler} className="form-control" id="Demo_URL" />
                                </div>
                                <div className="mb-3">
                                    <div className="mb-3">
                                        <label htmlFor="productImg" className="form-label">Featured Image</label>
                                        <input type="file" name='image' onChange={fileHandler} className="form-control" id="productImg" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="mb-3">
                                        <label htmlFor="product_Img" className="form-label">Product Images</label>
                                        <input type="file" multiple name='product_imgs' onChange={multipleFileHandler} className="form-control" id="product_Img" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="mb-3">
                                        <label htmlFor="Product_File" className="form-label">Product File</label>
                                        <input type="file" name='product_file' onChange={fileHandler} className="form-control" id="Product_File" />
                                    </div>
                                </div>
                                <button type="button" onClick={submitHandler} className="btn btn-primary">Submit</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddProduct;