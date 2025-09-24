export const healthCheck = (req, res) => {
  try {
    res.status(200).json({ message: "OK!", success: true });
  } catch (error) {
    console.error("Error checking health:", error);
    res.status(500).json({ message: "Server error" });
  }
};
