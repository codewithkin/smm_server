import prisma from "../../lib/client.js";

export default async function login(req, res) {
  try {
    // Get the user's username and password from the request body
    const { username, password } = req.body;

    // Check if the user exists in the prisma db
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    // If the user exists...
    if (user) {
      // ... Check if the password is correct
      const passwordIsCorrect = password === user.password;

      // If the password is correct...
      if (passwordIsCorrect) {
        // ..return a success status and the user in the request body
        return res.status(200).json({ user });
      }

      // Otherwise return an error status and an error messsage
      return res.status(401).json({
        message: `Incorrect password for user ${user.username}, please double-check and try again`,
      });
    }

    // Otherwise...return an error or create the user (dev mode)
    if (process.env.NODE_ENV !== "production") {
      await prisma.user.create({
        data: {
          username: "codewithkin",
          password: "smm2025",
          role: "admin",
        },
      });

      return res.status(400).json({
        message: "User does not exist, user has been created though...",
      });
    }

    res.status(404).json({
      message: "User does not exist, nice try though...",
    });
  } catch (e) {
    console.log("An error occured while logging you in: ", e);

    res.status(400).json({
      message: "An error occured, please try again later",
    });
  }
}
