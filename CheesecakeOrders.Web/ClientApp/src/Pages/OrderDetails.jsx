import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from "dayjs";

const OrderDetails = () => {
    const [cheesecake, setCheesecake] = useState([]);
    const { id } = useParams();
    const getCheesecakeOrder = async () => {
        const { data } = await axios.get(`/api/cheesecake/getbyid?id=${id}`);
        setCheesecake(data);
        console.log(cheesecake);
    }
    useEffect(() => {
        getCheesecakeOrder();
    }, []);
    return (
        <div className='container' style={{ marginTop: '80px' }}>
            <div className='d-flex align-items-center justify-content-center' style={{ height: '80vh' }}>
                <div className='card text-center shadow p-3 mb-5 bg-body rounded' style={{ width: '30rem', backgroundColor: 'rgb(248, 249, 250)' }}>
                    <div className='card-body'>
                        <h3 className='card-title fw-bold'>{cheesecake.name}</h3>
                        <p className='card-text fs-5'>{cheesecake.email}</p>
                        <p className='card-text fs-5'>{cheesecake.baseFlavor}</p>
                        <p className='card-text fs-5'>{cheesecake.toppings}</p>
                        <p className='card-text fs-5'>{cheesecake.quantity}</p>
                        <p className='card-text fs-5'>{dayjs(cheesecake.deliveryDate).format("MM/DD/YYYY")}</p>
                        <p className='card-text fs-5'>{`$${cheesecake.total}`}</p>
                    </div>
                    <Link to={'/viewOrders'}>
                        <button className='btn btn-primary w-100'>Back to Orders</button>
                    </Link>

                </div>
            </div>
        </div>
    )
}
export default OrderDetails;