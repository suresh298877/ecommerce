import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function SellerRegister(props) {
    const baseUrl = 'http://127.0.0.1:8000/api/';

    const [formError, setFormError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [registerFormData, setRegisterFormData] = useState({
        'first_name': '',
        'last_name': '',
        'username': '',
        'email': '',
        'mobile': '',
        'address': '',
        'password': '',
    })

    const inputHandler = (event) => {
        setRegisterFormData({
            ...registerFormData,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = (event) => {
        var formData = new FormData();
        formData.append('first_name', registerFormData.first_name);
        formData.append('last_name', registerFormData.last_name);
        formData.append('username', registerFormData.username);
        formData.append('email', registerFormData.email);
        formData.append('mobile', registerFormData.mobile);
        formData.append('password', registerFormData.password);
        formData.append('address', registerFormData.address);

        axios.post(baseUrl + 'vendor/register/', formData)
            .then(function (response) {
                if (response.data.bool == false) {
                    setErrorMsg(response.data.msg)
                    setSuccessMsg('');
                } else {
                    setRegisterFormData({
                        'first_name': '',
                        'last_name': '',
                        'username': '',
                        'email': '',
                        'mobile': '',
                        'address': '',
                        'password': '',
                    });
                    setErrorMsg('');
                    setSuccessMsg(response.data.msg)
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    };

    const buttonEnable = (registerFormData.first_name !== '') && (registerFormData.mobile !== '') && (registerFormData.last_name !== '') && (registerFormData.username !== '') && (registerFormData.password !== '') && (registerFormData.email !== '') && (registerFormData.address!='')

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-8 col-12 offset-2'>
                    <div className='card'>
                        <h4 className='card-header'>Register</h4>
                        <div className='card-body'>
                            <p className="text-muted"><strong>Note: </strong> All fields are required </p>
                            
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input type="text" name='first_name' onChange={inputHandler} value={registerFormData.first_name} className="form-control" id="firstName" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input type="text" name='last_name' onChange={inputHandler} value={registerFormData.last_name} className="form-control" id="lastName" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" name='username' onChange={inputHandler} value={registerFormData.username} className="form-control" id="username" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" name='email' onChange={inputHandler} value={registerFormData.email} className="form-control" id="email" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mobile" className="form-label">Mobile</label>
                                    <input type="number" name='mobile' onChange={inputHandler} value={registerFormData.mobile} className="form-control" id="mobile" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="pwd" className="form-label">Password</label>
                                    <input type="password" name='password' onChange={inputHandler} value={registerFormData.password} className="form-control" id="pwd" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <textarea name='address' onChange={inputHandler} value={registerFormData.address} className="form-control" id="address" />
                                </div>
                                <button type="button" disabled={!buttonEnable} onClick={submitHandler} className="btn btn-primary">Submit</button>
                                <span>Already a Seller?<Link to='/seller/login'>login here</Link></span>
                                {successMsg && <p className="text-success">{successMsg}</p>}
                                {errorMsg && <p className="text-danger">{errorMsg}</p>}
                            </form>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default SellerRegister;