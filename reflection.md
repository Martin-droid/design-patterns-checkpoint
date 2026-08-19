# Reflection Report

## What challenges did you face during the refactor?

The biggest challenge was deciding where the boundary of the "module" should
be. In the procedural version, the cart array and every helper function sat
at the top level of the file, so any other script sharing that scope could
read or overwrite `cart` directly. Moving that into a Module Pattern meant
wrapping everything in an IIFE and being deliberate about which functions to
expose from the closure, while keeping helpers like `getTotal` — which
`viewCart` depends on internally — available inside it.

## How did using a design pattern improve the code?

The refactored version protects its own state. `cart` is now a private
variable that only the module's own functions can touch — nothing outside
`ShoppingCart` can accidentally set `cart = null` or push malformed items
into it. Consumers of the module only see `addItem`, `removeItem`,
`clearCart`, `viewCart`, and `getTotal`, so the internal representation of a
cart item can change later without breaking anyone who depends on the public
API. It also removes global-scope pollution entirely — the procedural
version's `cart` variable and five functions all lived in the global/module
scope, while the refactored version only exposes a single `ShoppingCart`
object.

## When would you choose a design pattern over procedural code?

Procedural code is fine for small scripts, prototypes, or one-off utilities
where nothing else needs protecting from the state. Once multiple files,
developers, or features depend on the same data, a pattern like Module
becomes worth the structure: it prevents accidental mutation, makes the
intended API explicit, and lets the internal implementation change later
without breaking callers.
