import Image from 'next/image';
import Link from 'next/link';
import { 
  HeartIcon, 
  ShieldCheckIcon, 
  TruckIcon, 
  UsersIcon,
  StarIcon,
  CheckBadgeIcon 
} from '@heroicons/react/24/outline';
import { MEDICAL_IMAGES, COMPANY_INFO } from '../constants/images';
import { CertificateOfIncorporation } from '../components/about/CertificateOfIncorporation';
import { CEOSection } from '../components/about/CEOSection';
import { ClientLogos } from '../components/about/ClientLogos';

export default function AboutPage() {
  const stats = [
    { label: 'Years of Service', value: '5+', icon: StarIcon },
    { label: 'Hospitals Served', value: '15+', icon: HeartIcon },
    { label: 'Products', value: '200+', icon: ShieldCheckIcon },
    { label: 'Happy Patients', value: '10K+', icon: UsersIcon },
  ];

  const certifications = [
    {
      name: 'FDA Approved',
      description: 'All medical devices meet FDA standards',
      icon: '✅',
    },
    {
      name: 'ISO 13485:2016',
      description: 'Quality management systems for medical devices',
      icon: '🔬',
    },
    {
      name: 'CE Certified',
      description: 'European health, safety, and environmental standards',
      icon: '🇪🇺',
    },
    {
      name: 'HIPAA Compliant',
      description: 'Patient data protection and privacy',
      icon: '🔒',
    },
  ];

  const productCategories = [
    'Autoclaves & Sterilizers',
    'Consumables',
    'Defibrillators',
    'Dental',
    'Diathermy And Electrosurgical Instruments',
    'Disposables',
    'ECG',
    'Endoscopes',
    'Gynecology And Obstetrics',
    'Imaging And Ultrasound',
    'Laboratory',
    'Manikins And Gowns',
    'Medical Furniture',
    'Nursing And Homecare',
    'Operation Room',
    'Orthopedic Implants And Nails',
    'Pediatric',
    'Respiratory',
    'Spirometers + Feetal Doppler',
    'Suction Machines',
    'Surgical Instruments',
    'Ventilators & Anesthesia',
    'Vital Signs & Patient Monitors',
    'X-Ray Machines',
  ];

  const services = [
    {
      title: 'Delivery and Installation',
      description: 'Goodwill Diagnostics Ltd ensures that we deliver your equipment to your destination depending on the distance and time involved.',
      icon: '🚚',
    },
    {
      title: 'Training and Knowledge Transfer',
      description: 'Goodwill Diagnostics Ltd offers training and knowledge transfer from the most experienced technicians.',
      icon: '📚',
    },
    {
      title: 'Repair and Maintenance',
      description: 'We repair a wide range of electronic, electromechanical, and hydraulic equipment used in hospitals and health practitioners’ offices even after the sale.',
      icon: '🔧',
    },
    {
      title: 'Consultancy',
      description: 'You can consult us for any inquiries about your equipment, and our team is ready to answer you as soon as possible with efficiency.',
      icon: '💬',
    },
    {
      title: 'Internship',
      description: 'Goodwill Diagnostics Ltd offers free internship programs to students, especially from recognized institutions and universities in Uganda.',
      icon: '🎓',
    },
    {
      title: 'Full Turn Key',
      description: 'Our equipment lists are standardized, and brand choices are made taking into account budget, reliability, serviceability and the total cost of ownership.',
      icon: '🔑',
    },
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Goodwill Diagnostics Ltd. established by Nakiyembe Sheila in Kampala.',
    },
    {
      year: '2021',
      title: 'First Major Contracts',
      description: 'Began serving local hospitals and clinics with diagnostic solutions.',
    },
    {
      year: '2022',
      title: 'Regional Expansion',
      description: 'Extended services to international hospitals and specialized clinics.',
    },
    {
      year: '2023',
      title: 'ISO Certification',
      description: 'Achieved ISO 13485:2016 quality management certification.',
    },
    {
      year: '2024',
      title: 'Trusted Partner',
      description: 'Became the preferred supplier for 15+ leading medical facilities.',
    },
    {
      year: '2025',
      title: 'Continued Growth',
      description: 'Expanding product range and strengthening client relationships.',
    },
  ];

  return (
    <>
      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-medical-blue/5 via-white to-white py-16 md:py-24">
          <div className="container-padding max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-medical-blue/10 rounded-full text-medical-blue font-medium text-sm mb-6">
                  <HeartIcon className="w-4 h-4 mr-2" />
                  Company Profile 2025
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                  {COMPANY_INFO.name}
                </h1>
                <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                  Goodwill Diagnostics Ltd is a Ugandan-based medical company limited by shares and registered by 
                  Uganda Registration Services Bureau (URSB) under registration number {COMPANY_INFO.registrationNumber}.
                </p>
                <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                  Goodwill is committed to providing quality technical support and services for all health facilities 
                  in the country. We deal only in brand new equipment and provide full aftersales support and technical 
                  assistance that matches the requirements of our clients by working with reputable international brands.
                </p>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Our suppliers are well-known and reputable manufacturers from China. All these suppliers hold international 
                  certifications and are well-recognized by international bodies such as IEEE, ISO, CE and FDA. We extend our 
                  highly specialized services and products to Hospitals, Laboratories, Diagnostic centres, Schools, 
                  Pharmaceuticals and Dental clinics all over the country.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/shop" className="btn-primary">
                    Browse Products
                  </Link>
                  <Link href="/contact" className="btn-secondary">
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={MEDICAL_IMAGES.about.facility}
                  alt="Modern medical facility"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-soft-gray">
          <div className="container-padding max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="w-12 h-12 bg-medical-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-medical-blue" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24">
          <div className="container-padding max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-medical-blue/5 to-white rounded-2xl p-8">
                <div className="w-14 h-14 bg-medical-blue rounded-xl flex items-center justify-center mb-6">
                  <HeartIcon className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  To be the leading distributor of medical equipment in East Africa.
                </p>
              </div>
              <div className="bg-gradient-to-br from-medical-blue/5 to-white rounded-2xl p-8">
                <div className="w-14 h-14 bg-medical-blue rounded-xl flex items-center justify-center mb-6">
                  <ShieldCheckIcon className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  To provide quality and affordable medical Health Technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-soft-gray">
          <div className="container-padding max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our Journey
              </h2>
              <p className="text-lg text-slate-600">
                Five years of growth, innovation, and unwavering commitment to quality
              </p>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-medical-blue/20 hidden lg:block" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div key={item.year} className={`flex flex-col lg:flex-row ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                    <div className="flex-1" />
                    <div className="flex items-center justify-center lg:w-24">
                      <div className="w-12 h-12 bg-medical-blue rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">
                        {item.year.slice(-2)}
                      </div>
                    </div>
                    <div className="flex-1 lg:px-8">
                      <div className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow
                                    ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-slate-600">{item.description}</p>
                        <span className="inline-block mt-3 text-sm font-medium text-medical-blue">
                          {item.year}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 md:py-24">
          <div className="container-padding max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our Certifications
              </h2>
              <p className="text-lg text-slate-600">
                We meet the highest standards in medical device quality and safety
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert) => (
                <div key={cert.name} className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{cert.icon}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{cert.name}</h3>
                  <p className="text-sm text-slate-600">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CEO Section */}
        <CEOSection />

        {/* Services Section */}
        <section className="py-16 bg-soft-gray">
          <div className="container-padding max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our Services
              </h2>
              <p className="text-lg text-slate-600">
                Comprehensive support for all your medical equipment needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service.title} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="w-12 h-12 bg-medical-blue/10 rounded-lg flex items-center justify-center mb-4 text-2xl">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Categories Grid */}
        <section className="py-16 bg-white">
          <div className="container-padding max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Product Categories
              </h2>
              <p className="text-lg text-slate-600">
                Comprehensive range of medical equipment and supplies
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {productCategories.map((category) => (
                <div
                  key={category}
                  className="px-3 py-2 bg-soft-gray rounded-lg text-sm text-slate-700 hover:bg-medical-blue/10 hover:text-medical-blue transition-colors text-center"
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients Logos Section */}
        <ClientLogos />

        {/* Certificate of Incorporation Section */}
        <section className="py-16">
          <CertificateOfIncorporation />
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-medical-blue to-medical-blue-dark py-16">
          <div className="container-padding max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to equip your facility?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join 15+ hospitals and thousands of home care patients who trust {COMPANY_INFO.name}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-white text-medical-blue px-8 py-4 rounded-lg font-semibold 
                         hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
              >
                Shop Now
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold 
                         hover:bg-white/10 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
