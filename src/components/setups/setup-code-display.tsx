// components/setups/setup-code-display.tsx
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // You can use other styles
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface SetupCodeDisplayProps {
  codeFile: string;
}

const SetupCodeDisplay: React.FC<SetupCodeDisplayProps> = ({ codeFile }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="relative">
      <CopyToClipboard text={codeFile} onCopy={handleCopy}>
        <Button
          size={"sm"}
          variant={"outline"}
          className="absolute top-2 right-2 z-10"
        >
          {copied ? "Copied!" : <Copy className="h-4 w-4 mr-2" />}
          {!copied && "Copy"}
        </Button>
      </CopyToClipboard>
      <SyntaxHighlighter
        customStyle={{
          backgroundColor: "#1e1e1e",
        }}
        language="typescript"
        style={oneDark}
      >
        {codeFile}
      </SyntaxHighlighter>
    </div>
  );
};

export default SetupCodeDisplay;
