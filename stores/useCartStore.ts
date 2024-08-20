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

        const isVi = product.locale === "vi";

        if (cartItem) {
          if (cartItem.quantity === parseInt(cartItem.stock)) {
            return toast.error(
              isVi
                ? "Số lượng thêm đã vượt quá tồn kho"
                : "The quantity added has exceeded the stock",
              {
                description: isVi
                  ? `Bạn chỉ có thể thêm tối đa ${cartItem.stock} sản phẩm.`
                  : `You can only add up to ${cartItem.stock} products.`,
                position: "top-right",
              }
            );
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

          toast.success(isVi ? "Đã thêm vào giỏ hãng" : "Item added to cart", {
            description: isVi
              ? "Kiểm tra giỏ hãng của bạn ngay."
              : "Check your cart now.",
            action: {
              label: isVi ? "Xem giỏ hãng" : "Go to cart",
              onClick: () =>
                (window.location.href = `/${product.locale}/${
                  isVi ? "gio-hang" : "cart"
                }`),
            },
            position: "top-right",
          });
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

        const isVi = product.locale === "vi";

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

          toast.success(isVi ? "Đã thêm vào giỏ hãng" : "Item added to cart", {
            description: isVi
              ? "Kiểm tra giỏ hãng của bạn ngay."
              : "Check your cart now.",
            action: {
              label: isVi ? "Xem giỏ hãng" : "Go to cart",
              onClick: () =>
                (window.location.href = `/${product.locale}/${
                  isVi ? "gio-hang" : "cart"
                }`),
            },
            position: "top-right",
          });
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
