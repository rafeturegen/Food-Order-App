export default function Meals({image, description, name, price, onAddCart}) {
    return(
        <section className="flex flex-col gap-1 items-center bg-zinc-900 overflow-hidden w-72 rounded-md h-full">
            <img className="h-64 w-full" src={image} alt={description} />
            <h2 className="font-xl font-semibold my-1">{name}</h2>
            <h2 className="bg-[#29251c] w-1/4 text-center py-1 text-amber-400 text-sm mb-2">{price}</h2>
            <p className="text-center mb-2 max-w-[90%] h-[100px] break-words text-sm">{description}</p>
            <button onClick={() => onAddCart(name)} className=" mb-2 rounded-lg bg-amber-400 text-stone-950  py-1 px-4">
                Add to Cart
            </button>
        </section>
    )
}