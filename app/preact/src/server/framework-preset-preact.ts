import path from 'path';
import { TransformOptions } from '@babel/core';
import { Configuration } from 'webpack';
import { StorybookConfig } from '@storybook/core-common';

export function babelDefault(config: TransformOptions) {
  return {
    ...config,
    plugins: [
      ...config.plugins,
      [require.resolve('@babel/plugin-transform-react-jsx'), { pragma: 'h' }, 'preset'],
    ],
  };
}

export function webpackFinal(config: Configuration) {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        react: path.dirname(require.resolve('preact/compat/package.json')),
        'react-dom/test-utils': path.dirname(require.resolve('preact/test-utils/package.json')),
        'react-dom': path.dirname(require.resolve('preact/compat/package.json')),
      },
    },
  };
}

export const config: StorybookConfig['config'] = (entry = []) => {
  return [...entry, require.resolve('../../esm/client/preview/config')];
};
