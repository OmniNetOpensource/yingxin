import type { VercelRequest, VercelResponse } from "@vercel/node";

const TARGET_URL = "https://www.right.codes/claude-aws/v1/messages";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "服务端未配置 ANTHROPIC_API_KEY" });
  }

  const response = await fetch(TARGET_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.text();
  res.status(response.status);

  response.headers.forEach((value, key) => {
    if (!["content-encoding", "transfer-encoding", "content-length"].includes(key.toLowerCase())) {
      res.setHeader(key, value);
    }
  });

  return res.send(data);
}
