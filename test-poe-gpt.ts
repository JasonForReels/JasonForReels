import dotenv from "dotenv";
dotenv.config();

async function run() {
  try {
    const response = await fetch("https://api.poe.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.POE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: "hi" }
        ]
      })
    });
    console.log(response.status);
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}
run();
