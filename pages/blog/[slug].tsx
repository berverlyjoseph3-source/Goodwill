import { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CalendarIcon, 
  ChevronLeftIcon,
  ShareIcon,
  BookmarkIcon,
  HeartIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { CommentSection } from '../../components/blog/CommentSection';
import { MEDICAL_IMAGES } from '../../constants/images';
import toast from 'react-hot-toast';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorImage: string;
  authorBio: string;
  category: string;
  tags: string[];
  image: string;
  date: string;
  readTime: number;
  views: number;
  likes: number;
  comments: number;
}

interface BlogPostPageProps {
  post: BlogPost;
}

// Mock blog posts - USING LOCAL IMAGES FROM MEDICAL_IMAGES
const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Home Healthcare: Smart Medical Devices',
    slug: 'future-home-healthcare-smart-devices',
    excerpt: 'Discover how IoT-enabled medical devices are transforming patient care at home...',
    content: '<p>Content here...</p>',
    author: 'Dr. Sarah Chen',
    authorRole: 'Chief Medical Officer',
    authorImage: MEDICAL_IMAGES.testimonials.doctor1,
    authorBio: 'Dr. Sarah Chen has over 20 years of experience in hospital administration.',
    category: 'Healthcare Technology',
    tags: ['Smart Devices', 'IoT', 'Home Care', 'AI'],
    image: MEDICAL_IMAGES.products.patientMonitor,
    date: '2024-01-15',
    readTime: 6,
    views: 1234,
    likes: 89,
    comments: 24,
  },
  {
    id: 2,
    title: 'Understanding FDA Medical Device Classifications',
    slug: 'understanding-fda-medical-device-classifications',
    excerpt: 'A comprehensive guide to FDA device classifications...',
    content: '<p>Content here...</p>',
    author: 'Michael Rodriguez',
    authorRole: 'Quality Assurance Director',
    authorImage: MEDICAL_IMAGES.testimonials.doctor2,
    authorBio: 'Michael Rodriguez oversees quality assurance for all medical devices.',
    category: 'Regulations',
    tags: ['FDA', 'Compliance', 'Safety'],
    image: MEDICAL_IMAGES.about.facility,
    date: '2024-01-10',
    readTime: 8,
    views: 987,
    likes: 67,
    comments: 18,
  },
  {
    id: 3,
    title: 'Essential PPE Guide for Healthcare Facilities',
    slug: 'essential-ppe-guide-healthcare-facilities',
    excerpt: 'Best practices for PPE selection, usage, and inventory management...',
    content: '<p>Content here...</p>',
    author: 'Dr. Emily Watson',
    authorRole: 'Infection Control Specialist',
    authorImage: MEDICAL_IMAGES.testimonials.patient1,
    authorBio: 'Dr. Emily Watson specializes in infection prevention and control.',
    category: 'PPE',
    tags: ['PPE', 'Safety', 'Infection Control'],
    image: MEDICAL_IMAGES.categories.ppe,
    date: '2024-01-05',
    readTime: 5,
    views: 1567,
    likes: 123,
    comments: 32,
  },
  {
    id: 4,
    title: 'Mobility Aids: Choosing the Right Equipment',
    slug: 'mobility-aids-choosing-right-equipment',
    excerpt: 'How to select the appropriate mobility aid for different patient needs...',
    content: '<p>Content here...</p>',
    author: 'James Park',
    authorRole: 'Physical Therapist',
    authorImage: MEDICAL_IMAGES.testimonials.patient2,
    authorBio: 'James Park is a licensed physical therapist with 15 years of experience.',
    category: 'Mobility',
    tags: ['Wheelchairs', 'Walkers', 'Mobility'],
    image: MEDICAL_IMAGES.categories.mobility,
    date: '2023-12-28',
    readTime: 7,
    views: 876,
    likes: 54,
    comments: 12,
  },
  {
    id: 5,
    title: 'Respiratory Care: Advances in Oxygen Therapy',
    slug: 'respiratory-care-advances-oxygen-therapy',
    excerpt: 'New developments in portable oxygen concentrators and CPAP machines...',
    content: '<p>Content here...</p>',
    author: 'Dr. Sarah Chen',
    authorRole: 'Chief Medical Officer',
    authorImage: MEDICAL_IMAGES.testimonials.doctor1,
    authorBio: 'Dr. Sarah Chen leads our clinical research initiatives.',
    category: 'Respiratory',
    tags: ['Oxygen', 'CPAP', 'Respiratory'],
    image: MEDICAL_IMAGES.categories.respiratory,
    date: '2023-12-20',
    readTime: 6,
    views: 1098,
    likes: 87,
    comments: 21,
  },
  {
    id: 6,
    title: 'Hospital Bed Maintenance: Best Practices',
    slug: 'hospital-bed-maintenance-best-practices',
    excerpt: 'Extend the life of your hospital beds with proper maintenance...',
    content: '<p>Content here...</p>',
    author: 'Michael Rodriguez',
    authorRole: 'Quality Assurance Director',
    authorImage: MEDICAL_IMAGES.testimonials.doctor2,
    authorBio: 'Michael Rodriguez oversees quality assurance for all medical equipment.',
    category: 'Equipment Maintenance',
    tags: ['Hospital Beds', 'Maintenance'],
    image: MEDICAL_IMAGES.categories.hospitalFurniture,
    date: '2023-12-15',
    readTime: 5,
    views: 654,
    likes: 43,
    comments: 9,
  },
];

