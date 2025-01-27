import React, { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";

function CodeEditor({ file }) {
  const editorRef = useRef(null); // Ref to store the editor instance
  const monacoRef = useRef(null); // Ref to store the Monaco instance

  // Capture the editor instance and Monaco instance when mounted
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  // Update editor content when the file changes
  useEffect(() => {
    if (editorRef.current) {
      const currentContent = editorRef.current.getValue();
      if (currentContent !== file.content) {
        editorRef.current.setValue(file.content);
      }
    }
  }, [file.content]);

  // Update editor language when the file type changes
  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      const currentModel = editorRef.current.getModel();
      monacoRef.current.editor.setModelLanguage(currentModel, file.filetype || "plaintext");
    }
  }, [file.filetype]);

  return (
    <Editor
      height="100%"
      defaultLanguage={file.filetype} // Default language
      theme="vs-dark" // Editor theme
      defaultValue={file.content}
      onMount={handleEditorDidMount} // Capture editor and Monaco instance
    />
  );
}

export default CodeEditor;
