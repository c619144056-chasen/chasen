const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for web
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Ensure proper asset resolution for web
config.resolver.assetExts.push('svg');

// Web-specific optimizations
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

module.exports = config;