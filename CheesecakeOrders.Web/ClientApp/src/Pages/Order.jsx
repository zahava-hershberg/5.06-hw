import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from "dayjs";


const Order = () => {
    const navigate = useNavigate();
    const [cheesecake, setCheesecake] = useState({
        name: '',
        email: '',
        specialRequests: '',
        quantity: 1,
        total: 0,
        baseFlavor: '',
        toppings: [],
        deliveryDate: ''
    });

    const [flavors] = useState([
        'Classic',
        'Chocolate',
        'Red Velvet',
        'Brownie'
    ]);
    const [toppingTypes] = useState([
        'Chocolate Chips', 'Caramel Drizzle', 'Whipped Cream', 'Pecans', 'Almonds', 'Toasted Coconut', 'Graham Cracker Crumble',
        'Cookie Dough', 'Mint Chocolate Chips', 'Caramelized Bananas', 'Rainbow Sprinkles', 'Powdered Sugar', 'White Chocolate Shavings',
        'Peanut Butter Drizzle', 'Dark Chocolate Drizzle'
    ]);
    const onTextChange = e => {
        const copy = { ...cheesecake };
        copy[e.target.name] = e.target.value;
        setCheesecake(copy);

    }

    const onCheck = (t) => {
        let toppingList = [];
        if (cheesecake.toppings.includes(t)) {
            toppingList = cheesecake.toppings.filter(toppings => toppings !== t);
        } else {
            toppingList = [...cheesecake.toppings, t];
        }
        setCheesecake({ ...cheesecake, toppings: toppingList });


    }

    const price = (49.99 * cheesecake.quantity + cheesecake.toppings.length * 3.95);
    const onSubmitClick = async () => {
        await axios.post('/api/cheesecake/add', { ...cheesecake, toppings: cheesecake.toppings.join(', '), total: price });
        navigate('/success');
    }



    const { name, email, baseFlavor, toppings, specialRequests, quantity, deliveryDate } = cheesecake;
    const date = deliveryDate ? dayjs(deliveryDate).format("MM/DD/YYYY") : null;



    return (
        <div className='container' style={{ marginTop: '80px' }}>
            <h1 className='text-center my-4'>Cheesecake Factory Order Form</h1>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='mt-3'>
                        <label className='form-label'>Name</label>
                        <input type='text' className='form-control' value={name} onChange={onTextChange} name='name' />
                    </div>
                    <div className='mt-3'>
                        <label className='form-label'>Email</label>
                        <input type='text' className='form-control' value={email} onChange={onTextChange} name='email' />
                    </div>

                    <div className='mt-3'>
                        <label className='form-label'>Base Flavor ($49.99)</label>
                        <select onChange={onTextChange} className='form-select' name='baseFlavor' >
                            <option>Choose...</option>
                            {flavors.map(f => (
                                <option key={f} value={f}>{f}</option>
                            ))}
                        </select>
                    </div>

                    <div className='mt-3'>
                        <label className='form-label'>Toppings (each topping adds an additional $3.95)</label>
                        {toppingTypes.map(t => (
                            <div key={t} className='form-check'>
                                <input onClick={() => onCheck(t)} className='form-check-input' type='checkbox' />
                                <label className='form-check-label'>{t} </label>
                            </div>
                        ))}
                    </div>
                    <div className='mt-3'>
                        <label className='form-label'>Special Requests</label>
                        <textarea value={specialRequests} className='form-control' rows='3' onChange={onTextChange} name='specialRequests'></textarea>
                    </div>
                    <div className='mt-3'>
                        <label className='form-label'>Quantity</label>
                        <input value={quantity} type='number' className='form-control' min='1' onChange={onTextChange} name='quantity'></input>
                    </div>
                    <div className='mt-3'>
                        <label className='form-label'>Delivery Date</label>
                        <input value={deliveryDate} type='date' className='form-control' onChange={onTextChange} name='deliveryDate'></input>
                    </div>

                    <button onClick={onSubmitClick} className='btn btn-primary mt-3'>Submit Order</button>



                </div>
                <div className='col-md-6'>
                    <div className="col-md-6 position-sticky" style={{ top: "2rem" }}>
                        <h2 className='mb-4'>Live Preview</h2>
                        <div className='card' width='18rem'>
                            <div className='card-body'>
                                <h5 className='card-title'>Your Custom Cheesecake</h5>
                                <p className='card-text'>Base: {baseFlavor}</p>
                                <p className='card-text'>Toppings:{toppings.join(', ')} </p>
                                <p className='card-text'>Special Requests: {specialRequests}</p>
                                <p className='card-text '>Quantity: {quantity}</p>
                                <p className='card-text'>Delivery Date: {date}</p>
                                <p className='card-text fw-bold'>Total: {`$${price}`}</p>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;

