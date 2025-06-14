// // test-gemini.ts
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import 'dotenv/config';

// const apiKey = process.env.GEMINI_API_KEY;

// async function testGemini() {
//   const genAI = new GoogleGenerativeAI(apiKey!);
//   const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//   try {
//     const result = await model.generateContent("Say Hello in 3 different languages.");
//     const text = result.response.text();
//     console.log("✅ Gemini is working!");
//     console.log("Response:", text);
//   } catch (err) {
//     console.error("❌ Error calling Gemini:", err);
//   }
// }

// testGemini();
