import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  admissionId: string;
  onUpload?: () => void;
};

export function FileUploadForm({ admissionId, onUpload }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("lab_result");

  const handleUpload = async () => {
    if (!file) return;

    const filePath = `${admissionId}/${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(filePath, file);

    if (error) return alert("Upload failed");

    const url = supabase.storage.from("uploads").getPublicUrl(filePath).data.publicUrl;

    await supabase.from("uploads").insert({
      admission_id: admissionId,
      file_name: file.name,
      file_url: url,
      category,
    });

    alert("Uploaded successfully");
    setFile(null);
    onUpload?.();
  };

  return (
    <div className="space-y-2">
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 w-full">
        <option value="cf1">PhilHealth CF1</option>
        <option value="cf2">PhilHealth CF2</option>
        <option value="lab_result">Lab Result</option>
        <option value="others">Others</option>
      </select>

      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
    </div>
  );
}
