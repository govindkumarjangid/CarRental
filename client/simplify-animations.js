import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else {
            if (fullPath.endsWith('.jsx')) results.push(fullPath);
        }
    });
    return results;
}

const files = walk('./src');
let updatedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Remove complex whileHover, whileTap (one level of nesting)
    content = content.replace(/whileHover=\{\s*\{[^{}]*\}\s*\}/g, '');
    content = content.replace(/whileHover=\{[^}]*\}/g, ''); // fallback for strings like whileHover="hover"

    content = content.replace(/whileTap=\{\s*\{[^{}]*\}\s*\}/g, '');
    content = content.replace(/whileTap=\{[^}]*\}/g, '');

    content = content.replace(/whileInView=\{\s*\{[^{}]*\}\s*\}/g, 'whileInView={{ opacity: 1 }}');

    // Replace initial with simple opacity
    content = content.replace(/initial=\{\s*\{[^{}]*\}\s*\}/g, 'initial={{ opacity: 0 }}');
    content = content.replace(/initial="[^"]*"/g, 'initial={{ opacity: 0 }}');

    // Replace animate with simple opacity
    content = content.replace(/animate=\{\s*\{[^{}]*\}\s*\}/g, 'animate={{ opacity: 1 }}');
    content = content.replace(/animate="[^"]*"/g, 'animate={{ opacity: 1 }}');

    // Replace exit with simple opacity
    content = content.replace(/exit=\{\s*\{[^{}]*\}\s*\}/g, 'exit={{ opacity: 0 }}');
    content = content.replace(/exit="[^"]*"/g, 'exit={{ opacity: 0 }}');

    // Replace transitions
    content = content.replace(/transition=\{\s*\{[^{}]*\}\s*\}/g, 'transition={{ duration: 0.3 }}');

    // Fix empty spaces left by whileHover
    content = content.replace(/\s+>/g, '>');

    if (original !== content) {
        fs.writeFileSync(file, content);
        updatedCount++;
        console.log('Updated', file);
    }
});

console.log(`Successfully updated ${updatedCount} files.`);
