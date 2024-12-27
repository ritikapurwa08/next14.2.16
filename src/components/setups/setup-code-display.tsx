import React, { useState } from "react";
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

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const customStyle = {
    // other styles for the container, if any
    maxHeight: "400px",

    "::-webkit-scrollbar": {
      width: "10px",
      backgroundColor: "#282c34",
      borderRadius: "10px",
      // A dark background, matching oneDark
    },

    "::-webkit-scrollbar-thumb": {
      background: "#526376", // A lighter grey/blue
      borderRadius: "5px",
    },

    "::-webkit-scrollbar-thumb:hover": {
      background: "#738090",
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: "#282c34",
    },
    //Standardized scrollbar properties for some other browsers
    "scrollbar-width": "thin",
    "scrollbar-color": "#526376 #282c34",
  };

  return (
    <div className={`relative container w-full p-0`}>
      <CopyToClipboard text={codeFile} onCopy={handleCopy}>
        <Button
          size={"sm"}
          variant={"outline"}
          className="absolute top-4 right-4 z-10"
        >
          {copied ? "Copied!" : <Copy className="h-4 w-4 mr-1" />}
          {!copied && "Copy"}
        </Button>
      </CopyToClipboard>
      <div className="w-full container ">
        <SyntaxHighlighter
          customStyle={customStyle}
          language="typescript"
          style={oneDark}
        >
          {codeFile}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default SetupCodeDisplay;
