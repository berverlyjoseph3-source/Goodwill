import { PrismaClient, AddressType, OrderStatus, PaymentStatus, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const PRODUCTS = [
  {
    id: 1,
    name: 'Premium Lightweight Wheelchair',
    slug: 'premium-lightweight-wheelchair',
    sku: 'MW-1001',
    price: 299.99,
    salePrice: 249.99,
    image: '/images/products/wheelchair.jpg',
    category: 'Mobility Aids',
    categorySlug: 'mobility-aids',
    brand: 'Goodwill Medical',
    rating: 4.8,
    reviewCount: 124,
    inventory: 15,
    description: 'Lightweight aluminum frame wheelchair.',
    features: ['Weight capacity: 300 lbs', 'Foldable design'],
    deliveryEstimate: '2-3 business days',
    warranty: '2 years',
  },
  {
    id: 2,
    name: 'Electric Power Wheelchair',
    slug: 'electric-power-wheelchair',
    sku: 'MW-1002',
    price: 1299.99,
    salePrice: 1099.99,
    image: '/images/products/wheelchair.jpg',
    category: 'Mobility Aids',
    categorySlug: 'mobility-aids',
    brand: 'Goodwill Medical',
    rating: 4.7,
    reviewCount: 56,
    inventory: 8,
    description: 'Electric wheelchair with joystick control.',
    features: ['Battery range: 15 miles', 'Weight: 120 lbs'],
    deliveryEstimate: '5-7 business days',
    warranty: '3 years',
  },
  {
    id: 3,
    name: 'Portable Oxygen Concentrator',
    slug: 'portable-oxygen-concentrator',
    sku: 'RE-2001',
    price: 899.99,
    salePrice: 799.99,
    image: '/images/products/oxygen.jpg',
    category: 'Respiratory Equipment',
    categorySlug: 'respiratory',
    brand: 'HealthCare Pro',
    rating: 4.9,
    reviewCount: 89,
    inventory: 12,
    description: 'Compact and lightweight oxygen concentrator.',
    features: ['Battery life: 5 hours', 'Weight: 5 lbs'],
    deliveryEstimate: '2-3 business days',
    warranty: '2 years',
  },
  {
    id: 4,
    name: 'CPAP Machine',
    slug: 'cpap-machine',
    sku: 'RE-2002',
    price: 599.99,
    salePrice: 549.99,
    image: '/images/products/oxygen.jpg',
    category: 'Respiratory Equipment',
    categorySlug: 'respiratory',
    brand: 'MedTech',
    rating: 4.8,
    reviewCount: 142,
    inventory: 18,
    description: 'Auto-adjusting CPAP with heated humidifier.',
    features: ['Pressure range: 4-20 cmH2O', 'Auto-ramp'],
    deliveryEstimate: '2-3 business days',
    warranty: '2 years',
  },
  {
    id: 5,
    name: 'Adjustable Hospital Bed',
    slug: 'adjustable-hospital-bed',
    sku: 'HF-3001',
    price: 1299.99,
    image: '/images/products/hospital-bed.jpg',
    category: 'Hospital Furniture',
    categorySlug: 'hospital-furniture',
    brand: 'CarePlus',
    rating: 4.7,
    reviewCount: 56,
    inventory: 7,
    description: 'Fully adjustable electric bed.',
    features: ['Weight capacity: 450 lbs', 'Includes side rails'],
    deliveryEstimate: '7-10 business days',
    warranty: '5 years',
  },
  {
    id: 6,
    name: 'Digital Blood Pressure Monitor',
    slug: 'digital-bp-monitor',
    sku: 'DD-4001',
    price: 49.99,
    image: '/images/products/bp-monitor.jpg',
    category: 'Diagnostic Devices',
    categorySlug: 'diagnostic',
    brand: 'Vital Signs',
    rating: 4.8,
    reviewCount: 203,
    inventory: 45,
    description: 'Automatic inflation blood pressure monitor.',
    features: ['Large LCD display', '200 memory recall'],
    deliveryEstimate: '1-2 business days',
    warranty: '1 year',
  },
  {
    id: 7,
    name: 'Professional Stethoscope',
    slug: 'professional-stethoscope',
    sku: 'DD-4002',
    price: 89.99,
    salePrice: 79.99,
    image: '/images/products/stethoscope.jpg',
    category: 'Diagnostic Devices',
    categorySlug: 'diagnostic',
    brand: 'MedTech',
    rating: 4.9,
    reviewCount: 178,
    inventory: 32,
    description: 'Dual-head stethoscope.',
    features: ['Non-chill rim', 'Adjustable frequency'],
    deliveryEstimate: '1-2 business days',
    warranty: '2 years',
  },
  {
    id: 8,
    name: 'N95 Respirator Masks (50 pack)',
    slug: 'n95-masks-50-pack',
    sku: 'PPE-5001',
    price: 89.99,
    image: '/images/products/ppe-mask.jpg',
    category: 'PPE & Disposables',
    categorySlug: 'ppe',
    brand: 'HealthCare Pro',
    rating: 4.7,
    reviewCount: 167,
    inventory: 0,
    description: 'FDA-approved N95 respirator masks.',
    features: ['95% filtration', 'Adjustable nose clip'],
    deliveryEstimate: '3-5 business days',
    warranty: 'Non-returnable',
  }
];

const CATEGORIES = [
  { id: 1, name: 'Mobility Aids', slug: 'mobility-aids', image: '/images/categories/mobility.jpg', description: 'Wheelchairs, walkers, scooters', icon: '🦽' },
  { id: 2, name: 'Respiratory', slug: 'respiratory', image: '/images/categories/respiratory.jpg', description: 'Oxygen, CPAP, ventilators', icon: '💨' },
  { id: 3, name: 'Hospital Furniture', slug: 'hospital-furniture', image: '/images/categories/hospital-furniture.jpg', description: 'Beds, tables, chairs', icon: '🛏️' },
  { id: 4, name: 'Diagnostic', slug: 'diagnostic', image: '/images/categories/diagnostic.jpg', description: 'BP monitors, stethoscopes', icon: '🩺' },
  { id: 5, name: 'PPE', slug: 'ppe', image: '/images/categories/ppe.jpg', description: 'Masks, gloves, gowns', icon: '🧤' },
  { id: 6, name: 'Home Care', slug: 'home-care', image: '/images/categories/home-care.jpg', description: 'Daily living aids', icon: '🏠' },
];

async function main() {
  console.log('🌱 Seeding database...');
  
  // Clean database
  await prisma.$transaction([
    prisma.orderItem.deleteMany(),
    prisma.order.deleteMany(),
    prisma.review.deleteMany(),
    prisma.wishlistItem.deleteMany(),
    prisma.address.deleteMany(),
    prisma.productImage.deleteMany(),
    prisma.specification.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    prisma.account.deleteMany(),
    prisma.session.deleteMany(),
    prisma.user.deleteMany(),
    prisma.verificationToken.deleteMany(),
  ]);

  // Create users
  const adminPwd = await bcrypt.hash('admin123', 12);
  const managerPwd = await bcrypt.hash('manager123', 12);
  const customerPwd = await bcrypt.hash('customer123', 12);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@goodwillmedical.com',
      password: adminPwd,
      name: 'Admin User',
      role: UserRole.ADMIN,
      emailVerified: new Date(),
    },
  });

  const manager = await prisma.user.create({
    data: {
      email: 'manager@goodwillmedical.com',
      password: managerPwd,
      name: 'Manager User',
      role: UserRole.MANAGER,
      emailVerified: new Date(),
    },
  });

  const customer = await prisma.user.create({
    data: {
      email: 'customer@goodwillmedical.com',
      password: customerPwd,
      name: 'John Customer',
      role: UserRole.CUSTOMER,
      phone: '(555) 123-4567',
      emailVerified: new Date(),
    },
  });

  // Create categories
  for (const cat of CATEGORIES) {
    await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: cat.image,
        icon: cat.icon,
        order: cat.id,
      },
    });
  }

  // Create products
  for (const prod of PRODUCTS) {
    const category = await prisma.category.findUnique({
      where: { slug: prod.categorySlug },
    });

    if (category) {
      await prisma.product.create({
        data: {
          sku: prod.sku,
          name: prod.name,
          slug: prod.slug,
          description: prod.description,
          shortDescription: prod.description.slice(0, 100),
          categoryId: category.id,
          brand: prod.brand,
          price: prod.price,
          salePrice: prod.salePrice || null,
          inventory: prod.inventory,
          rating: prod.rating,
          reviewCount: prod.reviewCount,
          deliveryEstimate: prod.deliveryEstimate,
          warranty: prod.warranty,
          isFeatured: prod.id <= 4,
          tags: [prod.categorySlug],
          features: prod.features,
          images: {
            create: [{ url: prod.image, alt: prod.name, order: 0 }],
          },
        },
      });
    }
  }

  // Create sample order
  const product1 = PRODUCTS[0];
  const product2 = PRODUCTS[5];
  
  const dbProduct1 = await prisma.product.findFirst({ where: { name: product1.name } });
  const dbProduct2 = await prisma.product.findFirst({ where: { name: product2.name } });

  if (dbProduct1 && dbProduct2) {
    // First create the address
    const address = await prisma.address.create({
      data: {
        userId: customer.id,
        type: AddressType.SHIPPING,
        firstName: 'John',
        lastName: 'Customer',
        address1: '123 Main Street',
        city: 'Chicago',
        state: 'IL',
        postalCode: '60601',
        country: 'US',
        phone: '(555) 123-4567',
        isDefault: true,
      },
    });

    // Then create the order with the address ID
    await prisma.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}`,
        userId: customer.id,
        email: customer.email,
        status: OrderStatus.DELIVERED,
        paymentStatus: PaymentStatus.PAID,
        subtotal: 349.98,
        tax: 28,
        shippingCost: 0,
        total: 377.98,
        paymentMethod: 'Credit Card',
        stripePaymentId: 'pi_sample123456',
        carrier: 'FedEx',
        trackingNumber: '789012345678',
        shippingAddressId: address.id, // ✅ Use the created address ID
        items: {
          create: [
            {
              productId: dbProduct1.id,
              name: dbProduct1.name,
              price: dbProduct1.salePrice || dbProduct1.price,
              quantity: 1,
              image: product1.image,
            },
            {
              productId: dbProduct2.id,
              name: dbProduct2.name,
              price: dbProduct2.price,
              quantity: 2,
              image: product2.image,
            },
          ],
        },
      },
    });
  }

  // Create wishlist item
  const wishlistProduct = PRODUCTS[1];
  const dbWishlistProduct = await prisma.product.findFirst({ where: { name: wishlistProduct.name } });
  if (dbWishlistProduct) {
    await prisma.wishlistItem.create({
      data: {
        userId: customer.id,
        productId: dbWishlistProduct.id,
      },
    });
  }

  // Create review
  const reviewProduct = PRODUCTS[0];
  const dbReviewProduct = await prisma.product.findFirst({ where: { name: reviewProduct.name } });
  if (dbReviewProduct) {
    await prisma.review.create({
      data: {
        userId: customer.id,
        productId: dbReviewProduct.id,
        rating: 5,
        title: 'Excellent wheelchair!',
        content: 'Very comfortable and easy to maneuver.',
        verified: true,
      },
    });
    
    await prisma.product.update({
      where: { id: dbReviewProduct.id },
      data: {
        rating: 4.8,
        reviewCount: { increment: 1 },
      },
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log('\n🔐 Admin: admin@goodwillmedical.com / admin123');
  console.log('🔐 Manager: manager@goodwillmedical.com / manager123');
  console.log('🔐 Customer: customer@goodwillmedical.com / customer123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });