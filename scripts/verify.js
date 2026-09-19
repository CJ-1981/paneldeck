const fs = require('fs');

const files = ['PanelDeck.html', 'index.html'];

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.error(`Error: File ${file} not found.`);
    process.exit(1);
  }

  const html = fs.readFileSync(file, 'utf8');

  // Check duplicate IDs
  const idRegex = /id=["']([^"']+)["']/g;
  const ids = {};
  let match;
  while ((match = idRegex.exec(html)) !== null) {
    const id = match[1];
    if (ids[id]) {
      console.error(`Error: Duplicate ID "${id}" found in ${file}.`);
      process.exit(1);
    }
    ids[id] = 1;
  }

  // Check critical elements
  if (!html.includes('id="viewToggleBtn"')) {
    console.error(`Error: viewToggleBtn missing in ${file}.`);
    process.exit(1);
  }
  if (!html.includes('id="viewIconList"')) {
    console.error(`Error: viewIconList missing in ${file}.`);
    process.exit(1);
  }
  if (!html.includes('id="viewIconGrid"')) {
    console.error(`Error: viewIconGrid missing in ${file}.`);
    process.exit(1);
  }

  // Check JavaScript syntax
  const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
  if (!scriptMatch) {
    console.error(`Error: No <script> tag found in ${file}.`);
    process.exit(1);
  }
  try {
    new Function(scriptMatch[1]);
  } catch (err) {
    console.error(`Error: JavaScript syntax error in ${file}: ${err.message}`);
    process.exit(1);
  }

  console.log(`✓ ${file}: Verified (0 duplicate IDs, valid JavaScript, critical icons present).`);
}

console.log('All verification checks passed successfully.');
