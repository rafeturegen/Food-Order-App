import Modal from "./Modal.jsx";
import { updateOrders } from "../http.js";

export default function Checkout({isOpen, onClose, bill, userItems}){

    function handleSubmit(event) {

        event.preventDefault();

        const fd = new FormData(event.target);

        const data = Object.fromEntries(fd.entries());

        updateOrders(data, userItems);
    }

    return (
        <Modal open={isOpen}>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold">Checkout</h2>
                <p className="text-sm mt-3 mb-1">Total amount ${bill}</p>
                <label htmlFor="name" className="mt-2 font-bold text-sm">Full Name</label>
                <input type="text" name="name" className="rounded-sm w-60 mt-1" required/>
                <label htmlFor="email" className="mt-2 font-bold text-sm">E-Mail Address</label>
                <input type="email" name="email" className="rounded-sm w-60 mt-1" required/>    
                <label htmlFor="street" className="mt-2 font-bold text-sm">Street</label>
                <input type="text" name="street"className="rounded-sm w-60 mt-1" required/>
                <div className="flex gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="postal" className="mt-2 font-bold text-sm">Postal Code</label>
                        <input type="text" name="postal" className="rounded-sm w-30 mt-1" required/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="city" className="mt-2 font-bold text-sm">City</label>
                        <input type="text" name="city" className="rounded-sm w-30 mt-1" required/>
                    </div>
                </div>
                <div className="flex justify-end mt-6 gap-4">
                    <button className="h-10" onClick={onClose}>Close</button>
                    <button className="bg-amber-400 rounded-md h-10 py-1 px-4" type="submit">Submit Order</button>
                </div>
            </form>
        </Modal>
    )
}