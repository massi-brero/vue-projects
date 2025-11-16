// eslint.config.js
import eslint from '@eslint/js'
import vue from 'eslint-plugin-vue'

export default [
  {
    files: ['**/*.js', '**/*.vue'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    extends: [eslint.configs.recommended, vue.configs['vue3-recommended']],
    rules: {
      // Beispiel:
      // "vue/no-unused-vars": "error",
    }
  }
]
