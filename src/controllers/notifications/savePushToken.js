import prisma from "../../lib/client.js";

// Route to save the Expo push token
export default async function savePushToken(req, res) {
  try {
    const { token, username } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }cl

    // Update the user's push token in the database
    await prisma.user.update({
      where: { username },
      data: { expoPushToken: token },
    });

    return res.status(200).json({ message: "Push token saved successfully" });
  } catch (error) {
    console.error("Error saving push token:", error);
    return res.status(500).json({
      message: "An error occurred while saving the push token",
    });
  }
}
