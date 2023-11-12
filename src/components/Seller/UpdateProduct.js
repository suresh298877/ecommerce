import { useEffect, useState } from 'react';
import SellerSidebar from './SellerSidebar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function UpdateProduct(props) {
    const baseUrl = 'https://suresh2988.pythonanywhere.com/api';
    // const baseUrl = 'http://127.0.0.1:8000/api';
    const { product_id } = useParams();
    const vendor_id = localStorage.getItem('vendor_id');
    const [CategoryData, setCategoryData] = useState([]);

    const [IsImageDeleted, setIsImageDeleted] = useState(false);
    const [IsFeatureImageSelected, setIsFeatureImageSelected] = useState(false);
    const [IsProductFileSelected, setIsProductFileSelected] = useState(false);
    const [IsMultipleProductImagesSeleted, setIsMultipleProductImagesSeleted] = useState(false);

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
        'demo_url': '',
        'image': '',
        'product_imgs': '',
        // 'product_file': ''
    });
    useEffect(() => {
        setProductData({
            ...ProductData,
            'vendor': vendor_id
        });
        fetchData(baseUrl + '/categories/');
        fetcProducthData(baseUrl + '/product/' + product_id);
        // fetchProductImages(baseUrl + '/product-imgs/' + product_id);
    }, []);

    const [ProductImgs, setProductImgs] = useState([]);



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
        })

        if (event.target.name == 'image') {
            setIsFeatureImageSelected(true);
        }
        if (event.target.name == 'product_file') {
            setIsProductFileSelected(true);
        }
    }

    const multipleFileHandler = (event) => {
        var files = event.target.files;
        if (files.length > 0) {
            setIsMultipleProductImagesSeleted(true);
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
        if (IsFeatureImageSelected) {
            formData.append('image', ProductData.image);
        }
        if (IsProductFileSelected) {
            formData.append('product_file', ProductData.product_file);
        }
        formData.append('demo_url', ProductData.demo_url);

        axios.patch(baseUrl + '/product/' + product_id + '/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important header for file upload
            },
        })
            .then(function (response) {
                if (response.status == 200) {
                    // setProductData({
                    //     'category': '',
                    //     'title': '',
                    //     'slug': '',
                    //     'detail': '',
                    //     'price': '',
                    //     'usd_price': '',
                    //     'tags': '',
                    //     // 'image': '',
                    //     'demo_url': '',
                    //     // 'product_file': '',
                    // });
                    setErrorMsg('');
                    setSuccessMsg(response.statusText);


                    if (IsMultipleProductImagesSeleted) {
                        for (let i = 0; i < ProductImgs.length; i++) {
                            const ImageFormData = new FormData();
                            ImageFormData.append('product', response.data.id);
                            ImageFormData.append('image', ProductImgs[i]);

                            //submit multiple images
                            axios.post(baseUrl + '/product-imgs/?from_update=1', ImageFormData)
                                .then(function (response) {
                                    console.log(response);
                                })
                                .catch(function (error) {
                                    console.log(error)
                                });
                        }
                    }


                    //End Upload Image
                } else {
                    setSuccessMsg('')
                    setErrorMsg(response.statusText);
                }
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error)
            });


    }



    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                // console.log('data',data.results);
                setCategoryData(data.results);
                // console.log(OrderItems)
            });
    }

    function deleteImage(image_id) {
        axios.delete(baseUrl + '/product-img/' + image_id + "/")
            .then(function (response) {
                if (response.status == 204) {
                    window.location.reload();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function fetcProducthData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                // console.log('data',data.results);
                // setCategoryData(data.results);
                setProductData({
                    'vendor': data.vendor,
                    'category': data.category,
                    'title': data.title,
                    'slug': data.slug,
                    'detail': data.detail,
                    'price': data.price,
                    'usd_price': data.usd_price,
                    'tags': data.tags,
                    'image': data.image,
                    'demo_url': data.demo_url,
                    'product_file': data.product_file,
                    'product_imgs': data.product_imgs,
                })
            });
    }

    // console.log(ProductData);

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <SellerSidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='card'>
                        <h4 className='card-header'>Update Product</h4>
                        <div className='card-body'>

                            <form>
                                <div className="mb-3">
                                    <label htmlFor="Title" className="form-label">Category</label>
                                    <select className='form-control' name='category' onChange={inputHandler}>
                                        {
                                            CategoryData.map((item, index) => <option key={index + 1} selected={item.id == ProductData.category} value={item.id}>{item.title}</option>)
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
                                        <img src={ProductData.image} className='img rounded border mt-2' width='200'></img>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="mb-3">
                                        <label htmlFor="product_Img" className="form-label">Product Images</label>
                                        <input type="file" multiple name='product_imgs' onChange={multipleFileHandler} className="form-control mb-3" id="product_Img" />
                                        <>
                                            {
                                                ProductData.product_imgs && ProductData.product_imgs.map((img, index) =>
                                                    <span key={999 - index} onClick={() => deleteImage(img.id)} className='image-box d-inline p-3 mt-2'>
                                                        <i className='fa fa-trash text-danger' style={styles.deleteBtn} role='button'></i>
                                                        <img src={img.image} className='my-4 me-2' width='100' height='100'></img>
                                                    </span>
                                                )
                                            }
                                        </>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="mb-3">
                                        <label htmlFor="Product_File" className="form-label">Product File</label>
                                        <input type="file" name='product_file' onChange={fileHandler} className="form-control" id="Product_File" />
                                        <a href={ProductData.product_file}>Download</a>
                                    </div>
                                </div>
                                <button type="button" onClick={submitHandler} className="btn btn-primary">Submit</button>
                                {SuccessMsg && <p className="text-success">{SuccessMsg}</p>}
                                {ErrorMsg && <p className="text-danger">{ErrorMsg}</p>}
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

const styles = {
    'deleteBtn': {
        'position': 'absolute'
    }
}

export default UpdateProduct;