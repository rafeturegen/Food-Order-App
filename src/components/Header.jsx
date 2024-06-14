import logoIMG from "../assets/logo.jpg";

export default function Header({ onCartClick, cartQuantity}) {

    return (
        <header className="flex justify-between mt-8 mb-24 mx-20">
            <div className="flex gap-2">
                <img className="w-max h-12 mt-2 rounded-3xl border-amber-400 border-2" src={logoIMG} alt="React food image"/>
                <h2 className="text-3xl text-amber-400 mt-3 tracking-wider font-mono">REACTFOOD</h2>
            </div>
            <div className="mt-5 mr-12">
                <button onClick={onCartClick}>
                    <p className="text-amber-400 text-l mr-8">Cart({cartQuantity})</p>
                </button>
            </div>
        </header>
    )
}