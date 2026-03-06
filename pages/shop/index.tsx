export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Get database products
    const dbProducts = await prisma.product.findMany({
      include: {
        category: true,
        images: { take: 1 }
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedDb = dbProducts.map(p => ({
      id: parseInt(p.id) || 0,
      name: p.name || '',
      slug: p.slug || '',
      sku: p.sku || `SKU-${p.id}`,
      price: p.price.toNumber(),
      salePrice: p.salePrice?.toNumber() || null,
      image: p.images[0]?.url || '/images/placeholder.jpg',
      category: p.category?.name || 'Uncategorized',
      categorySlug: p.category?.slug || '',
      brand: p.brand || 'Goodwill Medical',
      rating: p.rating || 0,
      reviewCount: p.reviewCount || 0,
      inventory: p.inventory || 0,
      description: p.description || '',
      deliveryEstimate: p.deliveryEstimate || '2-3 business days',
      warranty: p.warranty || '1 year'
    }));

    // Get static products
    const formattedStatic = STATIC_PRODUCTS.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      sku: p.sku,
      price: p.price,
      salePrice: p.salePrice,
      image: p.image,
      category: p.category,
      categorySlug: p.categorySlug,
      brand: p.brand,
      rating: p.rating,
      reviewCount: p.reviewCount,
      inventory: p.inventory,
      description: p.description,
      deliveryEstimate: p.deliveryEstimate,
      warranty: p.warranty
    }));

    // COMBINE BOTH
    const allProducts = [...formattedDb, ...formattedStatic];

    // ✅ DEBUG: Log image paths from both sources
    console.log('📸 DB Products images:', formattedDb.map(p => ({ id: p.id, name: p.name, image: p.image })));
    console.log('📸 Static Products images:', formattedStatic.map(p => ({ id: p.id, name: p.name, image: p.image })));

    return {
      props: {
        initialProducts: allProducts,
        totalCount: allProducts.length
      }
    };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    
    // Fallback to static only
    const formattedStatic = STATIC_PRODUCTS.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      sku: p.sku,
      price: p.price,
      salePrice: p.salePrice,
      image: p.image,
      category: p.category,
      categorySlug: p.categorySlug,
      brand: p.brand,
      rating: p.rating,
      reviewCount: p.reviewCount,
      inventory: p.inventory,
      description: p.description,
      deliveryEstimate: p.deliveryEstimate,
      warranty: p.warranty
    }));

    console.log('📸 Fallback Static Products images:', formattedStatic.map(p => ({ id: p.id, name: p.name, image: p.image })));

    return {
      props: {
        initialProducts: formattedStatic,
        totalCount: formattedStatic.length
      }
    };
  }
};