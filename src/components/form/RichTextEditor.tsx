import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillInstance = useRef<Quill | null>(null);

    useEffect(() => {
        if (editorRef.current && !quillInstance.current) {
            quillInstance.current = new Quill(editorRef.current, {
                theme: "snow",
                modules: {
                    toolbar: [
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        ["bold", "italic", "underline"],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],

                        [{ 'indent': '-1' }, { 'indent': '+1' }],    
                        [{ 'direction': 'rtl' }],                     

                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'align': [] }],

                        ['clean']
                    ],
                },
                placeholder: "Tulis sesuatu di sini...",
            });

            quillInstance.current.root.innerHTML = value || "";
            quillInstance.current.on("text-change", () => {
                onChange(quillInstance.current!.root.innerHTML);
            });
        }
    }, []);

    useEffect(() => {
        if (quillInstance.current && quillInstance.current.root.innerHTML !== value) {
            quillInstance.current.root.innerHTML = value;
        }
    }, [value]);

    return (
        <div className="w-full">
            {/* Quill akan otomatis menyisipkan toolbar di atas editor */}
            <div
                ref={editorRef}
                style={{
                    height: "300px",
                    overflow: "auto",
                    resize: "vertical",
                    border: "1px solid #ccc",
                }}
            />
        </div>
    );
};

export default RichTextEditor;