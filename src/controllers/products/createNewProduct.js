import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import slugify from "slugify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      description,
      price,
      discountPrice,
      inStock,
      storage,
      color,
      network,
      simType,
      condition,
      isFeatured,
      isNewArrival,
    } = req.body;

    if (!name || !price || !inStock) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const validConditions = ["New", "Refurbished"];

    const normalizedCondition = validConditions.find(
      (c) => c.toLowerCase() === condition.toLowerCase(),
    );

    if (!normalizedCondition) {
      return res.status(400).json({ message: "Invalid product condition" });
    }

    let imageUrl = null;
    if (req.file) {
      const uploadsDir = path.join(__dirname, "../uploads");

      // ✅ Ensure directory exists
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const filename = `${Date.now()}-${req.file.originalname}`;
      const filePath = path.join(uploadsDir, filename);

      fs.writeFileSync(filePath, req.file.buffer);
      imageUrl = `/uploads/${filename}`;
    }

    // Generate a slug based on the name
    let baseSlug = slugify(name, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    // Ensure uniqueness
    while (await prisma.product.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        brand,
        category,
        description,
        price: parseFloat(price),
        discountPrice: discountPrice ? parseFloat(discountPrice) : null,
        inStock: parseInt(inStock),
        storage,
        color,
        network,
        simType,
        condition: normalizedCondition,
        isFeatured: isFeatured === "true",
        isNewArrival: isNewArrival === "true",
        images: imageUrl ? [imageUrl] : [],
      },
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Something went wrong." });
  }
};
