import axios from 'axios';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';

const baseUrl = 'https://suresh2988.pythonanywhere.com/api'
// const baseUrl = 'http://127.0.0.1:8000/api'
function Profile(props) {
    const [ProfileData, setProfileData] = useState({
        'user_id': '',
        'first_name': '',
        'last_name': '',
        'username': '',
        'email': '',
        'mobile': '',
        'p_image': ''
    });

    var customer_id = localStorage.getItem('customer_id');

    useEffect(() => {
        fetchData(baseUrl + '/customer/' + customer_id);
    }, []);

    function fetchData(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                setProfileData({
                    'user_id': data.user.id,
                    'first_name': data.user.first_name,
                    'last_name': data.user.last_name,
                    'username': data.user.username,
                    'email': data.user.email,
                    'mobile': data.mobile,
                    'p_image': data.profile_img
                });
            });
    }

    const inputHandler = (event) => {
        setProfileData({
            ...ProfileData,
            [event.target.name]: event.target.value
        });
        // console.log(ProfileData);
    }

    const handleFileChange = (event) => {
        // console.log(event.target.name);
        // console.log(ProfileData);
        setProfileData({
            ...ProfileData,
            [event.target.name]: event.target.files[0]
        });
        // console.log(ProfileData);
    }

    const submitHandler = (event) => {
        var formData = new FormData();
        formData.append('user', ProfileData.user_id);
        formData.append('mobile', ProfileData.mobile);
        formData.append('profile_img', ProfileData.p_image);

        axios.put(baseUrl + '/customer/' + customer_id + '/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important header for file upload
            },
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error)
            });

        var formUserData = new FormData();
        formUserData.append('first_name', ProfileData.first_name);
        formUserData.append('last_name', ProfileData.last_name);
        formUserData.append('username', ProfileData.username);
        formUserData.append('email', ProfileData.email);
        axios.put(baseUrl + '/user/' + ProfileData.user_id + '/', formUserData)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error)
            });

        window.location.reload();

    };


    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <Sidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='card'>
                        <h4 className='card-header'>Update Profile</h4>
                        <div className='card-body'>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input type="text" name='first_name' onChange={inputHandler} value={ProfileData.first_name} className="form-control" id="firstName" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input type="text" name='last_name' onChange={inputHandler} value={ProfileData.last_name} className="form-control" id="lastName" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" name='username' onChange={inputHandler} value={ProfileData.username} className="form-control" id="username" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" name='email' onChange={inputHandler} value={ProfileData.email} className="form-control" id="email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mobile" className="form-label">Mobile</label>
                                    <input type="number" name='mobile' onChange={inputHandler} value={ProfileData.mobile} className="form-control" id="mobile" />
                                </div>
                                <div className="mb-3">
                                    <div className="mb-3">
                                        <p>
                                            <img src={ProfileData.p_image} width='100'></img>
                                        </p>
                                        <label htmlFor="p_image" className="form-label">Profile Image</label>
                                        <input type="file" name='p_image' onChange={handleFileChange} className="form-control" id="profileImg" />
                                    </div>
                                </div>


                                <button type="button" onClick={submitHandler} className="btn btn-primary mt-2 rounded">Submit</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile;