/* eslint-env node */

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript'
  ],
  rules: {
    'vue/multi-word-component-names': ['error', {
      'ignores': ['Item', 'Interface'],
    }],
    'prefer-const': 'off',
    'no-control-regex': 'off',
    'no-dupe-else-if': 'off',
    'no-extra-boolean-cast': 'off',
  }
}
