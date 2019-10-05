import dts from 'rollup-plugin-dts';
import filesize from 'rollup-plugin-filesize';
import typescript from 'rollup-plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/built-in-descorators.es.js',
        format: 'es',
        sourcemap: true
      },
      {
        file: 'dist/built-in-descorators.cjs.js',
        format: 'cjs',
        sourcemap: true
      }
    ],
    plugins: [typescript(), filesize()]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/built-in-descorators.d.ts',
      format: 'es'
    },
    plugins: [dts()]
  }
];
