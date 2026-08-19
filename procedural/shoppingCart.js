/**
 * Shopping Cart — Procedural Programming version.
  *
   * State lives in a global array, and free-standing functions operate
    * directly on that shared state. This is intentionally "procedural":
     * no encapsulation, no modules, no classes — just data + functions.
      */

      // Global variable holding the cart data
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

      // --- Demo / manual checks -------------------------------------------------
      addItem("Apple", 2, 1.5);
      addItem("Orange", 3, 2.0);
      viewCart(); // Apple (x2) - 3.00 TND Orange (x3) - 6.00 TND Total: 9.00 TND

      removeItem("Apple");
      viewCart(); // Orange (x3) - 6.00 TND Total: 6.00 TND

      module.exports = { addItem, removeItem, clearCart, viewCart, getTotal };
