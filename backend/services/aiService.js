const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.AI_API_KEY, 
});

const generateSummary = async (noteContent) => {
    try {
        const prompt = `
        You are a helpful study assistant. 
        Please analyze the following note content and provide a response in JSON format with two fields:
        1. "shortSummary": a concise 2-3 sentence summary.
        2. "bulletSummary": an array of strings, each being a key point.

        Note Content:
        "${noteContent}"
        
        Return ONLY valid JSON.
        `;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
            response_format: { type: "json_object" }, 
        });

        const result = JSON.parse(completion.choices[0].message.content);
        return result;
    } catch (error) {
        console.error("AI Service Error (Summary):", error.message);
        
        // Dynamic Fallback: Generate a summary from the actual note content
        // This fails gracefully if OpenAI quota is exceeded, but still gives relevant data.
        const sentences = noteContent.split(/[.!?]+/).filter(s => s.trim().length > 10);
        const shortSummary = sentences.slice(0, 3).join('. ') + (sentences.length > 3 ? '.' : '');
        
        const bulletSummary = sentences.slice(0, 5).map(s => s.trim());

        console.log("Using Heuristic Fallback for Summary.");
        return {
            shortSummary: shortSummary || "Could not generate summary from short content.",
            bulletSummary: bulletSummary.length > 0 ? bulletSummary : ["No key points found."]
        };
    }
};

const generateFlashcards = async (noteContent) => {
    try {
        const prompt = `
        You are a helpful study assistant.
        Create a set of Q&A flashcards based on the following note content.
        Return the response in JSON format with a field "flashcards" which is an array of objects.
        Each object should have:
        - "question": string
        - "answer": string
        - "difficulty": string (one of "easy", "medium", "hard")

        Note Content:
        "${noteContent}"

        Return ONLY valid JSON.
        `;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
            response_format: { type: "json_object" },
        });

        const result = JSON.parse(completion.choices[0].message.content);
        return result.flashcards;
    } catch (error) {
        console.error("AI Service Error (Flashcards):", error.message);

        // Dynamic Fallback: Generate flashcards from sentences
        const sentences = noteContent.split(/[.!?]+/).filter(s => s.trim().length > 15);
        const fallbackCards = sentences.slice(0, 5).map((sentence, index) => {
            return {
                question: `What is discussed in sentence ${index + 1}?`,
                answer: sentence.trim(),
                difficulty: index % 3 === 0 ? "easy" : index % 3 === 1 ? "medium" : "hard"
            };
        });

        console.log("Using Heuristic Fallback for Flashcards.");
        
        if (fallbackCards.length === 0) {
            return [{ question: "No content available", answer: "Please add more text to your note.", difficulty: "easy" }];
        }

        return fallbackCards;
    }
};

module.exports = {
    generateSummary,
    generateFlashcards
};
