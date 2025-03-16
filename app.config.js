module.exports = ({ config }) => {
  let bundleIdSuffix = '';
  if (process.env.APP_VARIANT) {
    bundleIdSuffix += process.env.APP_VARIANT.toLowerCase();
  }

  const plugins = config.plugins || [];
  plugins.push([
    "expo-dev-client",
        {
          "addGeneratedScheme	": process.env.APP_VARIANT === "DEV"
        }
  ])

  const newConfig = {
    ...config,
    name: process.env.APP_VARIANT ? ("IC" + process.env.APP_VARIANT) : config.name,
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
