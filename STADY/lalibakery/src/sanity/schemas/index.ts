/**
 * Sanity schema shapes (portable). Wire to sanity CLI when projectId exists.
 * GROQ queries must use parameters only — never string concatenation.
 */

export const productSchema = {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    { name: "title", type: "string", validation: "required" },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "shortDescription", type: "text" },
    { name: "description", type: "text" },
    {
      name: "category",
      type: "string",
      options: {
        list: ["collection", "gift-set", "service", "exclusive"],
      },
    },
    { name: "tags", type: "array", of: [{ type: "string" }] },
    { name: "image", type: "image" },
    {
      name: "imageCredit",
      type: "string",
      options: { list: ["real", "mockup"] },
    },
    { name: "featured", type: "boolean" },
    {
      name: "variants",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "sku", type: "string" },
            { name: "priceIls", type: "number" },
            { name: "compareAtIls", type: "number" },
            { name: "stock", type: "number" },
          ],
        },
      ],
    },
  ],
};

export const orderSchema = {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    { name: "orderNumber", type: "string" },
    { name: "customerName", type: "string" },
    { name: "phone", type: "string" },
    { name: "email", type: "string" },
    { name: "shippingAddress", type: "text" },
    { name: "lines", type: "array", of: [{ type: "object" }] },
    { name: "subtotalIls", type: "number" },
    { name: "discountIls", type: "number" },
    { name: "shippingIls", type: "number" },
    { name: "totalIls", type: "number" },
    { name: "couponCode", type: "string" },
    { name: "paymentMethod", type: "string" },
    { name: "status", type: "string" },
    { name: "userId", type: "string" },
  ],
};

export const siteSettingsSchema = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "brandName", type: "string" },
    { name: "shippingFlatIls", type: "number" },
    { name: "freeShippingFromIls", type: "number" },
    { name: "launchCouponCode", type: "string" },
    { name: "launchCouponPercent", type: "number" },
    { name: "whatsapp", type: "string" },
  ],
};
