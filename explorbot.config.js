import { createOpenRouter } from "@openrouter/ai-sdk-provider";
// import { '<your provider here>' } from '<your provider package here>';

// Vercel AI SDK is used to connect to AI providers.
// Bring your own provider or use OpenRouter (one API key, many providers).
// https://github.com/testomatio/explorbot/blob/main/docs/providers.md
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const config = {
  web: {
  url: 'https://app.svitlo-znan.app',
},

  ai: {
    // fast model with tool calling capabilities
    model: openrouter("openai/gpt-oss-20b:nitro"),
    // vision model for screenshot analysis
    visionModel: openrouter("meta-llama/llama-4-scout-17b-16e-instruct"),
    // agentic model for decision making
    agenticModel: openrouter("minimax/minimax-m2.5:nitro"),
  },

  reporter: {
    // Save a local HTML report after each run.
    html: true,
    // Save a local markdown report after each run.
    markdown: true,
    // Group runs by title in Testomat.io / HTML reports. Defaults to today's date — customize or remove.
    runGroup: new Date().toISOString().slice(0, 10),
  },
};

export default config;
