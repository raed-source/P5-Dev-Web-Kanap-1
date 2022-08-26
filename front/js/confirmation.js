let order = JSON.parse(localStorage.getItem("order"));

fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },

    body: JSON.stringify(order),
})
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then((value) => {
        document.getElementById("orderId").innerHTML = value.orderId;
        localStorage.removeItem("order");
    });
