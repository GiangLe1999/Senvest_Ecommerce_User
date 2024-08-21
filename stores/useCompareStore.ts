import { CompareProduct } from "@/entities/compare-product.entity";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  items: CompareProduct[];
}

interface Actions {
  addToCompare: (item: CompareProduct) => void;
  removeFromCompare: (item: CompareProduct) => void;
  clearCompare: () => void;
}

const INITIAL_STATE: State = {
  items: [],
};

export const useCompareStore = create(
  persist<State & Actions>(
    (set, get) => ({
      items: INITIAL_STATE.items,
      addToCompare: (item: CompareProduct) => {
        const items = get().items;
        const compareItem = items.find(
          (i) => i._id === item._id && i.variant_id === item.variant_id
        );
        const isVi = item.locale === "vi";

        if (compareItem) {
          toast.error(
            isVi
              ? "Sản phẩm này đã có trong so sánh rồi"
              : "This item is already in comparison",
            {
              description: isVi
                ? "Vui lòng loại bỏ trước khi thêm vào so sánh."
                : "Please remove it from compare first.",
            }
          );
          return;
        }

        set((state) => ({
          items: [...state.items, item],
        }));

        toast.success(
          isVi ? "Đã thêm vào so sánh" : "Item added to products comparison",
          {
            description: isVi
              ? "Kiểm tra danh sách so sánh của bạn ngay bây giờ."
              : "Check your comparison list now.",
            action: {
              label: isVi ? "Xem so sánh" : "View comparison",
              onClick: () => {
                window.location.href = `/${item.locale}/${
                  isVi ? "so-sanh" : "compare"
                }`;
              },
            },
          }
        );
      },
      removeFromCompare: (item: CompareProduct) => {
        set((state) => ({
          items: state.items.filter(
            (i) => i._id !== item._id || i.variant_id !== item.variant_id
          ),
        }));
      },
      clearCompare: () => {
        set(() => ({
          items: [],
        }));
      },
    }),
    {
      name: "compare-storage",
    }
  )
);
