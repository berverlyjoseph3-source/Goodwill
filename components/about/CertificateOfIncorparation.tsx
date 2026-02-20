import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export const CertificateOfIncorporation = () => {
  return (
    <section className="bg-[#f5f7fa] py-16 md:py-24">
      <div className="container-padding max-w-4xl mx-auto">
        {/* Certificate Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 lg:p-16 border border-gray-100">
          
          {/* Top: URSB Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              {/* Placeholder for URSB logo - replace with actual logo */}
              <div className="w-full h-full bg-[#0B3B5C] rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">URSB</span>
              </div>
              {/* When you have actual logo, use:
              <Image
                src="/images/ursb-logo.png"
                alt="Uganda Registration Services Bureau"
                fill
                className="object-contain"
              />
              */}
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-center text-[#1e2b3a] mb-2 tracking-wide">
            Certificate of Incorporation
          </h1>
          
          {/* Company Name */}
          <div className="text-center mb-6">
            <p className="text-2xl md:text-3xl font-bold text-[#0B3B5C] mb-2">
              Goodwill Diagnostic Limited
            </p>
            <p className="text-sm text-gray-600 font-medium">
              (Private Limited by Shares)
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 my-8"></div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-wider text-gray-500 font-semibold">Registration No</p>
              <p className="text-lg font-mono text-[#1e2b3a]">80034316306305</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-wider text-gray-500 font-semibold">Date of Incorporation</p>
              <p className="text-lg text-[#1e2b3a]">26 July 2024</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-wider text-gray-500 font-semibold">Place of Incorporation</p>
              <p className="text-lg text-[#1e2b3a]">Kampala, Uganda</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-wider text-gray-500 font-semibold">Certificate Issued</p>
              <p className="text-lg text-[#1e2b3a]">26 July 2024</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 my-8"></div>

          {/* Certified True Copy Section */}
          <div className="bg-[#f8fafc] p-6 rounded-lg mb-8 border border-gray-200">
            <h2 className="text-xl font-serif text-[#0B3B5C] mb-4 text-center">Certified True Copy</h2>
            <div className="flex justify-center items-center space-x-8">
              <div>
                <p className="text-sm text-gray-500">Certified on:</p>
                <p className="text-lg font-medium text-[#1e2b3a]">25 October 2024</p>
                <p className="text-sm text-gray-500">12:18:29</p>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <p className="text-sm text-gray-500">Certificate issued:</p>
                <p className="text-lg font-medium text-[#1e2b3a]">26 July 2024</p>
              </div>
            </div>
          </div>

          {/* Legal Text */}
          <div className="text-center text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
            <p className="text-base md:text-lg">
              This is to certify that <span className="font-semibold text-[#0B3B5C]">Goodwill Diagnostic Limited</span> has been 
              duly incorporated with limited liability under <span className="font-semibold">The Companies Act, 2012</span> 
              (Republic of Uganda).
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 my-8"></div>

          {/* Signature Area */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <p className="text-lg font-semibold text-[#0B3B5C]">Registrar of Companies</p>
              <p className="text-xl font-serif text-[#1e2b3a] mt-2">Chandia Agnes</p>
              <div className="mt-3 w-48 h-0.5 bg-[#0B3B5C]/30 mx-auto md:mx-0"></div>
              <p className="text-sm text-gray-500 mt-2">Authorized Signature</p>
            </div>
            
            {/* Official Seal Placeholder */}
            <div className="w-24 h-24 rounded-full border-2 border-[#0B3B5C]/20 flex items-center justify-center">
              <span className="text-[#0B3B5C] text-xs text-center font-bold">OFFICIAL SEAL</span>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-center mt-8">
          <a
            href="/documents/certificate-of-incorporation.pdf"
            download
            className="inline-flex items-center px-6 py-3 bg-[#0B3B5C] text-white rounded-lg hover:bg-[#0a2e4a] transition-colors shadow-md hover:shadow-lg"
          >
            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
            Download Official Certificate (PDF)
          </a>
        </div>
        <p className="text-xs text-gray-500 text-center mt-3">
          Official document issued by Uganda Registration Services Bureau
        </p>
      </div>
    </section>
  );
};