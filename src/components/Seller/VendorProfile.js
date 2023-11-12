import SellerSidebar from './SellerSidebar';
function VendorProfile(props) {
    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <SellerSidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='card'>
                        <h4 className='card-header'>Update Profile</h4>
                        <div className='card-body'>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input type="text" className="form-control" id="firstName" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id="lastName" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="profileImg" className="form-label">Profile Image</label>
                                    <input type="file" className="form-control" id="profileImg" aria-describedby="emailHelp" />
                                </div>

                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default VendorProfile;