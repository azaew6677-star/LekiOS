import {genkit, Plugin} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
// import {openai} from '@genkit-ai/openai'; // Temporarily disabled due to package resolution issues

const plugins: Plugin[] = [];
let model = 'googleai/gemini-2.5-flash';

if (process.env.GENKIT_API_ENDPOINT) {
    console.log(`Connecting to local AI endpoint: ${process.env.GENKIT_API_ENDPOINT}`);
    // The following plugin is temporarily disabled due to a package resolution issue.
    // You can re-enable it once the @genkit-ai/openai package is available again.
    /*
    plugins.push(openai({
        apiKey: process.env.OPENAI_API_KEY || 'unused',
        baseURL: process.env.GENKIT_API_ENDPOINT,
    }));
    model = 'openai/local-model';
    */
    console.log('Local AI connection is temporarily disabled. Falling back to Google AI.');
    plugins.push(googleAI());

} else {
    plugins.push(googleAI());
}


export const ai = genkit({
  plugins,
  model,
});
