import { Link } from "react-router-dom";
import SellerSidebar from "./SellerSidebar";

function DailyReport() {
    const vendor_id = localStorage.getItem('vendor_id');
    const baseUrl='https://suresh2988.pythonanywhere.com/api/';
    // const baseUrl='http://127.0.0.1:8000/api/';
    function fetch_daily_orders(baseUrl){
        fetch(baseUrl)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
        });
    }
    fetch_daily_orders(baseUrl+'vendor/'+vendor_id+'/daily-report/');
    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <SellerSidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                <h3>Daily Report</h3>
                    <div className='row mt-2'></div>
                </div>
            </div>
        </div>
    )
}
export default DailyReport;