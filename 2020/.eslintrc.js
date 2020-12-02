module.exports = {
    "env": {
        "commonjs": true,
        "es2021": true,
        "node": true,
        "mocha": true
    },
    "plugins" : [
      "mocha"
    ],
    "extends": [
      "eslint:recommended",
      "plugin:mocha/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
    }
};
