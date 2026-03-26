const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Watch all files in monorepo
config.watchFolders = [workspaceRoot];

// Tell metro where to look for node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// Fix for monorepo - tell metro where the project root is
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
