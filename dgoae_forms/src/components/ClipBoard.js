import { useState } from "react";
import "./ClipBoard.css";
export const ClipboardCopy = ({copyText}) => {
    

    const [isCopied, setIsCopied] = useState(false);
  
    // This is the function we wrote earlier
    async function copyTextToClipboard(text) {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.execCommand('copy', true, text);
      }
    }
  
    // onClick handler function for the copy button
    const handleCopyClick = () => {
      // Asynchronously call copyTextToClipboard
      copyTextToClipboard(copyText)
        .then(() => {
          // If successful, update the isCopied state value
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    return (
        <div>
        <input className="copy-input" type="text" value={copyText} readOnly  />
        <button className="copy-button" onClick={handleCopyClick}>
          <span>{isCopied ? 'Copiado!' : 'Copiar'}</span>
        </button>
      </div>
    );
  }

