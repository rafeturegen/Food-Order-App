import Meals from "./components/Meals.jsx";
import Header from "./components/Header.jsx";
import { fetchMeals } from "./http.js";
import { useState, useEffect } from "react";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";

function App() {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checkoutIsOpen, setCheckoutlIsOpen] = useState(false);
  const [availableMeals, setavailableMeals] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [userOrders, setUserOrders] = useState([])
  const [bill, setBill] = useState(0);

  useEffect(() => {

    async function fetchAvailableMeals(){

      setIsFetching(true);
      try{

        const meals = await fetchMeals();
        setavailableMeals(meals);
      }catch(error) {

        setError({ message: error.message || 'Failed to fetch meals.' });
      }
    }

    fetchAvailableMeals();
    setIsFetching(false);
  }, [])

  function handleCartClick () {

    setModalIsOpen(!modalIsOpen);
  };

  function handleAddCartClick(name) {

    const clickedMeal = availableMeals.find(meal => meal.name === name);

    if (clickedMeal) {

      setUserOrders(prevOrders => {

        const existingOrder = prevOrders.find(order => order.meal.name === name);

        if (existingOrder) {

          return prevOrders.map(order => 
            order.meal.name === name ? { ...order, quantity: order.quantity + 1 } : order
          );
        } else {

          return [...prevOrders, { meal: clickedMeal, quantity: 1 }];
        }
      });
    }
  }

  function onCheckout(totalPrice) {
    setBill(totalPrice);
    setCheckoutlIsOpen(!checkoutIsOpen);
  }

  function handleCheckoutClick() {
    setModalIsOpen(!modalIsOpen);
    setCheckoutlIsOpen(!checkoutIsOpen);
  }

  function quantityInrease(name) {

    const clickedMeal = availableMeals.find(meal => meal.name === name);

    if (clickedMeal) {

      setUserOrders(prevOrders => {

          return prevOrders.map(order => 
            order.meal.name === name ? { ...order, quantity: order.quantity + 1 } : order
          );
      })
    }
    
  }

  function quantityDecrease(name) {

    const clickedMeal = availableMeals.find(meal => meal.name === name);

    if (clickedMeal) {

      setUserOrders(prevOrders => {
        
        const existingOrder = prevOrders.find(order => order.meal.name === name);
        const existingOrderIndex = userOrders.indexOf(existingOrder)

        if (existingOrder.quantity > 1){
          return prevOrders.map(order => 
            order.meal.name === name ? { ...order, quantity: order.quantity - 1 } : order
          )
        }else{
          return prevOrders.filter(order => order.meal.name !== name);
        }
        ;
      })
    }
    
  }

  return (
    <>
      <Cart cartItems={userOrders} onClose={handleCartClick} isOpen={modalIsOpen} onCheckout={onCheckout} onIncrease={quantityInrease} onDecrease={quantityDecrease}/>
      <Checkout bill={bill} onClose={handleCheckoutClick} isOpen={checkoutIsOpen} userItems={userOrders}/>
      <Header cartQuantity={userOrders.length} onCartClick={handleCartClick}/>
      <main>
      {isFetching && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
        <ul className="flex flex-wrap justify-center w-[75%] mx-auto gap-3 mb-8 h-full">
          {availableMeals.map((meal) => {
            return(
            <li key={meal.id} className="h-[600px]">
              <Meals 
              onAddCart={handleAddCartClick} 
              name={meal.name} 
              price={"$" + meal.price} 
              description={meal.description} 
              image={`http://localhost:3000/${meal.image}`}
              />
            </li>
            )
          })}
        </ul>
      </main>
    </>
  );
}

export default App;
