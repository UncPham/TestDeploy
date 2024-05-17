import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const { url, token } = useContext(StoreContext);
    const navigate = useNavigate()

    const verifyPayment = async () => {
        const response = await axios.post(url + "/api/order/verify", {success, orderId}, {headers: {token}})
        if (response.data.success) {
            navigate("/myorders")
        } else {
            navigate("/")
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [token])

  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify
