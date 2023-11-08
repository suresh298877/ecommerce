import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function SellerLogin(props) {
    const baseUrl = 'http://127.0.0.1:8000/api/'
    const [LoginFormData, setLoginFormData] = useState({
        'username': '',
        'password': ''
    });
    // const [SuccessMsg, setSuccessMsg] = useState('');
    const [ErrorMsg, setErrorMsg] = useState('');

    const inputHandler = (event) => {
        setLoginFormData({
            ...LoginFormData,
            [event.target.name]: event.target.value
        });
    }

    const submitHandler = (event) => {
        var formData = new FormData();
        formData.append('username', LoginFormData.username);
        formData.append('password', LoginFormData.password);

        axios.post(baseUrl + 'vendor/login/', formData)
            .then(function (response) {
                if (response.data.bool == false) {
                    setErrorMsg(response.data.msg)
                } else {
                    console.log(response)
                    localStorage.setItem('vendor_id', response.data.id);
                    localStorage.setItem('vendor_login', true);
                    localStorage.setItem('vendor_username', response.data.user);
                    // SuccessMsg(response.data.msg);
                    setErrorMsg('')
                    window.location.href = '/seller/dashboard';
                }
            })
            .catch(function (error) {
                console.log(error)
            });

        const checkVendor = localStorage.getItem('vendor_login');
        if (checkVendor) {
            window.location.href = '/seller/dashboard';
        }
    }


    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-8 col-12 offset-2'>
                    <div className='card'>
                        <h4 className='card-header'>Login</h4>
                        <div className='card-body'>
                            {/* {
                            SuccessMsg && 
                            <p className="text-danger">{SuccessMsg}</p>
                        } */}

                            <form>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" onChange={inputHandler} name='username' value={LoginFormData.username} className="form-control" id="username" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="pwd" className="form-label">Password</label>
                                    <input type="password" onChange={inputHandler} name='password' value={LoginFormData.password} className="form-control" id="pwd" />
                                </div>
                                <button type="button" onClick={submitHandler} className="btn btn-primary">Submit</button>
                                <span>Not a seller?<Link to='/seller/register'>Register here</Link></span>
                                {
                                    ErrorMsg &&
                                    <p className="text-danger">{ErrorMsg}</p>
                                }
                            </form>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default SellerLogin;