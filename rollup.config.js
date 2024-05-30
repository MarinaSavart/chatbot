import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import {terser} from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import cleanCSS from 'clean-css';

const DIST_PATH = 'https://static.tabmo.io/Test-Marina/chatbot/v1.4/';
const BUILD_DIST_FOLDER = `build/`;

const {previewMacro, prodMacro} = require('./templates/creativeObject');

const production = process.env.BUILD == 'prod';

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    }
  };
}

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: production ? `public/${BUILD_DIST_FOLDER}bundle.js` : `public/${BUILD_DIST_FOLDER}bundle.js`
  },
  plugins: [
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production
      }
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({output: 'bundle.css'}),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),

    // Add global env var for creative build path
    replace({
      preventAssignment: true,
      'process.env.BUILD_PATH': JSON.stringify(
        production ? `${DIST_PATH}${BUILD_DIST_FOLDER}` : `./${BUILD_DIST_FOLDER}`
      ),
      'process.env.IS_PROD': production
    }),

    // Copy templates files with right scripts links
    copy({
      targets: !production
        ? [
            {
              src: './templates/template.html',
              dest: 'public'
            },
            {
              src: ['./templates/index-preview.html', './templates/index-preview-with-log.html'],
              dest: 'public',
              transform: contents =>
                contents
                  .toString()
                  .replaceAll('__BUILD_PATH__', `./${BUILD_DIST_FOLDER}`)
                  .replace('__MACRO__', JSON.stringify(previewMacro))
            },
            {
              src: './templates/index.html',
              dest: 'public',
              transform: contents =>
                contents
                  .toString()
                  .replaceAll('__BUILD_PATH__', `./${BUILD_DIST_FOLDER}`)
                  .replace('__MACRO__', JSON.stringify(previewMacro))
            },
            {
              src: './templates/initialize.js',
              rename: 'initialize-preview.js',
              dest: `public/${BUILD_DIST_FOLDER}`,
              transform: contents => contents.toString().replaceAll('__BUILD_PATH__', `./${BUILD_DIST_FOLDER}`)
            },
            {
              src: './templates/global.css',
              dest: `public/${BUILD_DIST_FOLDER}`,
              transform: contents => contents.toString()
            }
          ]
        : [
            {
              src: ['./templates/index-prod.html', './templates/index-prod-with-log.html'],
              dest: 'public',
              transform: contents =>
                contents
                  .toString()
                  .replaceAll('__BUILD_PATH__', `${DIST_PATH}${BUILD_DIST_FOLDER}`)
                  .replace('__MACRO__', JSON.stringify(prodMacro))
            },
            {
              src: './templates/initialize.js',
              dest: `public/${BUILD_DIST_FOLDER}`,
              transform: contents =>
                contents.toString().replaceAll('__BUILD_PATH__', `${DIST_PATH}${BUILD_DIST_FOLDER}`)
            },
            {
              src: './templates/global.css',
              dest: `public/${BUILD_DIST_FOLDER}`,
              transform: contents => {
                contents.toString();
                return new cleanCSS().minify(contents).styles;
              }
            }
          ]
    }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload(['public']),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
