import { Variant } from "@/entities/variant.entity";
import { type ClassValue, clsx } from "clsx";
import { add } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (
    typeof a !== "object" ||
    typeof b !== "object" ||
    a === null ||
    b === null
  ) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
}

export function getChangedFields({
  initialFormData,
  currentFormData,
}: {
  initialFormData: any;
  currentFormData: any;
}) {
  const changedFields = Object.keys(currentFormData).reduce((acc, key) => {
    const initialValue = initialFormData[key as keyof typeof initialFormData];
    const currentValue = currentFormData[key as keyof typeof currentFormData];

    const isArray = Array.isArray(currentValue) && Array.isArray(initialValue);

    const arraysAreEqual =
      isArray &&
      initialValue.length === currentValue.length &&
      initialValue.every((val: any, index: number) =>
        deepEqual(val, currentValue[index])
      );

    if (
      (!isArray && !deepEqual(initialValue, currentValue)) ||
      (isArray && !arraysAreEqual)
    ) {
      acc[key as keyof typeof currentFormData] = currentValue;
    }

    return acc;
  }, {} as any);

  return changedFields;
}

export function formatCurrencyVND(amount: string | number) {
  // Convert the string to a number
  if (typeof amount === "string") {
    amount = parseFloat(amount);
  }

  if (isNaN(amount)) {
    throw new Error("Invalid number format");
  }

  // Format the number as VND currency
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

const now = new Date();
const utc_timestamp = Date.UTC(
  now.getUTCFullYear(),
  now.getUTCMonth(),
  now.getUTCDate(),
  now.getUTCHours(),
  now.getUTCMinutes(),
  now.getUTCSeconds(),
  now.getUTCMilliseconds()
);

export function getPriceForVariant(variant: Variant): string {
  if (
    !variant?.discountedPrice ||
    !variant?.discountedFrom ||
    !variant?.discountedTo
  ) {
    return variant?.price;
  }

  const discountedFrom = new Date(variant?.discountedFrom).getTime();
  const discountedTo = new Date(variant?.discountedTo).getTime();

  if (utc_timestamp >= discountedFrom && utc_timestamp <= discountedTo) {
    return variant?.discountedPrice;
  } else {
    return variant?.price;
  }
}

export function isDiscounted(variant: Variant): boolean {
  if (
    !variant?.discountedPrice ||
    !variant?.discountedFrom ||
    !variant?.discountedTo
  ) {
    return false;
  }

  const discountedFrom = new Date(variant?.discountedFrom).getTime();
  const discountedTo = new Date(variant?.discountedTo).getTime();

  return utc_timestamp >= discountedFrom && utc_timestamp <= discountedTo;
}
