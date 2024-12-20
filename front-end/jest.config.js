/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
  '\\.[jt]sx?$': 'esbuild-jest',
  },
  setupFilesAfterEnv: ['</jest.setup.js'],
  }

// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
  
  
// };
