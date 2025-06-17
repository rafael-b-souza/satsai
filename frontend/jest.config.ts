export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '\\.(css)$': 'identity-obj-proxy'
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json',
      useESM: true,
    },
  },
}
