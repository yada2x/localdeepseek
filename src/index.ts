import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import ollama from 'ollama';

const app = express();
const port = 3000;
const LLM_MODEL = 'deepseek-r1:1.5b';

app.use(cors({
    origin: ['http://127.0.0.1:8080', 'http://172.17.10.32:8080'],
}));

app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
    const { prompt } = req.body;

    try {
        let promptResponse = '';
        const streamResponse = await ollama.chat({
            model: LLM_MODEL,
            messages: [{ role: 'user', content: prompt }],
            stream: true,
        });

        for await (const part of streamResponse) {
            promptResponse += part.message.content;
            res.write(part.message.content);
        }

        res.end();
    } catch (err) {
        console.error('Error generating response:', err);
        res.status(500).json({ error: 'Error generating response' });
    }
});

app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
