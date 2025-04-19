import prisma from "../../lib/client.js";

export default async function getAllNotifications(req, res) {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: {
        createdAt: "desc", // Latest notifications first
      },
    });

    return res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching notifications.",
    });
  }
}
