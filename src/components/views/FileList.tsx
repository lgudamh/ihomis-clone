import { useEffect, useState } from "react";

export function FileList({ admissionId }: { admissionId: string }) {
  const [files, setFiles] = useState<any[]>([]);

  const fetchFiles = async () => {
    const { data } = await supabase
      .from("uploads")
      .select("*")
      .eq("admission_id", admissionId)
      .order("uploaded_at", { ascending: false });

    setFiles(data || []);
  };

  useEffect(() => {
    fetchFiles();
  }, [admissionId]);

  return (
    <div className="mt-4 space-y-2">
      <h3 className="text-lg font-semibold">Uploaded Files</h3>
      {files.map((file) => (
        <div key={file.id} className="border p-2 flex justify-between">
          <div>
            <p className="font-bold">{file.category}</p>
            <a href={file.file_url} target="_blank" rel="noreferrer" className="text-blue-500 underline">
              {file.file_name}
            </a>
          </div>
          <span className="text-xs text-gray-500">{new Date(file.uploaded_at).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}
