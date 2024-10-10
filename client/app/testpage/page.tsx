"use client";
import { useState } from 'react';
import { toast } from 'react-toastify';

const TestUploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/provider-services/hero`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const heroData = await response.json();
      toast.success('File uploaded successfully, ID: ' + heroData.id);
    } catch (error) {
      toast.error("File upload failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test File Upload</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload File'}
        </button>
      </form>
    </div>
  );
};

export default TestUploadPage;
