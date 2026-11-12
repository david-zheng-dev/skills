// Syncs package.json "version" into .claude-plugin/plugin.json "version".
//
// Usage:
//   node scripts/sync-plugin-version.mjs            -> write the version
//   node scripts/sync-plugin-version.mjs --check    -> fail (exit 1) if they differ
//
// Only the value of the "version" line is replaced (via regex), so the file's
// key order and formatting are preserved.

import { readFileSync, writeFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const version = pkg.version;

const pluginPath = new URL("../.claude-plugin/plugin.json", import.meta.url);
const source = readFileSync(pluginPath, "utf8");

const versionRegex = /("version"\s*:\s*")[^"]*(")/;

if (!versionRegex.test(source)) {
  console.error('ERROR: no "version" field found in .claude-plugin/plugin.json');
  process.exit(1);
}

const updated = source.replace(versionRegex, `$1${version}$2`);
const checkMode = process.argv.includes("--check");

if (checkMode) {
  if (updated === source) {
    console.log(`OK: .claude-plugin/plugin.json version (${version}) matches package.json`);
  } else {
    console.error(
      `MISMATCH: .claude-plugin/plugin.json version does not match package.json (${version}). ` +
        'Run "npm run version" to sync it.',
    );
    process.exit(1);
  }
} else {
  writeFileSync(pluginPath, updated);
  console.log(`Synced .claude-plugin/plugin.json version -> ${version}`);
}
