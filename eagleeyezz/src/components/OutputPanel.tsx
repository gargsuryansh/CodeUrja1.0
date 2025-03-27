
import React from "react";
import { useTheme } from "@/hooks/useTheme";

interface OutputPanelProps {
  height: number;
  output: string;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ height, output }) => {
  return (
    <div 
      className="output-container mt-2"
      style={{ height: `${height}px` }}
    >
      <div className="flex items-center px-4 py-2 border-b border-editor-line">
        <h3 className="text-sm font-medium">Output</h3>
      </div>
      <pre className="p-4 font-mono text-sm overflow-auto h-[calc(100%-40px)]">
        {output}
      </pre>
    </div>
  );
};

export default OutputPanel;
