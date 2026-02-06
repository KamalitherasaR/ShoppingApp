let cart = [];

// CART ICON
const cartIcon = document.getElementById("ct");
const headerH2 = cartIcon.parentElement;
headerH2.style.position = "relative";

// COUNT BADGE
const countBadge = document.createElement("span");
countBadge.textContent = "0";
countBadge.style.position = "absolute";
countBadge.style.top = "0px";
countBadge.style.right = "60px";
countBadge.style.background = "#222";
countBadge.style.color = "#00ffcc";
countBadge.style.borderRadius = "50%";
countBadge.style.fontSize = "12px";
countBadge.style.padding = "2px 6px";
countBadge.style.display = "none";
countBadge.style.zIndex = "1000";
countBadge.style.boxShadow = "0 0 6px #00ffcc";
countBadge.style.fontWeight = "bold";

headerH2.appendChild(countBadge);


// CART SIDE PANEL
const cartPanel = document.createElement("div");
cartPanel.style.position = "fixed";
cartPanel.style.top = "0";
cartPanel.style.right = "-360px";
cartPanel.style.width = "360px";
cartPanel.style.height = "100vh";
cartPanel.style.background = "white";
cartPanel.style.padding = "20px";
cartPanel.style.boxShadow = "-2px 0 10px rgba(0,0,0,0.3)";
cartPanel.style.transition = "0.3s";
cartPanel.style.zIndex = "9999";

cartPanel.innerHTML = `
    <h2>Your Cart</h2>
    <div id="cart-items"></div>
    <h3 id="cart-total">Total: Rs. 0</h3>
    <button id="order-btn">Place Order</button>
`;

document.body.appendChild(cartPanel);

const cartItemsDiv = cartPanel.querySelector("#cart-items");
const totalDiv = cartPanel.querySelector("#cart-total");
const orderBtn = cartPanel.querySelector("#order-btn");

// ADD TO CART
document.querySelectorAll("button").forEach(button => {
    if (button.innerText.includes("Add to Cart")) {
        button.addEventListener("click", () => {
            const card = button.parentElement;
            const imgSrc = card.querySelector("img").src;
            const name = card.querySelectorAll("h3")[0].innerText;
            const price = Number(
                card.querySelectorAll("h3")[1].innerText.replace("Rs.", "")
            );

            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.qty += 1;
            } else {
                cart.push({ name, price, imgSrc, qty: 1 });
            }

            updateCart();
        });
    }
});

// UPDATE CART UI
function updateCart() {
    cartItemsDiv.innerHTML = "";
    let total = 0;
    let totalQty = 0;

    cart.forEach(item => {
        const subTotal = item.price * item.qty;
        total += subTotal;
        totalQty += item.qty;

        const itemDiv = document.createElement("div");
        itemDiv.style.display = "flex";
        itemDiv.style.alignItems = "center";
        itemDiv.style.marginBottom = "10px";
        itemDiv.style.borderBottom = "1px solid #ccc";
        itemDiv.style.paddingBottom = "8px";

        itemDiv.innerHTML = `
            <img src="${item.imgSrc}" style="width:60px;height:60px;border-radius:10px;margin-right:10px;">
            <div>
                <p style="margin:0;font-weight:bold;">${item.name}</p>
                <p style="margin:0;">Qty: ${item.qty}</p>
                <p style="margin:0;">Rs. ${subTotal}</p>
            </div>
        `;

        cartItemsDiv.appendChild(itemDiv);
    });

    totalDiv.textContent = `Total: Rs. ${total}`;
    countBadge.textContent = totalQty;
    countBadge.style.display = totalQty > 0 ? "inline-block" : "none";
}

// OPEN / CLOSE CART
cartIcon.addEventListener("click", () => {
    cartPanel.style.right =
        cartPanel.style.right === "0px" ? "-360px" : "0px";
});

// PLACE ORDER
orderBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    alert("Order placed successfully 🎉");
    cart = [];
    updateCart();
    cartPanel.style.right = "-360px";
});
