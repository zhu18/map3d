
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve'); // 解析node_modules第三方以来关系
const commonjs = require('rollup-plugin-commonjs'); // 处理非ES6的模块，如CommonJS的模块
const progress = require('rollup-plugin-progress'); // 展示打包进度
const filesize = require('rollup-plugin-filesize'); // 在CLI显示文件大小
const babel = require('rollup-plugin-babel');
const eslint = require('rollup-plugin-eslint');
const cleanup = require('rollup-plugin-cleanup');
const terser = require("rollup-plugin-terser");
const config = require('./config')




const inputOptions = {
		input: 'src/index.js',
		plugins: [
      resolve(),
      commonjs(),
      eslint.eslint(),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
      }),
      cleanup({
        comments: 'all'
      }),
      filesize(),
      progress({
        clearLine: false
      })
    ],
    external: ['three'],
    globals:{
      three:"THREE"
    }
  }
  
	const inputOptionsMinify ={
		input: 'src/index.js',
		plugins: [
      resolve(),
      commonjs(),
			eslint.eslint(),
			cleanup({
			  comments: 'all'
			}),
			terser.terser({
				output: {
				  comments: /@preserve|@license|@cc_on/i
				}
			  }),
			filesize(),
			progress({
			  clearLine: false
			})
		],
		external: ['three'],
		globals:{
      three:"THREE"
    }
	}


// let params = {}
// // 处理通过命令行传递的参数
// process.argv.forEach((item, index) => {
//   let newitem = item.replace(/\\s/ig, '')
//   let paramsArray = newitem.split('=')
//   if (paramsArray.length === 2 && paramsArray[0]) {
//     params[paramsArray[0]] = paramsArray[1]
//   }
// })

// // see below for details on the options
// const inputOptions = {
//   input: './src/index.js',
//   plugins: [
//     resolve(),
//     commonjs(),
//     eslint.eslint(),
//     babel({
//       exclude: 'node_modules/**',
//       runtimeHelpers: true
//     }),
//     cleanup({
//       comments: 'all'
//     }),
//     filesize(),
//     progress({
//       clearLine: false
//     })
//   ],
//   external: ['three']
// };
// const inputOptionsMinify = {
//   input: './src/index.js',
//   plugins: [
//     resolve(),
//     commonjs(),
//     eslint.eslint(),
//     babel({
//       exclude: 'node_modules/**',
//       runtimeHelpers: true
//     }),
//     cleanup({
//       maxEmptyLines: 1
//     }),
//     // minify
//     terser.terser({
//       output: {
//         comments: /@preserve|@license|@cc_on/i
//       }
//     }),
//     filesize(),
//     progress({
//       clearLine: false
//     })
//   ],
//   external: ['three']
// };
const outputOptions = {
  file: `./dist/Map3D.es.js`,
  format:  'es',
  banner: config.banner,
  name: 'Map3D',
  exports: 'named'
};
const outputOptionsMinify = {
  file: `./dist/Map3D.umd.min.js`,
  format: 'umd',
  banner: config.banner,
  name: 'Map3D',
  exports: 'named'
};
async function build() {
  const bundle = await rollup.rollup(inputOptions);
  const bundleMinify = await rollup.rollup(inputOptionsMinify);

  await bundle.write(outputOptions);
  await bundleMinify.write(outputOptionsMinify);
}
build();