import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIGURATION ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ADD_FILE_PATH = path.join(__dirname, 'add.json');
const FR_PATH = path.join(__dirname, '../src/i18n/fr.ts');
const EN_PATH = path.join(__dirname, '../src/i18n/en.ts');

// --- HELPERS ---

// 1. Charger le fichier add.json
const loadAddFile = () => {
  if (!fs.existsSync(ADD_FILE_PATH)) {
    console.log('⚠️  Le fichier add.json n\'existe pas.');
    process.exit(0);
  }
  const content = fs.readFileSync(ADD_FILE_PATH, 'utf8');
  try {
    return JSON.parse(content);
  } catch (e) {
    console.error('❌ Erreur de syntaxe dans add.json. Vérifie les virgules et les accolades.');
    process.exit(1);
  }
};

// 2. Charger les fichiers TS existants (méthode robuste)
const loadTsFile = (filePath) => {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  
  try {
    // On cherche le contenu entre la première { et la dernière }
    const firstBrace = content.indexOf('{');
    const lastBrace = content.lastIndexOf('}');
    if (firstBrace === -1 || lastBrace === -1) throw new Error('Structure objet introuvable');

    const objectString = content.substring(firstBrace, lastBrace + 1);
    return new Function(`return ${objectString}`)();
  } catch (e) {
    console.error(`❌ Impossible de lire ${path.basename(filePath)}.`);
    console.error(`   Assure-toi que le fichier est valide (pas d'erreurs de syntaxe comme 2d: sans quotes).`);
    process.exit(1);
  }
};

// 3. Insérer une valeur imbriquée (ex: "nav.home")
const setNestedValue = (obj, path, value) => {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    // Si la clé n'existe pas ou n'est pas un objet, on crée un objet vide
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  // Assigner la valeur à la dernière clé
  current[keys[keys.length - 1]] = value;
};

// 4. Sauvegarder en TS proprement
const saveTsFile = (filePath, data, variableName) => {
  let jsonString = JSON.stringify(data, null, 2);

  // A. Retirer les guillemets UNIQUEMENT pour les clés valides (lettres, $, _)
  //    Cela garde les quotes pour "2d", "3d", "brand-name", etc.
  jsonString = jsonString.replace(/"([a-zA-Z_$][a-zA-Z0-9_$]*)":/g, '$1:');
  
  // B. Remplacer les double quotes des valeurs par des simple quotes
  jsonString = jsonString.replace(/: "((?:[^"\\]|\\.)*)"/g, (match, content) => {
    // On remet les " normaux et on échappe les '
    let clean = content.replace(/\\"/g, '"').replace(/'/g, "\\'");
    return `: '${clean}'`;
  });

  const fileContent = `const ${variableName} = ${jsonString};\n\nexport default ${variableName};`;
  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`✅ ${path.basename(filePath)} mis à jour.`);
};

// --- MAIN ---

const main = () => {
  console.log('\n🔄 Traitement de add.json...\n');

  // 1. Lire les nouvelles traductions
  const newTranslations = loadAddFile();
  const entries = Object.entries(newTranslations);

  if (entries.length === 0) {
    console.log('✨ add.json est vide. Rien à faire.');
    return;
  }

  // 2. Lire les fichiers existants
  const frObj = loadTsFile(FR_PATH);
  const enObj = loadTsFile(EN_PATH);

  // 3. Fusionner les données
  let count = 0;
  entries.forEach(([key, values]) => {
    if (values.fr) setNestedValue(frObj, key, values.fr);
    if (values.en) setNestedValue(enObj, key, values.en);
    console.log(`   ➕ Ajouté : ${key}`);
    count++;
  });

  // 4. Sauvegarder
  console.log(''); // saut de ligne
  saveTsFile(FR_PATH, frObj, 'fr');
  saveTsFile(EN_PATH, enObj, 'en');

  // 5. Vider add.json
  fs.writeFileSync(ADD_FILE_PATH, '{}', 'utf8');
  console.log(`\n🧹 add.json a été vidé.`);
  console.log(`🎉 Terminé ! ${count} clés traitées.`);
};

main();