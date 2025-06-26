module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'plugin:vue/vue3-recommended',
      'eslint:recommended',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@babel/eslint-parser',
      ecmaVersion: 12,
      sourceType: 'module',
      requireConfigFile: false,
    },
    plugins: ['vue'],
    globals: {
      defineProps: 'readonly',   // <-- aggiungi questa riga
      defineEmits: 'readonly',
      defineExpose: 'readonly',
      withDefaults: 'readonly'
    },
    rules: {
      'no-unused-vars': 'off',
      'vue/no-unused-vars': 'off',
    },
  };
  