export default async function handler(req, res) {
  const { method } = req;
  let { url } = req.query;

  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  switch (method) {
    case "GET":
      try {
        if (!url.includes("http://") && !url.includes("https://")) {
          url = "https://" + url;
        }

        console.log(`encodeURI(url)`, encodeURI(url));

        const response = await fetch(encodeURI(url));
        const html = await response.text();
        res.status(200).json({ html });
      } catch (error) {
        console.error("Error fetching HTML:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;
    default:
      res.status(400).json({ success: false, error: `Unhandled request method: ${method}` });
      break;
  }
}
