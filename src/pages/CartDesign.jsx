import { Link } from "react-router-dom";

function CartDesign() {
return ( <main className="min-h-screen bg-stone-50 px-4 py-10 text-gray-900 sm:px-8 lg:px-16"> <div className="mx-auto max-w-6xl"> <div className="mb-10 border-b border-stone-200 pb-6"> <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
INKORA BOOKSTORE </p>


      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Your Cart<span className="text-amber-700">.</span>
      </h1>

      <p className="mt-3 text-sm text-gray-500">
        Your next favourite read is waiting for you.
      </p>
    </div>

    <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Shopping Bag</h2>
          <span className="text-sm text-gray-500">Your books</span>
        </div>

        <div className="flex flex-col gap-5 border-b border-stone-200 pb-6 sm:flex-row">
          <div className="flex h-40 w-28 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-sm font-bold tracking-widest text-amber-800">
            INKORA
          </div>

          <div className="flex flex-1 flex-col justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Featured selection
              </p>
              <h3 className="mt-2 text-lg font-semibold">Your next great read</h3>
              <p className="mt-1 text-sm text-gray-500">
                Your selected book will appear here.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center rounded-full border border-stone-200">
                <button
                  type="button"
                  disabled
                  className="h-10 w-10 text-gray-400"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="px-3 text-sm">1</span>
                <button
                  type="button"
                  disabled
                  className="h-10 w-10 text-gray-400"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <span className="text-sm text-gray-500">
                Connect your cart data to display prices.
              </span>
            </div>
          </div>
        </div>

        <Link
          to="/products"
          className="mt-6 inline-flex text-sm font-semibold text-amber-800 transition hover:text-amber-600"
        >
          ← Continue shopping
        </Link>
      </section>

      <aside className="h-fit rounded-2xl bg-gray-950 p-6 text-white sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
          Order summary
        </p>

        <h2 className="mt-3 text-2xl font-semibold">Almost yours.</h2>

        <div className="mt-8 space-y-4 border-b border-white/15 pb-6 text-sm">
          <div className="flex justify-between gap-4 text-gray-300">
            <span>Subtotal</span>
            <span>Calculated from your cart</span>
          </div>

          <div className="flex justify-between gap-4 text-gray-300">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-widest text-gray-400">
            Total
          </p>
          <p className="mt-2 text-3xl font-semibold">₹ —</p>
        </div>

        <button
          type="button"
          disabled
          className="mt-8 w-full rounded-full bg-amber-500 px-5 py-4 text-sm font-bold text-gray-950 opacity-60"
        >
          CHECKOUT — COMING SOON
        </button>

        <p className="mt-4 text-center text-xs leading-5 text-gray-400">
          Your reading journey begins here.
        </p>
      </aside>
    </div>
  </div>
</main>


);
}

export default CartDesign;
