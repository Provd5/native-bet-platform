/* eslint-env node */
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
  enableGlobalNodeModulesSymlinks: true,
});
config.resolver.sourceExts.push("cjs");

// Disable CSS watcher to prevent Metro DependencyGraph errors with NativeWind file events
module.exports = withNativeWind(config, {
  input: "./global.css",
  watcherDisabled: true,
});
