import fetch from "node-fetch";

export default async function handler(req, res) {
  const { cameraId } = req.query;

  if (!cameraId) {
    return res.status(400).json({ error: "cameraId is required" });
  }

  const streamUrl = `http://18.220.202.145/hls/${cameraId}.m3u8`;

  try {
    const response = await fetch(streamUrl);

    if (!response.ok) {
      return res.status(502).json({ error: "Failed to fetch stream" });
    }

    if (!response.body) {
      return res.status(500).json({ error: "No stream body returned" });
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");

    response.body.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
