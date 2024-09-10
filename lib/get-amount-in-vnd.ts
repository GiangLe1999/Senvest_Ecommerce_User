import axios from "axios";

export const getAmountInVND = async (
  usdAmount: number
): Promise<number | null> => {
  try {
    const url = process.env.NEXT_PUBLIC_EXCHANGE_RATE_URL as string;
    const response = await axios.get(url, {
      responseType: "text",
    });

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, "application/xml");
    const usdElement = xmlDoc.querySelector('Exrate[CurrencyCode="USD"]');

    if (usdElement) {
      const transferRate = usdElement.getAttribute("Transfer");
      if (transferRate) {
        const transferRateNumber = parseFloat(transferRate.replace(/,/g, ""));
        const vndAmount = usdAmount * transferRateNumber;
        return Math.round(vndAmount);
      }
    }

    return null;
  } catch (error) {
    console.error("Error fetching or parsing XML:", error);
    return null;
  }
};
