import type { BuyingCardProps } from "../ui/BuyingCard";

export const POLAR_LINKS = {
  pack100:
    "https://buy.polar.sh/polar_cl_alcPRxitdnCmdjEGDHGfdTJZBwRjCbQpYz2622mrWRS", // Remplace par ton vrai lien
  pack1200:
    "https://buy.polar.sh/polar_cl_EK1lmKkHzYCS3NCT2f780SbxdkhVEVmmHupO94M8SYL", // Remplace par ton vrai lien
  subMonthly:
    "https://buy.polar.sh/polar_cl_xDOmXTz8pJcFaMDk0Z6t6qb6TYEoQfMbSeCeB2tUK0I", // Remplace par ton vrai lien
  subYearly:
    "https://buy.polar.sh/polar_cl_mhl6CmpAYLoxkinPsBaQzOrTfcrBRHCho57Pv3jJ6oM", // Remplace par ton vrai lien
  subTest:
    "https://buy.polar.sh/polar_cl_Zi2fomzJQzNkRZ6ZqTsnfUql80k2d6ex7pnFh3Koo1L", // Remplace par ton vrai lien
  packTest:
    "https://buy.polar.sh/polar_cl_Y3nOmDDOJzvRvmsSV7pMOqX55Uk9LC9MvA2143UM5v6", // Remplace par ton vrai lien
};

export const arrCoint: BuyingCardProps[] = [
  {
    isActive: false,
    coinType: "bronze",
    isSubcription: false,
    price: 19.98,
    productName: "Token",
    description: "100 tokens to generate many videos",
    polarId: ""
  },

  {
    isActive: false,
    isSubcription: false,
    coinType: "silver",
    price: 199.98,
    productName: "Token premium",
    description: "1200 tokens to generate many videos",
    polarId: ""
  },
];

export const arrSubs: BuyingCardProps[] = [
  {
    isActive: true,
    isSubcription: true,
    coinType: "gold",
    price: 39.98,
    productName: "Pro Monthly",
    description:
      "300 tokens per month to generate many video 300 tokens per month \n" +
      "- Priority generation\n" +
      "- Priority access to upcoming new features (automatic social media deployment)\n" +
      "- Photo-to-Video mode\n" +
      "- Priority support\n" +
      "- Watermark-free videos",
    polarId: ""
  },

  {
    isActive: false,
    isSubcription: true,
    price: 399.98,
    coinType: "diamond",
    productName: "Pro Annual",
    description: "300 tokens per month + 2 free month, to generate many videos",
    polarId: ""
  },
];

export const arrProdTest: BuyingCardProps[] = [
  {
    isSubcription: false,
    coinType: "gold",
    price: 39.98,
    productName: "Test token",
    description: "Just a test",
    polarId : "79eddeb7-82d2-4f53-9ef9-2aceca39f415"
  },

  {
    isSubcription: true,
    price: 54.98,
    coinType: "diamond",
    productName: "Test monthly",
    description: "300 tokens per month + 2 free month, to generate many videos",
    polarId: "b332d0ab-28c6-4c0e-87e7-052ce9d9c3ec"
  },
];