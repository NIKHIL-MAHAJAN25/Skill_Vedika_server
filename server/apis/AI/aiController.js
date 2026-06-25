const { analyzeResume } = require('../../utilities/gemini');

exports.analyzeResume = async (req, res) => {
    try {
        const { resumeText, jobDesc } = req.body;

        if (!resumeText || !jobDesc) {
            return res.status(400).json({
                success: false,
                message: "Missing parameter"
            });
        }

        const rawResult = await analyzeResume(resumeText, jobDesc);

        res.json({
            success: true,
            data: rawResult
        });
    } catch (err) {
        console.error("Gemini analysis error:", err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};