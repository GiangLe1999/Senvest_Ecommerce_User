import { CartProduct } from "@/entities/cart-product.entity";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  totalItems: number;
  totalPrice: number;
}

interface Actions {
  addToCart: (Item: CartProduct) => void;
  removeFromCart: (Item: CartProduct) => void;
  subtractFromCart: (Item: CartProduct) => void;
  addMultipleToCart: (Item: CartProduct, quantity: number) => void;
  clearCart: () => void;
}

const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart: (product: CartProduct) => {
        const cart = get().cart;
        const cartItem = cart.find(
          (item) =>
            item._id === product._id && item.variant_id === product.variant_id
        );
        if (cartItem) {
          if (cartItem.quantity === parseInt(cartItem.stock)) {
            return toast.error("Cannot add to cart anymore", {
              description: "This item is out of stock",
              position: "top-right",
            });
          }

          const updatedCart = cart.map((item) =>
            item._id === product._id && item.variant_id === product.variant_id
              ? { ...item, quantity: (item.quantity as number) + 1 }
              : item
          );

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + parseFloat(product.price),
          }));
        } else {
          const updatedCart = [...cart, { ...product, quantity: 1 }];
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + parseFloat(product.price),
          }));
        }
      },
      addMultipleToCart: (product: CartProduct, quantity: number) => {
        const cart = get().cart;

        const cartItem = cart.find(
          (item) =>
            item._id === product._id && item.variant_id === product.variant_id
        );

        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item._id === product._id && item.variant_id === product.variant_id
              ? { ...item, quantity: quantity }
              : item
          );

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems - cartItem.quantity + quantity,
            totalPrice:
              state.totalPrice -
              parseFloat(product.price) * cartItem.quantity +
              parseFloat(product.price) * quantity,
          }));
        } else {
          const updatedCart = [...cart, { ...product, quantity: 1 }];
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + parseFloat(product.price),
          }));
        }
      },
      subtractFromCart: (product: CartProduct) => {
        const cart = get().cart;
        const cartItem = cart.find(
          (item) =>
            item._id === product._id && item.variant_id === product.variant_id
        );

        if (cartItem && cartItem.quantity > 1) {
          const updatedCart = cart.map((item) =>
            item._id === product._id && item.variant_id === product.variant_id
              ? { ...item, quantity: (item.quantity as number) - 1 }
              : item
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - parseFloat(product.price),
          }));
        }

        if (cartItem && cartItem.quantity === 1) {
          set((state) => ({
            cart: state.cart.filter(
              (item) =>
                item._id !== product._id ||
                item.variant_id !== product.variant_id
            ),
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - parseFloat(product.price),
          }));
        }
      },
      removeFromCart: (product: CartProduct) => {
        set((state) => ({
          cart: state.cart.filter((item) => {
            if (
              item._id === product._id &&
              item.variant_id === product.variant_id
            ) {
              return false;
            }
            return true;
          }),
          totalItems: state.totalItems - product.quantity,
          totalPrice:
            state.totalPrice - parseFloat(product.price) * product.quantity,
        }));
      },
      clearCart: () => {
        set(INITIAL_STATE);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
