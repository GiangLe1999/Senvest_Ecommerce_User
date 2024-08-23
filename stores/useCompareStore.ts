import { CompareProduct } from "@/entities/compare-product.entity";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  items: CompareProduct[];
}

interface Actions {
  addToCompare: (item: CompareProduct) => void;
  removeFromCompare: ({
    _id,
    variant_id,
  }: {
    _id: string;
    variant_id: string;
  }) => void;
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
        const isVi = item.locale === "vi";

        const items = get().items;
        if (items.length >= 5) {
          return toast.error(
            isVi ? "Không thể thêm được nữa" : "Can not add anymore",
            {
              description: isVi
                ? "Chỉ có thể thêm tối đa 5 sản phẩm để so sánh."
                : "Can not add more than 5 items to compare.",
            }
          );
        }

        const compareItem = items.find(
          (i) => i._id === item._id && i.variant_id === item.variant_id
        );

        if (compareItem) {
          return toast.error(
            isVi
              ? "Sản phẩm này đã có trong so sánh rồi"
              : "This item is already in comparison",
            {
              description: isVi
                ? "Vui lòng loại bỏ trước khi thêm vào so sánh."
                : "Please remove it from compare first.",
            }
          );
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
      removeFromCompare: ({
        _id,
        variant_id,
      }: {
        _id: string;
        variant_id: string;
      }) => {
        set((state) => ({
          items: state.items.filter(
            (i) => i._id !== _id || i.variant_id !== variant_id
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
