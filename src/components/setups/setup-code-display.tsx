// components/setups/setup-code-display.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface SetupCodeDisplayProps {
  codeFile: string;
}

const SetupCodeDisplay: React.FC<SetupCodeDisplayProps> = ({ codeFile }) => {
  const [copied, setCopied] = useState(false);
  const [codeHeight, setCodeHeight] = useState<number | "auto">("auto");
  const codeDivRef = useRef<HTMLDivElement>(null);
  const highlighterRef = useRef<HTMLElement>(null);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateHeight = useCallback(() => {
    if (highlighterRef.current) {
      const height = highlighterRef.current.offsetHeight;
      setCodeHeight(height);
    }
  }, []);

  useEffect(() => {
    calculateHeight();
  }, [codeFile, calculateHeight]);

  const scrollbarStyles = {
    "::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "red",
      borderRadius: "4px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "darkred",
    },
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
      <div
        className="container relative"
        style={{ ...scrollbarStyles, height: codeHeight }}
      >
        <div
          id="code-div"
          className="overflow-auto"
          ref={codeDivRef}
          style={{ ...scrollbarStyles, height: codeHeight }}
        >
          <SyntaxHighlighter
            customStyle={{
              backgroundColor: "#1e1e1e",
              ...scrollbarStyles,
            }}
            language="typescript"
            style={oneDark}
            onAfterRender={calculateHeight}
          >
            {codeFile}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default SetupCodeDisplay;
