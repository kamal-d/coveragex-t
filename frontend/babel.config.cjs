// filepath: /home/kamal/lara/coverage-front/babel.config.cjs
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    "@babel/preset-react", // Adds support for JSX
  ],
  plugins: [],
};
