module.exports = ({ config }) => {
  let bundleIdSuffix = '';
  if (process.env.IS_DEV) {
    bundleIdSuffix += 'dev';
  }
  const newConfig = {
    ...config,
    name: process.env.IS_DEV ? "IC DEV" : config.name,
    ios: {
      ...config.ios,
      bundleIdentifier: config.ios.bundleIdentifier + bundleIdSuffix,
    },
    android: {
      ...config.android,
      package: config.android.package + bundleIdSuffix,
    },
  };
  return newConfig;
};
