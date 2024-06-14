import Modal from "./Modal.jsx";

export default function Cart({isOpen, onClose, cartItems, onCheckout, onIncrease, onDecrease}) {

    let totalPrice = 0;

    for (let i = 0; i < cartItems.length; i++) {

        totalPrice += cartItems[i].meal.price * cartItems[i].quantity;
    }

    return (
        <Modal open={isOpen}>
            <h2 className="text-slate-900 font-bold mx-1 mt-2 text-xl">Your Cart</h2>
            <ul className="flex flex-col mt-2">
                {cartItems.length === 0 && <p>Your cart is empty.</p>}
                {cartItems.map(cartItem => {
                    return(
                        <li key={cartItem.meal.id} className="flex justify-between mx-1">
                            <div>
                                <p>{cartItem.meal.name}</p>                  
                            </div>
                            <div className="flex gap-2">
                                <button className="bg-zinc-800 text-slate-200 rounded-xl w-6" onClick={() => onDecrease(cartItem.meal.name)}>-</button>
                                <p>{cartItem.quantity}</p>
                                <button className="bg-zinc-800 text-slate-200 rounded-xl w-6" onClick={() => onIncrease(cartItem.meal.name)} >+</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <p className="flex justify-end mt-2 font-black">
                ${totalPrice}
            </p>
            <div className="flex justify-end gap-4 mt-4">
                <button type="button" onClick={onClose}>Close</button>
                <button className="bg-amber-400 rounded-md p-1" onClick={()=> onCheckout(totalPrice)} disabled={cartItems.length === 0 ? true : false}>Go to Chechkout</button>
            </div>
        </Modal>
    )
}