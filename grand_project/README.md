This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## N8N Integration Setup

This project integrates with N8N for AI-powered resume tailoring. To set up the integration:

1. **Create a `.env.local` file** in the root directory with:
   ```
   NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-workflow-id
   ```

2. **N8N Workflow Configuration**:
   - Create a webhook node as the first node in your workflow
   - Connect it to a code node with the following code:
   ```javascript
   const resumeText = $input.first().json.resumeText;
   const jobDescription = $input.first().json.jobDescription;

   return {
     json: {
       resumeText: resumeText,
       jobDescription: jobDescription
     }
   };
   ```
   - Connect to an OpenAI node with this prompt:
   ```
   Analyze this resume and job description to provide tailored suggestions:

   Job Description: {{$json.jobDescription}}

   Resume Text: {{$json.resumeText}}

   Please provide:
   1. Key skills that match the job requirements
   2. A professional summary tailored to this position
   3. A matching score (0-100) with explanation
   4. Tell which projects are matched according to job description and which not

   Format the response as JSON with keys: skills, summary, score, matched projects
   ```
   - Connect to a final code node:
   ```javascript
   const aiResponse = $input.first().json;
   return {
     json: {
       skills: aiResponse.skills || [],
       summary: aiResponse.summary || "",
       score: aiResponse.score || 0,
       explanation: aiResponse.explanation || ""
     }
   };
   ```

3. **Test the Integration**:
   - Use the "Test Data" button to verify the webhook connection
   - Check browser console for detailed logging
   - Ensure your N8N workflow is active and not paused

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
