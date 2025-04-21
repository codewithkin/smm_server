import prisma from "../../lib/client.js";
import PDFDocument from "pdfkit";
import { Readable } from "stream";

export const downloadReceipt = async (req, res) => {
  const { id } = req.params;

  try {
    const checkout = await prisma.checkout.findUnique({
      where: { id },
      include: {
        items: true,
        customer: true, // if you want to include customer info
      },
    });

    if (!checkout) {
      return res.status(404).json({ error: "Receipt not found" });
    }

    // Create a new PDF document
    const doc = new PDFDocument();
    const stream = new Readable().wrap(doc);

    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=receipt_${id}.pdf`,
    );

    // Pipe the PDF into the response
    stream.pipe(res);

    // Build PDF content
    doc.fontSize(18).text(`Receipt #${id.slice(0, 6)}`, { underline: true });
    doc.moveDown();
    doc
      .fontSize(14)
      .text(`Date: ${new Date(checkout.createdAt).toLocaleDateString()}`);
    doc.text(`Total: $${checkout.total.toFixed(2)}`);
    doc.text(`Source: ${checkout.source}`);
    doc.moveDown();

    doc.fontSize(16).text("Items:");
    checkout.items.forEach((item, index) => {
      doc
        .fontSize(12)
        .text(`${index + 1}. ${item.name} - ${item.quantity} x $${item.price}`);
    });

    doc.end();
  } catch (error) {
    console.error("Error generating receipt PDF:", error);
    res.status(500).json({ error: "Failed to generate receipt" });
  }
};
