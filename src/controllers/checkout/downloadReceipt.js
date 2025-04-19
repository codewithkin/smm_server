import PDFDocument from "pdfkit";
import prisma from "../../lib/client.js";

// Controller to generate and download a receipt PDF
export const downloadReceipt = async (req, res) => {
  const { checkoutId } = req.params; // Checkout ID from the route

  // Fetch the checkout and its items
  const checkout = await prisma.checkout.findUnique({
    where: { id: checkoutId },
    include: { items: true },
  });

  if (!checkout) {
    return res.status(404).json({ message: "Receipt not found" });
  }

  const doc = new PDFDocument();

  // Set response headers for PDF download
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="receipt-${checkoutId}.pdf"`,
  );

  doc.pipe(res);

  // Add content to the PDF
  doc.fontSize(20).text("Receipt", { align: "center" });
  doc.fontSize(12).text(`Receipt ID: ${checkout.id}`, { align: "left" });
  doc.text(`Date: ${new Date(checkout.createdAt).toLocaleDateString()}`, {
    align: "left",
  });
  doc.text(`Total: $${checkout.total.toFixed(2)}`, { align: "left" });
  doc.text("\n");

  // Add a table of items
  doc.text("Items:");
  doc.moveDown();
  checkout.items.forEach((item) => {
    doc.text(
      `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`,
    );
  });

  doc.end(); // End the PDF document and stream it to the client
};
