module.exports = {
  extends: [
    '@commitlint/config-conventional',
  ],
  rules: {
    'type-enum': [2, 'always', [
      'build',
      'ci',
      'chore',
      'docs',
      'feat',
      'fix',
      'perf',
      'refactor',
      'revert',
      'style',
      'test',
      'release',
    ]],
    'invalid-subject-chars': [2, 'always'],
  },
  ignores: [
    message => message.startsWith('Publish\n'),
  ],
  plugins: [
    {
      rules: {
        'invalid-subject-chars': (data) => {
          if (typeof data.subject === 'string') {
            const invalidChars = data.subject.match(/[^a-zA-Z0-9,.'"\-_ /\\#():]/gu);
            if (invalidChars && invalidChars.length > 0) {
              return [false, `Subject contains invalid characters: ${invalidChars.join('')}`];
            }
          }
          return [true, null];
        },
      },
    },
  ],
};
