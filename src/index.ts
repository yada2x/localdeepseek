import ollama from 'ollama';
const LLM_MODEL = 'deepseek-r1:1.5b';

async function generateResponse(prompt: string): Promise<string> {
    let promptResponse = '';

    try {
        const streamResponse = await ollama.chat({
            model: LLM_MODEL, 
            messages: [{ role: 'user', content: prompt }],
            stream: true,
        });
        
        for await (const part of streamResponse) {
            promptResponse += part.message.content;
            // need to somehow continually display promptResponse as it gets updated
        }

        } catch (err) {
        console.error('Error generating response:', err);
    }

    return promptResponse;
}

(async () => {
    const prompt = "What are your capabilities?";
    const response = await generateResponse(prompt);
    console.log('Final Response:', response);
})();
