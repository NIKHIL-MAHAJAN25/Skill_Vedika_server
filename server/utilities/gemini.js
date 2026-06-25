const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
async function analyzeResume(resumeText, jobDesc) {
    const prompt = `
You are a senior technical recruiter analyzing a candidate profile against a target role.

FIRST, determine the input type:
- TYPE A — Detailed JD: the job description includes specific required skills, tools, years of experience, or qualifications.
- TYPE B — General role title only: the job description is just a role name or one-liner (e.g. "AI/ML Intern", "Backend Developer") with no explicit list of requirements.

IF TYPE A (detailed JD), be strict and literal:
- Score using this rubric: 90-100 meets nearly every explicit requirement; 70-89 missing 1-2 significant skills; 50-69 notable gaps in core skills; 30-49 missing multiple core requirements; 0-29 largely unrelated.
- Do NOT give credit for loosely related skills (e.g. "Java" is not "Kotlin" unless JD says either is fine).
- Do NOT infer skills not explicitly mentioned in the profile.
- Every explicitly required skill missing from the profile MUST appear in missing_keywords.
- No encouraging hedge phrases like "could be a great fit with training" — state gaps plainly.

IF TYPE B (general role title only), be descriptive and exploratory instead:
- Infer the realistic, commonly expected skill set for that role/title in industry.
- Compare the candidate's actual profile against that inferred expected skill set honestly.
- missing_keywords should list realistic expected skills/tools for that role.
- Summary should explain what's typically expected and how the candidate measures up.

In both cases:
- Be honest, not encouraging for its own sake.
- Years of experience must factor into the score.

PROFILE:
${resumeText}

JOB DESCRIPTION / ROLE:
${jobDesc}

Output ONLY a JSON string with this structure (no markdown code blocks, no commentary outside JSON):
{
  "score": 0-100,
  "missing_keywords": ["skill1", "skill2"],
  "summary": "Specific, honest summary."
}
`.trim();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

module.exports = { analyzeResume };