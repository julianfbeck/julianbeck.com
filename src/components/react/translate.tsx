import React, { useEffect, useState } from "react";
import FileUploader from "./Fileupload";

function TranslateApp() {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    // Retrieve the API key from localStorage when the app loads
    const storedApiKey = localStorage.getItem("openaiApiKey");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newApiKey = e.target.value;
    setApiKey(newApiKey);
    // Save the API key to localStorage
    localStorage.setItem("openaiApiKey", newApiKey);
  };

  const handleFileUpload = (file: File) => {
    // TODO: Implement file upload logic
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter OpenAI Key"
        value={apiKey}
        onChange={handleApiKeyChange}
      />
      <FileUploader onFileUpload={handleFileUpload} />
    </div>
  );
}

export default TranslateApp;
