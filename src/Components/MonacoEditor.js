import React, { useEffect, useRef } from 'react';

const MonacoEditor = ({file}) => {
    const editorRef = useRef(null); // Reference for the editor container

    useEffect(() => {
        // Configure Monaco paths
        window.require.config({
            paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs" },
        });
        
        // Load Monaco Editor
        window.require(["vs/editor/editor.main"], () => {
            // eslint-disable-next-line no-undef
            monaco.editor.create(editorRef.current, {
                value: file.content,
                language: file.filetype,
                theme: "vs-dark",
                automaticLayout: true,
            });
        });
    }, [file]);

    return <div ref={editorRef} style={{ width: '100%', height: '100%' }} />;
};

export default MonacoEditor;
