import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

const basePlugins = [resolve(), commonjs()];

const external = ['react', 'react-ga'];
const globals = {
  react: 'React',
  'react-ga': 'ReactGA',
};

export default [
  {
    input: 'cjs/index.js',
    output: {
      file: 'umd/reactAnalytics.js',
      format: 'umd',
      name: 'ReactAnalytics',
      globals,
    },
    plugins: [...basePlugins, replace({ 'process.env.NODE_ENV': '"development"' })],
    external,
  },
  {
    input: 'cjs/index.js',
    output: {
      file: 'umd/reactAnalytics.min.js',
      format: 'umd',
      name: 'ReactAnalytics',
      globals,
    },
    plugins: [...basePlugins, replace({ 'process.env.NODE_ENV': '"production"' }), uglify()],
    external,
  },
];
