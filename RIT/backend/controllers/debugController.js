const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

exports.debugCode = async (req, res) => {
    const { code, language = "javascript" } = req.body;
    
    if (!code) {
        return res.status(400).json({ 
            error: "Code is required",
            details: "Please provide code to analyze"
        });
    }

    try {
        // Try to execute the code
        let execution = await tryExecuteCode(code, language);
        
        if (execution.error) {
            // If execution fails, analyze the error
            const analysis = analyzeError(execution.error, code, language);
            return res.json({
                type: 'issues',
                message: `Found ${analysis.issues.length} issue(s)`,
                issues: analysis.issues,
                positive: "Here's how to fix it!",
                language: language
            });
        }

        // If code runs successfully
        return res.json({
            type: 'success',
            message: "🎉 Code executed successfully!",
            output: execution.output,
            positive: "Your code looks good!",
            language: language
        });

    } catch (error) {
        console.error("Debugging error:", error);
        return res.status(500).json({
            type: 'error',
            message: "Debugging failed",
            details: error.message,
            positive: "Please try again or check your code"
        });
    }
};

// Helper Functions (same as before)
async function tryExecuteCode(code, language) {
    try {
        let command;
        switch(language) {
            case 'javascript':
                command = `node -e "${code.replace(/"/g, '\\"')}"`;
                break;
            case 'python':
                command = `python -c "${code.replace(/"/g, '\\"')}"`;
                break;
            default:
                throw new Error(`Unsupported language: ${language}`);
        }

        const { stdout, stderr } = await execPromise(command);
        return { output: stdout, error: stderr };
    } catch (error) {
        return { error: error.stderr || error.message };
    }
}

function analyzeError(error, code, language) {
    const commonIssues = {
        javascript: [
            {
                pattern: /ReferenceError: (\w+) is not defined/,
                suggestion: (match) => `const ${match[1]} = ...; // Declare variable`,
                severity: "high"
            },
            {
                pattern: /SyntaxError: Unexpected token/,
                suggestion: () => "Check for missing brackets or parentheses",
                severity: "high"
            }
        ],
        python: [
            {
                pattern: /NameError: name '(\w+)' is not defined/,
                suggestion: (match) => `${match[1]} = ... # Define variable`,
                severity: "high"
            }
        ]
    };

    const issues = [];
    const rules = commonIssues[language] || [];

    for (const rule of rules) {
        const match = error.match(rule.pattern);
        if (match) {
            issues.push({
                message: error.split('\n')[0],
                suggestion: rule.suggestion(match),
                severity: rule.severity,
                line: findLineNumber(code, match[1] || code)
            });
        }
    }

    if (issues.length === 0) {
        issues.push({
            message: error.split('\n')[0],
            suggestion: "Review the code logic carefully",
            severity: "medium",
            line: 1
        });
    }

    return { issues };
}

function findLineNumber(code, searchText) {
    const lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(searchText)) {
            return i + 1;
        }
    }
    return 1;
}