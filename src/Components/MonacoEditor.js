import React, { useEffect, useRef } from 'react';

const MonacoEditor = () => {
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
                value: `#include <stdio.h>
void reverseArray(int arr[], int size);
void reverseArray(int arr[], int size) {
    int start = 0;
    int end = size - 1;
    while (start < end) {
        // Swap the elements
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        // Move the pointers
        start++;
        end--;
    }
}
int main() {
    printf("Satish Singh 24bcs067\n");
    int n;
    printf("Enter the number of elements in the array: ");
    scanf("%d", &n);

    int arr[n];
    printf("Enter the elements of the array: ");
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    int size = sizeof(arr) / sizeof(arr[0]);

    printf("Original array: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    reverseArray(arr, size);

    printf("Reversed array: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    return 0;
}`,
                language: "c",
                theme: "vs-dark",
                automaticLayout: true,
            });
        });
    }, []);

    return <div ref={editorRef} style={{ width: '100%', height: '100%' }} />;
};

export default MonacoEditor;
