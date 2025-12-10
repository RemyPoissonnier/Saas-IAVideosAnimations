import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

// 1. Setup paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. CONFIGURATION: Point to .ts files
const FR_PATH = path.join(__dirname, 'src/i18n/fr.ts');
const EN_PATH = path.join(__dirname, 'src/i18n/en.ts');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) => new Promise((resolve) => rl.question(question, resolve));

// Helper: Set nested value (creates intermediate objects if missing)
const setNestedValue = (obj, path, value) => {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
};

// Helper: Load TS file smartly
const loadFile = (filePath) => {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  
  try {
    // Find the first '{' and the last '}' to isolate the object
    const firstBrace = content.indexOf('{');
    const lastBrace = content.lastIndexOf('}');

    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error('Could not find object start/end braces {}');
    }

    const objectString = content.substring(firstBrace, lastBrace + 1);
    
    // Evaluate safely
    return new Function(`return ${objectString}`)();
  } catch (e) {
    console.error(`\n❌ Error parsing ${filePath}`);
    console.error(`   Message: ${e.message}`);
    console.error(`\n👉 TIP: This usually means there is a syntax error in the file.`);
    console.error(`   Check for unescaped apostrophes (e.g. 'L'IA' should be 'L\\'IA')`);
    process.exit(1);
  }
};

// Helper: Save back to TS file with SAFE escaping
const saveFile = (filePath, data, variableName) => {
  // 1. Generate standard JSON (Double quotes everywhere)
  let jsonString = JSON.stringify(data, null, 2);

  // 2. Convert Key "key": to key: (Prettier style)
  // This regex matches "key": and replaces it with key:
  jsonString = jsonString.replace(/^(\s*)"([^"(-]+)":/gm, '$1$2:');
  
  // 3. Convert Values "value" to 'value' SAFELY
  // We match: : "..."
  // We capture the content inside the double quotes
  jsonString = jsonString.replace(/: "((?:[^"\\]|\\.)*)"/g, (match, content) => {
    // Unescape existing double quotes \" -> "
    let cleanContent = content.replace(/\\"/g, '"');
    
    // Escape single quotes ' -> \'
    cleanContent = cleanContent.replace(/'/g, "\\'");
    
    // Return with single quotes wrapping
    return `: '${cleanContent}'`;
  });

  const fileContent = `const ${variableName} = ${jsonString};\n\nexport default ${variableName};`;
  
  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`✅ Saved ${path.basename(filePath)}`);
};

const main = async () => {
  console.log('\n🌐 \x1b[36mTS I18n Manager (Safe Mode)\x1b[0m\n');

  const key = await ask('\x1b[33mKey path (e.g. auth.user.name):\x1b[0m ');
  if (!key) { console.log('Cancelled.'); process.exit(0); }

  const enValue = await ask(`\x1b[32m🇺🇸 English value:\x1b[0m `);
  const frValue = await ask(`\x1b[32m🇫🇷 French value:\x1b[0m  `);

  console.log('\nReading TS files...');
  
  // Attempt to load. If this fails, the user MUST fix the file manually first.
  const enObj = loadFile(EN_PATH);
  const frObj = loadFile(FR_PATH);

  setNestedValue(enObj, key, enValue);
  setNestedValue(frObj, key, frValue);

  saveFile(EN_PATH, enObj, 'en');
  saveFile(FR_PATH, frObj, 'fr');

  console.log(`\n🎉 Key \x1b[1m"${key}"\x1b[0m added/updated!\n`);
  rl.close();
};

main();