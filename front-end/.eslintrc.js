module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "off",
    // "no-unused-vars": [
    //   "warn",
    //   {
    //     "ignoreRestSiblings": true,
    //     "destructuredArrayIgnorePattern": "[A-Z]",
    //     // "caughtErrors": "none"
    //   }
    // ]
  }
}
// module.exports = {
//   rules: {
//     'import/namespace': 'off',
//     'import/no-unresolved': 'off',
//     'import/extensions': 'off',
//     'import/named': 'off',
//     'import/no-duplicates': 'off',
//     'import/no-named-as-default': 'off',
//     'import/default': 'off',
//     'import/no-named-as-default-member': 'off',
//     'import/order': 'off',
//   },
// };