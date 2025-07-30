// // File: src/app/api/analyze-comments/route.js
// import { NextResponse } from 'next/server';
// import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(request) {
//   try {
//     const { comments } = await request.json();

//     if (!comments) {
//       return NextResponse.json({ error: 'Comments are required' }, { status: 400 });
//     }

//     const completion = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         { 
//           role: "system", 
//           content: `You are a YouTube community analyst. Your job is to analyze a list of comments and extract valuable insights for the creator. Categorize your findings into four JSON arrays: 'top_questions', 'video_ideas', 'common_pain_points', and 'positive_feedback'. Each array should contain 3-5 of the most important string items. Your entire response must be a single valid JSON object with these four keys.`
//         },
//         { role: "user", content: `Here are the comments:\n\n${comments}` }
//       ],
//       response_format: { type: "json_object" }, // Use JSON mode for reliable output
//     });

//     const analysis = JSON.parse(completion.choices[0].message.content);
//     return NextResponse.json({ analysis });

//   } catch (error) {
//     console.error("AI Comment Analysis Error:", error);
//     return NextResponse.json({ error: "Failed to analyze comments." }, { status: 500 });
//   }
// }