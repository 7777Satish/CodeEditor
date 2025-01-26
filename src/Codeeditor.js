import styles from './Codeeditor.module.css';

const keywords = [
  "if", "else", "while", "for", "return", "function", 
  "class", "import", "export", "try", "catch", "finally", 
  "switch", "case", "default", "break", "continue", "throw"
];
const identifiers = ["myVariable", "calculateSum", "MyClass"];
const operators = [
  "+", "-", "*", "/", "%", 
  "&&", "||", "!", 
  "==", "!=", "<", ">", "<=", ">=", 
  "=", "+=", "-=", "*=", "/="
];
const punctuation = ["{", "}", "(", ")", "[", "]", ",", ";", "."];
const dataTypes = ["int", "float", "char", "array", "object", "const", "var"];
const errorHandlingKeywords = ["try", "catch", "finally", "throw"];

const highlightColors = {
  keywords: "#d13543",       // Red
  identifiers: "#e36209",    // Orange
  operators: "#6f42c1",      // Purple
  punctuation: "#999",    // Black
  dataTypes: "#d73a49",      // Red
  errorHandling: "#d73a49",  // Red
  default: "#cccccc"         // Black (default)
};

function Codeeditor({ file }) {
  const syntaxHighlight = (line) => {
    const tokens = line.split(/(\s+|[\{\}\(\)\[\],;.\+\-\*\/%!&|=<>]+)/g); // Tokenize line
    
    return tokens.map((token, index) => {
      let color = highlightColors.default;

      if (keywords.includes(token)) color = highlightColors.keywords;
      else if (identifiers.includes(token)) color = highlightColors.identifiers;
      else if (operators.includes(token)) color = highlightColors.operators;
      else if (punctuation.includes(token)) color = highlightColors.punctuation;
      else if (dataTypes.includes(token)) color = highlightColors.dataTypes;
      else if (errorHandlingKeywords.includes(token)) color = highlightColors.errorHandling;

      return (
        <span key={index} style={{ color }}>
          {token}
        </span>
      );
    });
  };

  return (
    <pre className={styles.main}>
      <code className={styles.code}>
        {file.content.split("\n").map((line, lineIndex) => (
          <div key={lineIndex} className={styles.codeline}>
            {syntaxHighlight(line)}
          </div>
        ))}
      </code>
    </pre>
  );
}

export default Codeeditor;
