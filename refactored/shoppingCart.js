/**
 * Shopping Cart — refactored using the Module Pattern.
  *
   * The procedural version stored cart data in a global variable that any
    * code could read or mutate directly, and any script could accidentally
     * clobber. Here, all cart state and logic are encapsulated in a closure
      * (an IIFE) and only exposed through a small, deliberate public API.
       * Nothing outside this module can touch `cart` directly anymore.
        */
        const ShoppingCart = (function () {
        // Private state — inaccessible from outside the closure
        let cart = [];

        function addItem(name, quantity, price) {
        const existing = cart.find((item) => item.name === name);

        if (existing) {
        existing.quantity += quantity;
        } else {
        cart.push({ name, quantity, price });
        }
        }

        function removeItem(name) {
        cart = cart.filter((item) => item.name !== name);
        }

        function clearCart() {
        cart = [];
        }

        function getTotal() {
        return cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
        }

        function viewCart() {
        if (cart.length === 0) {
        console.log("Cart is empty");
        return;
        }

        const lines = cart.map(
        (item) => `${item.name} (x${item.quantity}) - ${(item.quantity * item.price).toFixed(2)} TND`
        );
        const total = getTotal().toFixed(2);

        console.log(`${lines.join(" ")} Total: ${total} TND`);
        }

        // Public API — the only surface the outside world can interact with
        return {
        addItem,
        removeItem,
        clearCart,
        viewCart,
        getTotal,
        };
        })();

        // --- Demo / manual checks -------------------------------------------------
        ShoppingCart.addItem("Apple", 2, 1.5);
        ShoppingCart.addItem("Orange", 3, 2.0);
        ShoppingCart.viewCart(); // Apple (x2) - 3.00 TND Orange (x3) - 6.00 TND Total: 9.00 TND

        ShoppingCart.removeItem("Apple");
        ShoppingCart.viewCart(); // Orange (x3) - 6.00 TND Total: 6.00 TND

        module.exports = ShoppingCart;
