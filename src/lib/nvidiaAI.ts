export async function generateNvidiaAI(prompt: string, systemPrompt: string = "You are a helpful AI assistant.") {
    const API_KEY = import.meta.env.VITE_NVIDIA_API_KEY?.trim();

    if (!API_KEY) {
        throw new Error("NVIDIA API Key is missing. Add VITE_NVIDIA_API_KEY to your .env file.");
    }

    const endpoints = [
        import.meta.env.DEV ? "/nvapi/v1/chat/completions" : "https://integrate.api.nvidia.com/v1/chat/completions",
        "https://integrate.api.nvidia.com/v1/chat/completions",
        "https://api.nvidia.com/v1/chat/completions"
    ];

    const models = [
        "meta/llama-3.1-8b-instruct",
        "meta/llama-3.2-3b-instruct",
        "meta/llama3-8b-instruct"
    ];

    let lastError = null;

    for (const endpoint of endpoints) {
        for (const model of models) {
            try {
                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        model: model,
                        messages: [
                            { role: "system", content: systemPrompt },
                            { role: "user", content: prompt }
                        ],
                        max_tokens: 1024,
                        temperature: 0.7,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    return data.choices?.[0]?.message?.content || "";
                }

                const errText = await response.text();
                lastError = new Error(`API Error: ${response.status} - ${errText}`);

                // If it's a 404 (Not found), try the next model/endpoint. Otherwise, fail fast.
                if (response.status !== 404) {
                    throw lastError;
                }
            } catch (err: unknown) {
                lastError = err;
                // If it's the exact 404 error, we continue the loops
                if (err instanceof Error && err.message && !err.message.includes("404")) {
                    throw err; // Re-throw cors or network errors immediately
                }
            }
        }
    }

    throw lastError || new Error("All endpoints and models failed. The AI service is currently unavailable.");
}
