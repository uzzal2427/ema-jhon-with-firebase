import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async()=>{
    const cartProducts = await fetch('products.json')
    const products = await cartProducts.json()

    const storedCart = getShoppingCart();
    const savedCart = [];
    // step 1: get id of the addedProduct
    for(const id in storedCart){
        // step 2: get product from products state by using id
        const addedProduct = products.find(product => product.id === id)
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