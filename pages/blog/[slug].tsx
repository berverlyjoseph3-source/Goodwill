import { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CalendarIcon, 
  UserIcon, 
  TagIcon,
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
import toast from 'react-hot-toast';

// Mock blog posts - ALL 6 POSTS
const BLOG_POSTS = [
  {
    id: 1,
    title: 'The Future of Home Healthcare: Smart Medical Devices',
    slug: 'future-home-healthcare-smart-devices',
    excerpt: 'Discover how IoT-enabled medical devices are transforming patient care at home, improving outcomes, and reducing hospital readmissions.',
    content: `
      <p class="lead">The healthcare landscape is undergoing a dramatic transformation. With the advent of Internet of Things (IoT) technology, medical devices are becoming smarter, more connected, and increasingly capable of providing real-time patient monitoring and care outside traditional clinical settings.</p>
      
      <h2>The Rise of Connected Medical Devices</h2>
      <p>Smart medical devices are revolutionizing home healthcare. From blood pressure monitors that automatically sync with your smartphone to insulin pumps that adjust dosage based on real-time glucose readings, these devices are making it easier for patients to manage their health conditions from the comfort of their homes.</p>
      
      <h3>Key Benefits of Smart Home Healthcare Devices</h3>
      <ul>
        <li><strong>Real-time monitoring:</strong> Healthcare providers can track patient vital signs continuously, enabling early intervention when issues arise.</li>
        <li><strong>Improved patient compliance:</strong> Smart reminders and easy-to-use interfaces help patients adhere to treatment plans.</li>
        <li><strong>Reduced hospital readmissions:</strong> Early detection of complications prevents emergency room visits.</li>
        <li><strong>Cost savings:</strong> Home-based care is significantly more cost-effective than hospital stays.</li>
      </ul>
      
      <h2>Current Innovations in Smart Medical Devices</h2>
      <p>Several groundbreaking technologies are currently available or in development:</p>
      
      <h3>1. Smart Inhalers</h3>
      <p>Connected inhalers track usage patterns, remind patients to take their medication, and provide data to healthcare providers about trigger patterns and medication effectiveness.</p>
      
      <h3>2. Wearable ECG Monitors</h3>
      <p>Modern wearable devices can now provide medical-grade ECG monitoring, detecting arrhythmias and other cardiac conditions in real-time.</p>
      
      <h3>3. Intelligent Medication Dispensers</h3>
      <p>Smart pill dispensers ensure patients take the right medication at the right time, reducing medication errors among elderly patients.</p>
      
      <h2>The Role of AI in Medical Device Technology</h2>
      <p>Artificial intelligence is playing an increasingly important role in smart medical devices. Machine learning algorithms can analyze patient data to predict health deterioration before it becomes critical, allowing for proactive rather than reactive care.</p>
      
      <h2>Challenges and Considerations</h2>
      <p>While the potential of smart medical devices is enormous, several challenges remain:</p>
      <ul>
        <li><strong>Data security and privacy:</strong> Protecting sensitive health information is paramount.</li>
        <li><strong>Regulatory compliance:</strong> Devices must meet strict FDA requirements.</li>
        <li><strong>Interoperability:</strong> Different devices and systems need to communicate seamlessly.</li>
        <li><strong>User adoption:</strong> Devices must be intuitive enough for patients of all ages and technical abilities.</li>
      </ul>
      
      <h2>The Future Outlook</h2>
      <p>As technology continues to advance and costs decrease, smart medical devices will become increasingly accessible. We're moving toward a future where proactive, personalized, and preventive care is the norm rather than the exception.</p>
      
      <p>The integration of 5G networks will enable even more sophisticated remote monitoring capabilities, while advances in battery technology will make devices smaller and more convenient to use.</p>
      
      <h2>Conclusion</h2>
      <p>The future of home healthcare is bright, and smart medical devices are at the forefront of this transformation. As healthcare providers, patients, and technology companies continue to collaborate, we can expect to see even more innovative solutions that improve patient outcomes and quality of life.</p>
    `,
    author: 'Dr. Sarah Chen',
    authorRole: 'Chief Medical Officer',
    authorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80',
    authorBio: 'Dr. Sarah Chen has over 20 years of experience in hospital administration and medical technology. She leads our clinical research initiatives.',
    category: 'Healthcare Technology',
    tags: ['Smart Devices', 'IoT', 'Home Care', 'AI'],
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1200&q=80',
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
    excerpt: 'A comprehensive guide to FDA device classifications and what they mean for healthcare providers and patients.',
    content: `
      <p class="lead">The Food and Drug Administration (FDA) classifies medical devices into three categories based on the level of risk they pose to patients. Understanding these classifications is crucial for healthcare providers, patients, and manufacturers alike.</p>
      
      <h2>Class I: Low-Risk Devices</h2>
      <p>Class I devices are low-risk and subject to the least regulatory control. They include simple devices like bandages, examination gloves, and handheld surgical instruments. Approximately 47% of medical devices fall into this category.</p>
      
      <h2>Class II: Moderate-Risk Devices</h2>
      <p>Class II devices are moderate-risk and require more regulatory controls to ensure safety and effectiveness. These include powered wheelchairs, infusion pumps, and surgical drapes. About 43% of medical devices are Class II.</p>
      
      <h2>Class III: High-Risk Devices</h2>
      <p>Class III devices are high-risk and require the most stringent regulatory controls. They typically support or sustain human life, are of substantial importance in preventing impairment of human health, or present a potential unreasonable risk of illness or injury. Examples include implantable pacemakers, heart valves, and breast implants.</p>
      
      <h2>The 510(k) Clearance Process</h2>
      <p>Most Class II devices require 510(k) clearance, which demonstrates that the device is substantially equivalent to a legally marketed device. This process is faster and less expensive than the Premarket Approval (PMA) process required for Class III devices.</p>
      
      <h2>Premarket Approval (PMA)</h2>
      <p>Class III devices require PMA, the most stringent type of device marketing application required by FDA. Applicants must provide valid scientific evidence demonstrating the device's safety and effectiveness.</p>
      
      <h2>De Novo Classification</h2>
      <p>The De Novo pathway provides a route to classify novel low- to moderate-risk devices into Class I or II. This pathway is for devices that have no legally marketed predicate device.</p>
      
      <h2>Impact on Healthcare Providers</h2>
      <p>Understanding these classifications helps healthcare providers make informed decisions about which devices to use in their practice. It also helps them understand the level of regulatory scrutiny a device has undergone.</p>
      
      <h2>Conclusion</h2>
      <p>FDA classifications provide a framework for ensuring medical device safety and effectiveness. By understanding these classifications, healthcare providers can better serve their patients and make informed purchasing decisions.</p>
    `,
    author: 'Michael Rodriguez',
    authorRole: 'Quality Assurance Director',
    authorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
    authorBio: 'Michael Rodriguez oversees quality assurance and regulatory compliance for all medical devices sold on our platform.',
    category: 'Regulations',
    tags: ['FDA', 'Compliance', 'Safety', 'Regulations'],
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&q=80',
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
    excerpt: 'Best practices for PPE selection, usage, and inventory management in hospitals and clinics.',
    content: `
      <p class="lead">Personal Protective Equipment (PPE) is the last line of defense for healthcare workers against infectious materials. This guide covers essential PPE types, proper usage, and inventory management strategies.</p>
      
      <h2>Types of PPE</h2>
      <p>Healthcare facilities require various types of PPE, including:</p>
      <ul>
        <li><strong>Respiratory Protection:</strong> N95 respirators, surgical masks</li>
        <li><strong>Eye Protection:</strong> Goggles, face shields</li>
        <li><strong>Hand Protection:</strong> Nitrile gloves, latex gloves</li>
        <li><strong>Body Protection:</strong> Isolation gowns, coveralls</li>
        <li><strong>Foot Protection:</strong> Shoe covers, boots</li>
      </ul>
      
      <h2>PPE Selection Criteria</h2>
      <p>When selecting PPE, consider the following factors:</p>
      <ul>
        <li>Type of exposure anticipated</li>
        <li>Durability and appropriateness for the task</li>
        <li>Fit and comfort for the wearer</li>
        <li>Compliance with regulatory standards</li>
        <li>Compatibility with other PPE</li>
      </ul>
      
      <h2>Proper PPE Usage</h2>
      <p>PPE is only effective when used correctly. Key principles include:</p>
      <ul>
        <li>Always perform hand hygiene before donning and after doffing</li>
        <li>Inspect PPE for damage before use</li>
        <li>Don PPE in the correct sequence</li>
        <li>Remove PPE carefully to avoid contamination</li>
        <li>Never reuse disposable PPE</li>
      </ul>
      
      <h2>Inventory Management</h2>
      <p>Effective PPE inventory management is crucial for healthcare facilities. Best practices include:</p>
      <ul>
        <li>Maintaining a minimum stock level based on usage patterns</li>
        <li>Rotating stock to prevent expiration</li>
        <li>Tracking usage to forecast future needs</li>
        <li>Establishing relationships with multiple suppliers</li>
        <li>Having contingency plans for shortages</li>
      </ul>
      
      <h2>PPE During Pandemics</h2>
      <p>The COVID-19 pandemic highlighted the importance of PPE preparedness. Facilities should have strategies for:</p>
      <ul>
        <li>Extended use and reuse of PPE when approved</li>
        <li>Conservation strategies during shortages</li>
        <li>Alternative PPE options when primary supplies are depleted</li>
        <li>Staff training on crisis capacity strategies</li>
      </ul>
      
      <h2>Regulatory Standards</h2>
      <p>PPE must meet specific regulatory standards:</p>
      <ul>
        <li>NIOSH certification for respirators</li>
        <li>ASTM standards for masks and gowns</li>
        <li>FDA approval for medical gloves</li>
        <li>ANSI/ISEA standards for eye and face protection</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Proper PPE selection, usage, and inventory management are essential for healthcare worker safety and facility preparedness. Regular training and audits help ensure compliance and effectiveness.</p>
    `,
    author: 'Dr. Emily Watson',
    authorRole: 'Infection Control Specialist',
    authorImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80',
    authorBio: 'Dr. Emily Watson specializes in infection prevention and control, with extensive experience in hospital epidemiology.',
    category: 'PPE',
    tags: ['PPE', 'Safety', 'Infection Control', 'COVID-19'],
    image: 'https://images.unsplash.com/photo-1584636633446-b9c3d91a8d24?w=1200&q=80',
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
    excerpt: 'How to select the appropriate mobility aid for different patient needs and conditions.',
    content: `
      <p class="lead">Selecting the right mobility aid can significantly improve a patient's quality of life and independence. This guide helps healthcare providers and patients make informed decisions about mobility equipment.</p>
      
      <h2>Types of Mobility Aids</h2>
      <p>Common mobility aids include:</p>
      <ul>
        <li><strong>Canes:</strong> For minimal support and balance</li>
        <li><strong>Walkers:</strong> For moderate support and stability</li>
        <li><strong>Rollators:</strong> Walkers with wheels and seats</li>
        <li><strong>Crutches:</strong> For temporary injuries</li>
        <li><strong>Wheelchairs:</strong> Manual and powered</li>
        <li><strong>Mobility Scooters:</strong> For longer distances</li>
      </ul>
      
      <h2>Assessment Factors</h2>
      <p>When selecting a mobility aid, consider:</p>
      <ul>
        <li>Patient's strength and endurance</li>
        <li>Balance and coordination</li>
        <li>Living environment (home, community)</li>
        <li>Lifestyle and activities</li>
        <li>Cognitive function</li>
        <li>Caregiver assistance available</li>
      </ul>
      
      <h2>Canes: Types and Selection</h2>
      <p>Canes come in various types:</p>
      <ul>
        <li><strong>Single-point canes:</strong> For mild balance issues</li>
        <li><strong>Quad canes:</strong> Four points for more stability</li>
        <li><strong>Offset canes:</strong> Better weight distribution</li>
        <li><strong>Folding canes:</strong> Convenient for travel</li>
      </ul>
      
      <h2>Walkers and Rollators</h2>
      <p>Walkers provide more support than canes:</p>
      <ul>
        <li><strong>Standard walkers:</strong> Must be lifted, for those with good upper body strength</li>
        <li><strong>Two-wheel walkers:</strong> Glide on front wheels</li>
        <li><strong>Rollators:</strong> Four wheels, hand brakes, and seats</li>
        <li><strong>Knee walkers:</strong> For foot and ankle injuries</li>
      </ul>
      
      <h2>Wheelchair Selection</h2>
      <p>Wheelchair considerations include:</p>
      <ul>
        <li><strong>Manual vs. powered:</strong> Based on patient strength and endurance</li>
        <li><strong>Frame type:</strong> Rigid or folding</li>
        <li><strong>Seat width and depth:</strong> Proper fit prevents pressure injuries</li>
        <li><strong>Back height:</strong> Based on trunk stability</li>
        <li><strong>Armrest and leg rest options:</strong> For comfort and positioning</li>
      </ul>
      
      <h2>Proper Fit and Training</h2>
      <p>Proper fit is essential for safety and effectiveness. Patients should receive training on:</p>
      <ul>
        <li>Safe use of the mobility aid</li>
        <li>Transfer techniques</li>
        <li>Navigating obstacles</li>
        <li>Maintenance and care</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>The right mobility aid can restore independence and improve quality of life. A thorough assessment and proper fitting are essential for optimal outcomes.</p>
    `,
    author: 'James Park',
    authorRole: 'Physical Therapist',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    authorBio: 'James Park is a licensed physical therapist with 15 years of experience in rehabilitation and mobility training.',
    category: 'Mobility',
    tags: ['Wheelchairs', 'Walkers', 'Patient Care', 'Mobility'],
    image: 'https://images.unsplash.com/photo-1584518938427-8fd3918eb3c0?w=1200&q=80',
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
    excerpt: 'New developments in portable oxygen concentrators and CPAP machines improving patient quality of life.',
    content: `
      <p class="lead">Respiratory care has seen significant advances in recent years, particularly in oxygen therapy and sleep apnea treatment. This article explores the latest innovations improving patient outcomes and quality of life.</p>
      
      <h2>Portable Oxygen Concentrators</h2>
      <p>Modern portable oxygen concentrators (POCs) offer several advantages over traditional oxygen tanks:</p>
      <ul>
        <li><strong>Lightweight designs:</strong> Some models weigh as little as 2-3 pounds</li>
        <li><strong>Longer battery life:</strong> Up to 10-15 hours on a single charge</li>
        <li><strong>Pulse dose technology:</strong> Delivers oxygen only when the patient inhales</li>
        <li><strong>Airline approved:</strong> FAA-approved for in-flight use</li>
        <li><strong>Quiet operation:</strong> Improved compressors reduce noise</li>
      </ul>
      
      <h2>CPAP Machine Innovations</h2>
      <p>CPAP therapy for sleep apnea has evolved significantly:</p>
      <ul>
        <li><strong>Auto-adjusting pressure:</strong> Automatically adjusts pressure based on patient needs</li>
        <li><strong>Heated humidifiers:</strong> Integrated for comfort</li>
        <li><strong>Ramp features:</strong> Starts at lower pressure and gradually increases</li>
        <li><strong>Expiratory pressure relief:</strong> Reduces pressure during exhalation</li>
        <li><strong>Data tracking:</strong> Smartphone apps track therapy compliance and effectiveness</li>
      </ul>
      
      <h2>Home Ventilators</h2>
      <p>Advances in home ventilation technology include:</p>
      <ul>
        <li>Smaller, more portable designs</li>
        <li>Improved battery life for mobility</li>
        <li>Advanced alarm systems for safety</li>
        <li>Remote monitoring capabilities</li>
        <li>Better patient-ventilator synchrony</li>
      </ul>
      
      <h2>Telemedicine Integration</h2>
      <p>Respiratory devices now integrate with telemedicine platforms:</p>
      <ul>
        <li>Remote monitoring of oxygen saturation</li>
        <li>Virtual adjustments to therapy settings</li>
        <li>Automated compliance reporting</li>
        <li>Early warning of potential issues</li>
      </ul>
      
      <h2>Patient Quality of Life</h2>
      <p>These advances have significantly improved patient quality of life:</p>
      <ul>
        <li>Greater mobility and independence</li>
        <li>Improved sleep quality</li>
        <li>Reduced hospital readmissions</li>
        <li>Better therapy adherence</li>
        <li>Enhanced social participation</li>
      </ul>
      
      <h2>Future Directions</h2>
      <p>Emerging technologies in respiratory care include:</p>
      <ul>
        <li>Smart inhalers with adherence tracking</li>
        <li>Wearable respiratory monitors</li>
        <li>AI-powered predictive analytics</li>
        <li>Closed-loop oxygen delivery systems</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Advances in respiratory care technology are transforming patient care, offering greater freedom, improved outcomes, and better quality of life for individuals with respiratory conditions.</p>
    `,
    author: 'Dr. Sarah Chen',
    authorRole: 'Chief Medical Officer',
    authorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80',
    authorBio: 'Dr. Sarah Chen has over 20 years of experience in hospital administration and medical technology.',
    category: 'Respiratory',
    tags: ['Oxygen', 'CPAP', 'Sleep Apnea', 'Respiratory'],
    image: 'https://images.unsplash.com/photo-1584547366618-c4673b5e9b16?w=1200&q=80',
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
    excerpt: 'Extend the life of your hospital beds with proper maintenance and care protocols.',
    content: `
      <p class="lead">Proper maintenance of hospital beds is essential for patient safety, equipment longevity, and cost-effectiveness. This guide outlines best practices for hospital bed maintenance.</p>
      
      <h2>Daily Visual Inspections</h2>
      <p>Healthcare staff should perform daily visual checks of:</p>
      <ul>
        <li>Mattress condition and integrity</li>
        <li>Side rail functionality</li>
        <li>Caster wheels and brakes</li>
        <li>Control pendant operation</li>
        <li>Emergency release mechanisms</li>
        <li>Power cords and plugs</li>
      </ul>
      
      <h2>Weekly Functional Testing</h2>
      <p>Weekly testing should include:</p>
      <ul>
        <li>All bed positioning functions (head, foot, height)</li>
        <li>Trendelenburg and reverse Trendelenburg positions</li>
        <li>Bed exit alarm systems</li>
        <li>Scale functionality (if equipped)</li>
        <li>CPR release mechanism</li>
        <li>Battery backup systems</li>
      </ul>
      
      <h2>Monthly Preventive Maintenance</h2>
      <p>Comprehensive monthly maintenance should include:</p>
      <ul>
        <li>Lubrication of moving parts</li>
        <li>Tightening of loose fasteners</li>
        <li>Inspection of hydraulic/electric systems</li>
        <li>Testing of all safety features</li>
        <li>Calibration of scales</li>
        <li>Cleaning of mechanical components</li>
      </ul>
      
      <h2>Cleaning and Disinfection</h2>
      <p>Proper cleaning protocols are essential:</p>
      <ul>
        <li>Use manufacturer-approved cleaning agents</li>
        <li>Clean between patients thoroughly</li>
        <li>Pay special attention to high-touch areas</li>
        <li>Allow adequate drying time</li>
        <li>Document all cleaning activities</li>
      </ul>
      
      <h2>Mattress Care</h2>
      <p>Mattress maintenance includes:</p>
      <ul>
        <li>Regular inspection for tears or wear</li>
        <li>Proper laundering of covers</li>
        <li>Rotation to prevent uneven wear</li>
        <li>Replacement every 3-5 years</li>
        <li>Use of waterproof covers</li>
      </ul>
      
      <h2>Documentation and Tracking</h2>
      <p>Maintain detailed records of:</p>
      <ul>
        <li>All inspections and maintenance performed</li>
        <li>Repairs and parts replaced</li>
        <li>Cleaning activities</li>
        <li>Equipment age and lifecycle</li>
        <li>Incidents or issues reported</li>
      </ul>
      
      <h2>Staff Training</h2>
      <p>Ensure all staff are trained on:</p>
      <ul>
        <li>Proper bed operation</li>
        <li>Daily inspection procedures</li>
        <li>Reporting issues promptly</li>
        <li>Emergency procedures</li>
        <li>Cleaning protocols</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Regular maintenance extends hospital bed life, ensures patient safety, and reduces long-term costs. A comprehensive maintenance program should include daily inspections, regular testing, preventive maintenance, and thorough documentation.</p>
    `,
    author: 'Michael Rodriguez',
    authorRole: 'Quality Assurance Director',
    authorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
    authorBio: 'Michael Rodriguez oversees quality assurance for all medical equipment sold on our platform.',
    category: 'Equipment Maintenance',
    tags: ['Hospital Beds', 'Maintenance', 'Safety', 'Equipment'],
    image: 'https://images.unsplash.com/photo-1587351021759-3772687fe598?w=1200&q=80',
    date: '2023-12-15',
    readTime: 5,
    views: 654,
    likes: 43,
    comments: 9,
  },
];

interface BlogPostPageProps {
  post: typeof BLOG_POSTS[0];
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

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

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1);
      toast.success('Removed like');
    } else {
      setLikesCount(likesCount + 1);
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