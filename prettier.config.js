/**
 * @See https://prettier.io/docs/en/options.html
 */
module.exports = {
    printWidth: 120, // Max number of characters per line
    tabWidth: 2,
    useTabs: false, // :sob:
    trailingComma: 'none', // No trailing commas. This is a heated discussion, but if I remember correctly, we decided YES for python, NO for JS
    semi: true, //  Semi colons on all statements
    singleQuote: true, // Single quotes for strings and imports
    bracketSpacing: true, // Spaces between object brackets: {poulet: 5} is not valid: { poulet: 5 }
    jsxSingleQuote: false, // Use double quotes in JSX props
    jsxBracketSameLine: false, // JSX Ending bracket should be on the line after the last prop,
  };
  