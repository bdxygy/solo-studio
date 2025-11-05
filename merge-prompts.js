#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to read and parse JSON file
function readJsonFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error.message);
        return [];
    }
}

// Function to write JSON file
function writeJsonFile(filePath, data) {
    try {
        const jsonString = JSON.stringify(data, null, 2);
        fs.writeFileSync(filePath, jsonString, 'utf8');
        console.log(`Successfully wrote ${data.length} prompts to ${filePath}`);
    } catch (error) {
        console.error(`Error writing ${filePath}:`, error.message);
    }
}

// Function to display usage help
function showUsage() {
    console.log(`
Usage: node merge-prompts.js [options]

Options:
  --input-dir <path>     Input directory containing JSON theme files (default: ./themes)
  --output-file <path>    Output JSON file path (default: ./prompts.json)
  --help, -h            Show this help message

Examples:
  node merge-prompts.js
  node merge-prompts.js --input-dir ./my-themes --output-file ./my-prompts.json
  node merge-prompts.js -h
`);
}

// Function to parse command line arguments
function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        inputDir: './themes',
        outputFile: './prompts.json',
        showHelp: false
    };

    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '--input-dir':
                if (i + 1 < args.length) {
                    options.inputDir = args[i + 1];
                    i++; // Skip next argument
                }
                break;
            case '--output-file':
                if (i + 1 < args.length) {
                    options.outputFile = args[i + 1];
                    i++; // Skip next argument
                }
                break;
            case '--help':
            case '-h':
                options.showHelp = true;
                break;
            default:
                if (args[i].startsWith('--')) {
                    console.warn(`Unknown option: ${args[i]}`);
                }
                break;
        }
    }

    return options;
}

// Main function to merge all theme files
function mergeThemeFiles(inputDir, outputFile) {
    console.log(`Reading theme files from: ${inputDir}`);
    console.log(`Output file: ${outputFile}`);

    // Validate input directory exists
    if (!fs.existsSync(inputDir)) {
        console.error(`Error: Input directory '${inputDir}' does not exist.`);
        process.exit(1);
    }

    // Array to hold all merged prompts
    let allPrompts = [];

    // Get all JSON files in input directory
    let themeFiles;
    try {
        themeFiles = fs.readdirSync(inputDir)
            .filter(file => file.endsWith('.json'))
            .sort(); // Sort for consistent ordering
    } catch (error) {
        console.error(`Error reading directory ${inputDir}:`, error.message);
        process.exit(1);
    }

    console.log(`Found theme files: ${themeFiles}`);

    // Process each theme file
    themeFiles.forEach(file => {
        const filePath = path.join(inputDir, file);
        const themeName = path.basename(file, '.json');

        console.log(`Processing ${file}...`);

        const prompts = readJsonFile(filePath);

        if (Array.isArray(prompts)) {
            // Add category prefix to each prompt key and add Sharia compliance constraints
            const categorizedPrompts = prompts.map(prompt => {
                const shariaConstraints = " STRICT CONSTRAINTS: No humans, no animals, no living creatures, no religious symbols, no human figures, no faces, no bodies. Only furniture, decor items, architectural elements, wall art, plants, and inanimate objects allowed. Must comply with Sharia law principles.";

                // Add constraints to the prompt if not already present
                const enhancedPrompt = prompt.prompt.includes("STRICT CONSTRAINTS")
                    ? prompt.prompt
                    : prompt.prompt + shariaConstraints;

                return {
                    ...prompt,
                    key: `${themeName}-${prompt.key}`,
                    category: themeName,
                    prompt: enhancedPrompt
                };
            });

            allPrompts = allPrompts.concat(categorizedPrompts);
            console.log(`Added ${categorizedPrompts.length} prompts from ${themeName} (with Sharia compliance)`);
        } else {
            console.warn(`No valid prompts found in ${file}`);
        }
    });

    // Remove duplicates based on key (keep first occurrence)
    const uniquePrompts = [];
    const seenKeys = new Set();

    allPrompts.forEach(prompt => {
        if (!seenKeys.has(prompt.key)) {
            seenKeys.add(prompt.key);
            uniquePrompts.push(prompt);
        }
    });

    console.log(`Total unique prompts: ${uniquePrompts.length}`);

    // Write merged prompts to output file
    writeJsonFile(outputFile, uniquePrompts);

    // Print summary statistics
    const categoryCounts = {};
    uniquePrompts.forEach(prompt => {
        categoryCounts[prompt.category] = (categoryCounts[prompt.category] || 0) + 1;
    });

    console.log('\nSummary by category:');
    Object.entries(categoryCounts).forEach(([category, count]) => {
        console.log(`  ${category}: ${count} prompts`);
    });
}

// Main execution
function main() {
    const options = parseArgs();

    if (options.showHelp) {
        showUsage();
        return;
    }

    mergeThemeFiles(options.inputDir, options.outputFile);
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { mergeThemeFiles, parseArgs, showUsage };