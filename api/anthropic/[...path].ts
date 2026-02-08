import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { path } = req.query;
  const subPath = Array.isArray(path) ? path.join("/") : path || "";
  const targetUrl = `https://www.right.codes/claude-aws/${subPath}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-api-key": process.env.ANTHROPIC_API_KEY || "sk-65bde8d974b144fb828067de100d9629",
    "anthropic-version": "2023-06-01",
  };

  const response = await fetch(targetUrl, {
    method: req.method,
    headers,
    body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
  });

  const data = await response.text();
  res.status(response.status);
  response.headers.forEach((value, key) => {
    if (!["content-encoding", "transfer-encoding", "content-length"].includes(key.toLowerCase())) {
      res.setHeader(key, value);
    }
  });
  res.send(data);
}
