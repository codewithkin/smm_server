// /controllers/checkout/downloadReceipt.js
import prisma from "../../lib/client.js";
import PDFDocument from "pdfkit";
import { Readable } from "stream";

export const downloadReceipt = async (req, res) => {
  const { id } = req.params;

  try {
    const checkout = await prisma.checkout.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!checkout) {
      return res.status(404).json({ error: "Receipt not found" });
    }

    // Adjust page size for thermal receipt (width: 220pt ~ 3 inches)
    const doc = new PDFDocument({
      size: [220, 600 + checkout.items.length * 20],
      margins: { top: 20, bottom: 20, left: 20, right: 20 },
    });

    const stream = new Readable().wrap(doc);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=receipt_${id}.pdf`,
    );

    stream.pipe(res);

    // Branding Header
    doc.fontSize(16).text("Smart Switch Mobile", { align: "center" });
    doc.fontSize(10).text("Mutare, Zimbabwe", { align: "center" });
    doc.text("📞 +263 78 353 2164", { align: "center" });
    doc.moveDown(0.5);

    doc.moveTo(20, doc.y).lineTo(200, doc.y).strokeColor("#aaaaaa").stroke();
    doc.moveDown();

    // Receipt Meta
    doc.fontSize(12).text(`Receipt #${id.slice(0, 6)}`);
    doc.text(`Date: ${new Date(checkout.createdAt).toLocaleDateString()}`);
    doc.moveDown(0.5);

    doc.moveTo(20, doc.y).lineTo(200, doc.y).strokeColor("#dddddd").stroke();
    doc.moveDown();

    // Items Section
    doc.fontSize(12).text("Items:", { underline: true });

    checkout.items.forEach((item, index) => {
      doc
        .fontSize(10)
        .text(`${index + 1}. ${item.name}`, { continued: true })
        .text(` - ${item.quantity} x $${item.price}`, {
          align: "right",
        });
    });

    doc.moveDown();

    // Divider
    doc.moveTo(20, doc.y).lineTo(200, doc.y).strokeColor("#aaaaaa").stroke();
    doc.moveDown();

    // Total Section
    doc
      .fontSize(12)
      .text("Total:", { continued: true })
      .font("Helvetica-Bold")
      .text(`$${checkout.total.toFixed(2)}`, {
        align: "right",
      });

    doc.moveDown();

    // Footer
    doc.font("Helvetica").fontSize(9).text("Thank you for shopping with us!", {
      align: "center",
    });
    doc.text("Visit again", { align: "center" });

    doc.end();
  } catch (error) {
    console.error("Error generating receipt PDF:", error);
    res.status(500).json({ error: "Failed to generate receipt" });
  }
};
