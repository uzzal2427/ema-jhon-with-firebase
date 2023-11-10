import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const { totalProducts } = useLoaderData()
    const [itemsPerPage, setItemsPerPage] = useState(10); // 

    const totalPages = Math.ceil(totalProducts / itemsPerPage)

    const pageNumbers = [...Array(totalPages).keys()]

    /** alt 
     * const pageNumber = [];
     * for(i = 0 ; i < totalPage ; i++){
     * pageNumber.push(i)
     * }
     * 
     * */
    // console.log(pageNumbers);
    const options = [5, 10, 20];
    const handleSelectChange = event => {
        setItemsPerPage(parseInt(event.target.value))
        setCurrentPage(0)
    }

    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make an API request with the current page and items per page
                const response = await fetch(
                    `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
                );

                // Check if the request was successful
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the JSON response
                const fetchedData = await response.json();

                // Update the state with the fetched data
                setProducts(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle errors as needed
            }
        };

        // Call the fetch data function
        fetchData();
    }, [currentPage, itemsPerPage]); // Include dependencies that trigger the effect when they change


    useEffect(() => {
        const storedCart = getShoppingCart();
        const idS = Object.keys(storedCart);
        console.log(idS);

        fetch('http://localhost:5000/productByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(idS)
        })
            .then(res => res.json())
            .then(data => {
                const savedCart = [];
                // step 1: get id of the addedProduct
                for (const id in storedCart) {
                    // step 2: get product from products state by using id
                    const addedProduct = products.find(product => product._id === id)
                    if (addedProduct) {
                        // step 3: add quantity
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        // step 4: add the added product to the saved cart
                        savedCart.push(addedProduct);
                    }
                    // console.log('added Product', addedProduct)
                }
                // step 5: set the cart
                setCart(savedCart);
            })

    }, [])

    const handleAddToCart = (product) => {
        // cart.push(product); '
        let newCart = [];
        // const newCart = [...cart, product];
        // if product doesn't exist in the cart, then set quantity = 1
        // if exist update quantity by 1
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }

        setCart(newCart);
        addToDb(product._id)
    }
    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <>
            <div className='shop-container'>
                <div className="products-container">
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart
                        clearCart={clearCart}
                        cart={cart}
                    ></Cart>
                </div>
            </div>
            <div className="pagination">
                <p>current page : {currentPage}</p>
                {
                    pageNumbers.map(num => <button
                        onClick={() => setCurrentPage(num)}
                        key={num}
                        className={`btn btn-active btn-ghost mr-2 ${currentPage === num ? 'bg-amber-500' : ''}`}>{num}</button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option => (
                            <option
                                key={option}
                                value={option}
                            >
                                {option}
                            </option>
                        ))
                    }
                </select>
            </div>
        </>
    );
};

export default Shop;