import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // provide SSE stream

  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*"); // CORS設定（適宜調整）
  res.setHeader('Content-Encoding', 'none') // disable compression this is important
  // クライアントにイベントを送信する関数
  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };
  // イベントを定期的に送信
  const interval = setInterval(() => {
    const message = {
      time: new Date().toTimeString(),
      msg: "Hello from the server!",
    };
    sendEvent(message);
  }, 2000);
  // 接続が閉じられた場合の処理
  req.on("close", () => {
    clearInterval(interval);
    res.end();
  });

}
