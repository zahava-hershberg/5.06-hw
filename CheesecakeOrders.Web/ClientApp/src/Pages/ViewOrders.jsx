import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from "dayjs";

const ViewOrders = () => {
    const [cheesecake, setCheesecake] = useState([]);

    useEffect(() => {
        const getOrder = async () => {
            const { data } = await axios.get('/api/cheesecake/getall');
            setCheesecake(data);
        }

        getOrder();
    }, []);


    return (
        <div className='container' style={{ marginTop: '80px' }}>
            <div className='d-flex justify-content-center'>
                <table className='table text-center shadow-lg' style={{ borderCollapse: 'separate', borderSpacing: '0px 15px', maxWidth: '80%' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'rgb(33, 37, 41)', color: 'white', borderRadius: '15px' }}>
                            <th>Name/Email</th>
                            <th>Base Flavor</th>
                            <th>Toppings</th>
                            <th>Special Requests</th>
                            <th>Quantity</th>
                            <th>Delivery Date</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cheesecake.map(cheesecake => (
                            <tr key={cheesecake.id} style={{ backgroundColor: 'rgb(248, 249, 250)', borderRadius: '15px' }}>
                                <td>
                                    <Link to={`/orderdetails/${cheesecake.id}`}>
                                        {cheesecake.name}- {cheesecake.email}
                                    </Link>
                                </td>

                                <td>{cheesecake.baseFlavor}</td>
                                <td>{cheesecake.toppings}</td>
                                <td>{cheesecake.specialRequests}</td>
                                <td>{cheesecake.quantity}</td>
                                <td>{dayjs(cheesecake.deliveryDate).format("MM/DD/YYYY")}</td>
                                <td>{`$${cheesecake.total}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewOrders;

