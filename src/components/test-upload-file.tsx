import { useState } from "react";
import fs from "fs";

export default function UploadFormTest22() {
  const [file, setFile] = useState<null | File>(null);
  const [progress, setProgress] = useState(0);

  const onFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!file) return;

    const chunkSize = 1 * 1024 * 1024; // 4MB
    const chunks = Math.ceil(file.size / chunkSize);

    for (let i = 0; i < chunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const blob = file.slice(start, end);

      const formData = new FormData();
      formData.append("file", blob, `${i}-${file.name}`);

      await fetch("/api/test", {
        method: "POST",
        body: formData,
      });
      setProgress(((i + 1) / chunks) * 100);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onFileChange} />
        <button type="submit">Upload</button>
      </form>
      <progress value={progress} max="100"></progress>
    </div>
  );
}
