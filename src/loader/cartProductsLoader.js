import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async()=>{

    const storedCart = getShoppingCart();
    const idS = Object.keys(storedCart);
    console.log(idS);

    const cartProducts = await fetch('http://localhost:5000/productByIds',{
        method: 'POST',
        headers:{
            'content-type' : 'application/json'
        },
        body: JSON.stringify(idS)
    })
    const products = await cartProducts.json()


    const savedCart = [];
    // step 1: get id of the addedProduct
    for(const id in storedCart){
        // step 2: get product from products state by using id
        const addedProduct = products.find(product => product._id === id)
        if(addedProduct){
            // step 3: add quantity
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            // step 4: add the added product to the saved cart
            savedCart.push(addedProduct);
        }
        // console.log('added Product', addedProduct)
    }

    return savedCart ;

}

export default cartProductsLoader