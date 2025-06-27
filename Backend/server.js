import express from 'express'
import { config } from "dotenv";
import cors from 'cors'
config();

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

app.get('/', (req, res) => {
  res.send('hello world')
})

import OpenAI from "openai";

const token = process.env["APIKEY"];
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

app.post('/chat', async (req, res) => {
  const { transcript } = req.body;
  const userresponse = transcript;

  const client = new OpenAI({ baseURL: endpoint, apiKey: token });
  console.log(userresponse);

  try {
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "you are interviewer" },
        { role: "user", content: userresponse }
      ],
      temperature: 1.0,
      top_p: 1.0,
      model: model,
    });
    
    const reply = response.choices[0]?.message?.content;
    res.status(200).json({ reply });
    console.log(reply);
    
  } catch (error) {

    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'Failed to get response from OpenAI' });
  }
});

app.listen(port, () => {
  console.log(`The server is live at http://localhost:${port}`)
})