export default function BlogPostPage({ post }: BlogPostPageProps) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post?.likes || 0);

  if (router.isFallback) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-medical-blue border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Post not found</h1>
            <Link href="/blog" className="btn-primary">
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
      toast.success('Removed like');
    } else {
      setLikesCount(prev => prev + 1);
      toast.success('Liked this article');
    }
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Removed from saved' : 'Article saved');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  const relatedPosts = BLOG_POSTS
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] lg:h-[600px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0">
            <div className="container-padding max-w-4xl mx-auto pb-12 md:pb-16">
              <Link
                href="/blog"
                className="inline-flex items-center text-white/90 hover:text-white mb-6 group"
              >
                <ChevronLeftIcon className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Link>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-medical-blue text-white rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                  <span className="text-white/80 text-sm">
                    {post.readTime} min read
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-3xl">
                  {post.title}
                </h1>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                      <Image
                        src={post.authorImage}
                        alt={post.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white font-medium">{post.author}</p>
                      <p className="text-white/80 text-sm">{post.authorRole}</p>
                    </div>
                  </div>
                  <span className="text-white/60">•</span>
                  <div className="flex items-center text-white/80 text-sm">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container-padding max-w-4xl mx-auto">
            {/* Article Actions */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-soft-gray hover:bg-gray-200 transition-colors"
                >
                  {isLiked ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-slate-600" />
                  )}
                  <span className="text-sm font-medium text-slate-700">{likesCount}</span>
                </button>

                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-soft-gray hover:bg-gray-200 transition-colors"
                >
                  <BookmarkIcon className={`w-5 h-5 ${isSaved ? 'text-medical-blue fill-current' : 'text-slate-600'}`} />
                  <span className="text-sm font-medium text-slate-700">
                    {isSaved ? 'Saved' : 'Save'}
                  </span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-soft-gray hover:bg-gray-200 transition-colors"
                >
                  <ShareIcon className="w-5 h-5 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">Share</span>
                </button>
              </div>

              <div className="flex items-center text-sm text-slate-500">
                <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
                {post.comments} comments
              </div>
            </div>

            {/* Article Content */}
            <article 
              className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 
                        prose-a:text-medical-blue prose-strong:text-slate-900
                        prose-img:rounded-xl prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-medium text-slate-900 mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag.toLowerCase()}`}
                    className="px-3 py-1 bg-soft-gray hover:bg-gray-200 rounded-full text-sm text-slate-600 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-soft-gray rounded-2xl">
              <div className="flex items-start space-x-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{post.author}</h3>
                  <p className="text-sm text-medical-blue mb-2">{post.authorRole}</p>
                  <p className="text-sm text-slate-600">{post.authorBio}</p>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <CommentSection postId={post.id} />
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 bg-soft-gray">
            <div className="container-padding max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-48">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-medical-blue transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {related.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = BLOG_POSTS.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = BLOG_POSTS.find((p) => p.slug === params?.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 3600,
  };
};