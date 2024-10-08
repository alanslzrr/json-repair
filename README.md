# 🛠️ JSON Repair Tool: Fix Your JSON Accurately 

JSON Repair is a Python module designed to automatically fix invalid JSON, commonly encountered when parsing outputs from Large Language Models (LLMs) or working with API responses.

While LLMs can be powerful tools, they often produce JSON with minor issues—like missing quotes, extra commas, or improperly formatted structures—that break parsers but are simple enough to fix without affecting the core content.



## 🎯 Why is this a good option?

- 🔗 **Zero Dependencies**: Lightweight and efficient with no external dependencies.
- 🤖 **Auto-Detection & Repair**: Automatically detects and corrects a wide range of JSON errors, including structural and syntax issues.
- ⚙️ **Error-Free Output**: Always delivers valid JSON strings, no matter the input.

---

## 🧰 Supported Repairs

This tool is capable of resolving the following JSON issues:

- **Quote Issues**:  
  - Add missing quotes around keys  
  - Replace single quotes with double quotes  
  - Handle special quote characters
- **Escape Characters**:  
  - Add missing escape characters  
  - Remove unnecessary escape sequences
- **Syntax & Structure**:  
  - Add missing commas and closing brackets  
  - Remove trailing commas and comments  
  - Handle JSONP notation
- **Special Characters & Values**:  
  - Replace special whitespace characters  
  - Convert Python constants to JSON-compliant values  
  - Process MongoDB-specific data types
- **String Concatenation**:  
  - Join split strings automatically
- **Transformations**:  
  - Convert newline-delimited JSON to arrays

---

## ⚙️ Usage in LLM Contexts

**JSON Repair** is especially useful when working with JSON generated by LLMs:

1. **Data Cleaning**: LLMs often produce malformed JSON that requires repair before use.
2. **API Integration**: Ensure that JSON output from LLMs is valid before sending it to APIs.
3. **Data Analysis**: Clean and standardize JSON data for more consistent results.
4. **Development and Debugging**: Quickly identify and resolve JSON issues in LLM-based applications.

---

## 🔍 Examples of Broken LLM JSON Output

- Incorrect single quotes: `'key': 'value'`
- Improperly formatted JSON string: `{ "key": TRUE, "key2": FALSE, "key3": Null }`
- Mixed quotes: `{ 'key': 'string', \"key2\": false, \"key3\": null }`
- Unclosed arrays: `[1, 2, 3`
- Standalone brackets: `[`, `]`
- Arrays with extra line breaks: `[[1\n\n]`
- Incorrect key-value pairs: `{foo: [}` or `{"value_1": "value_2": "data"}`
- JSON with comments: `{ "value_1": true, COMMENT "value_2": "data" }`
- JSON with malformed links: `{ "content": "[LINK](https://google.com)" }`




---

## 📬 Contact

For questions, suggestions, or feedback, please visit my repository:  
[Alan Salazar - Repository](https://github.com/alanslzrr)  

---

Take control of your JSON data with **JSON Repair**
