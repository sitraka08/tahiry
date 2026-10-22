import type { ConfigContext, ExpoConfig } from 'expo/config';

// Each variant gets its own package so dev, preview and prod install side by side.
const variants = {
  development: { name: 'Tahiry Dev', package: 'com.tahiry.app.dev' },
  preview: { name: 'Tahiry Preview', package: 'com.tahiry.app.preview' },
  production: { name: 'Tahiry', package: 'com.tahiry.app' },
};

type Variant = keyof typeof variants;

function isVariant(value: string | undefined): value is Variant {
  return value !== undefined && value in variants;
}

const variant: Variant = isVariant(process.env.APP_VARIANT)
  ? process.env.APP_VARIANT
  : 'production';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: variants[variant].name,
  slug: 'tahiry',
  android: { ...config.android, package: variants[variant].package },
});
