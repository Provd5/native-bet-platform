// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: "expo",
  plugins: ["simple-import-sort", "unused-imports"],
  rules: {
    "no-console": "warn",
    "react/jsx-key": "error",
    "unused-imports/no-unused-imports": "error",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^react", "^@react", "^expo", "^@expo", "^@", "^\\w"],
          ["^(type|types|~/type|~/types)"],
          ["^~/"],
        ],
      },
    ],
  },
};
