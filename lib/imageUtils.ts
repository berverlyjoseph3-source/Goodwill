/**
 * Professional image utility for Goodwill Diagnostics
 * Handles all image paths consistently across the entire application
 */

/**
 * Ensures any image path is correctly formatted with leading slash
 * and points to the correct public directory
 */
export function getProfessionalImageUrl(imagePath: string | null | undefined): string {
  // Default fallback
  if (!imagePath) return '/images/placeholder.jpg';
  
  // If it's already an absolute URL, return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Clean the path: remove any leading dots or incorrect patterns
  let cleanPath = imagePath.replace(/^\.\/+/, ''); // Remove ./ 
  cleanPath = cleanPath.replace(/^\/+/, '/'); // Ensure single leading slash
  
  // If path doesn't start with /images/, fix it
  if (!cleanPath.startsWith('/images/')) {
    // Extract just the filename
    const filename = cleanPath.split('/').pop() || 'placeholder.jpg';
    cleanPath = `/images/products/${filename}`;
  }
  
  return cleanPath;
}

/**
 * Batch fixes an array of products to ensure all image URLs are correct
 */
export function fixProductImages<T extends { image?: string; images?: string[] }>(products: T[]): T[] {
  return products.map(product => {
    const fixedProduct = { ...product };
    
    // Fix main image
    if (fixedProduct.image) {
      fixedProduct.image = getProfessionalImageUrl(fixedProduct.image);
    }
    
    // Fix images array if it exists
    if (fixedProduct.images && Array.isArray(fixedProduct.images)) {
      fixedProduct.images = fixedProduct.images.map(img => getProfessionalImageUrl(img));
    }
    
    return fixedProduct;
  });
}