// Metro config for a Bun/Yarn workspaces monorepo.
// Lets Metro find hoisted deps at the repo root and transpile the
// in-source @repo/ui package (which lives outside this app folder).
const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '../..')

const config = getDefaultConfig(projectRoot)

// 1. Watch all files in the monorepo (so changes to packages/* trigger reload).
config.watchFolders = [workspaceRoot]

// 2. Resolve modules from the app first, then the hoisted root node_modules.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]

module.exports = config
