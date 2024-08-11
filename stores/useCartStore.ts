import { CartProduct } from "@/entities/cart-product.entity";
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
    }),
    {
      name: "cart-storage",
    }
  )
);
