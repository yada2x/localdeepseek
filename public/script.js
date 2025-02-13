const input = document.getElementById("prompt_input");
const button = document.getElementById("submit_button");
const output = document.getElementById("prompt_output");

console.log("Hello World");

button.addEventListener("click", async () => {
    const prompt = input.value;

    if (prompt.trim() === "") {
        output.textContent = "No prompt was entered.";
        return;
    }
    try {
        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: prompt }),
        });

        if (!response.ok) {
            output.textContent = `Error: ${response.statusText}`;
            console.log("bruh");

            return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let result = '';

        output.textContent = '';
        
        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            result += decoder.decode(value, { stream: true });
            output.textContent = result;
        }

    } catch (error) {
        output.textContent = `Error: ${error.message}`;
    }
});
