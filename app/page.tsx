'use client';


import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!file) {
      setMessage('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('/api/identify', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setMessage(data.message);
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

      <p>{message}</p>
    </main>
  );
}
