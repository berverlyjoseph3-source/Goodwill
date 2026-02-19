import { useState, useEffect } from 'react';

export const DebugImage = ({ src, alt }: { src: string; alt: string }) => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [imageUrl, setImageUrl] = useState(src);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setStatus('success');
    img.onerror = () => setStatus('error');
    img.src = src;
    
    // Also try with full URL if relative
    if (!src.startsWith('http')) {
      const fullUrl = `https://goodwill-production-058c.up.railway.app${src}`;
      const img2 = new Image();
      img2.onload = () => {
        setStatus('success');
        setImageUrl(fullUrl);
      };
      img2.onerror = () => console.log('Both URLs failed');
      img2.src = fullUrl;
    }
  }, [src]);

  if (status === 'loading') return <div>Loading image...</div>;
  if (status === 'error') return <div>❌ Failed to load: {src}</div>;
  
  return <img src={imageUrl} alt={alt} style={{ maxWidth: '100%' }} />;
};