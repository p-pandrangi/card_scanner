'use client';

import { useState } from 'react';

type IdentifyResult = {
  filename: string;
  type: string;
  sizeKB: number;
};

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<IdentifyResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    setError('');
    setResult(null);

    if (!file) {
      setError('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('/api/identify', { method: 'POST', body: formData });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Upload failed');
      return;
    }

    setResult(data);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Pokémon Card Scanner (MVP)</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Upload</button>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Filename:</strong> {result.filename}</p>
          <p><strong>Type:</strong> {result.type}</p>
          <p><strong>Size:</strong> {result.sizeKB} KB</p>
        </div>
      )}
    </main>
  );
}
