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
        model: "gemini-2.5-flash",
        messages: [
          { role: "user", content: "Search the web to find the most recent tweets by the user jasonforreels on Twitter/X, and return just the numerical IDs of their 5 most recent tweets as a JSON array of strings. Do not include any other text." }
        ],
        tool_web_search: true
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
