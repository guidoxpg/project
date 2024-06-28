export const extractShipmentDataTool = {
    name: "extract_shipment_data",
    description: "Extract structured data from a shipment note text.",
    input_schema: {
      type: "object",
      properties: {
        documentDetails: {
          type: "object",
          properties: {
            DOCUMENT_NUMBER: { type: "string" }
          },
          required: ["DOCUMENT_NUMBER"]
        },
        purchase_order_lines: {
          type: "array",
          items: {
            type: "object",
            properties: {
              purchase_order_id: { type: "string" },
              sender_product_code: { type: "string" },
              receiver_product_code: { type: "string" },
              description: { type: "string" },
              quantity: { type: "number" },
              quantity_ordered: { type: "number" },
              due_date: { type: "string", format: "date-time" }
            },
            required: ["purchase_order_id", "sender_product_code", "receiver_product_code", "description", "quantity", "quantity_ordered", "due_date"]
          }
        }
      },
      required: ["documentDetails", "purchase_order_lines"]
    }
  };