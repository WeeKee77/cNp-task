export default {
  displayName: 'web',
  preset: '../jest.preset.js',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        presets: [
          [
            'next/babel',
            {
              'preset-react': {
                runtime: 'automatic', // Enable modern JSX transform
              },
            },
          ],
        ],
      },
    ],
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../coverage/web',
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
