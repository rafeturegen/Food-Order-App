export async function fetchMeals() {

    const response = await fetch("http://localhost:3000/meals");
    const resData = await response.json();

    if (!response.ok) {
        throw new Error("Could not fetch");
    }

    return resData;
}

export async function updateOrders(customerData, userOrders) {

    const response = await fetch("http://localhost:3000/orders", {
        method:"POST",
        body:JSON.stringify({
            order:{
                items:userOrders,
                customer:customerData,
            }
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to update user data.');
    }

    return resData.message;
}
