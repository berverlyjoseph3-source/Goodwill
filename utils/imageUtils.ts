export const getImageUrl = (url: string | undefined | null): string => {
  if (!url) return '/images/placeholder.jpg';
  
  // If it's already a full URL, return it
  if (url.startsWith('http')) return url;
  
  // If it's a relative path, prepend your domain
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goodwill-production-058c.up.railway.app';
  return `${baseUrl}${url}`;
};

export const isValidImage = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};
