import Image from 'next/image';
import { MEDICAL_IMAGES } from '@/constants/images';
import { UserIcon, BriefcaseIcon, LightBulbIcon } from '@heroicons/react/24/outline';

export const CEOSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image - Left side */}
          <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={MEDICAL_IMAGES.about.ceo}
              alt="Nakiyembe Sheilah - CEO of Goodwill Diagnostics Ltd"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Content - Right side */}
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-medical-blue/10 rounded-full text-medical-blue font-medium text-sm">
              <UserIcon className="w-4 h-4 mr-2" />
              PERSONNEL
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Nakiyembe Sheilah
            </h2>
            
            <p className="text-lg text-medical-blue font-medium">
              Chief Executive Officer
            </p>

            <div className="prose prose-lg max-w-none text-slate-600 space-y-4">
              <p>
                Nakiyembe Sheilah is a remarkable businesswoman with 5 years of experience in the medical sales field. As the CEO of Goodwill Diagnostics Ltd, she has demonstrated exceptional leadership and entrepreneurial skills.
              </p>
              
              <p>
                Under her guidance, Goodwill Diagnostics Ltd has made significant contributions to the healthcare industry, providing innovative diagnostic solutions and services. As a seasoned professional in medical sales, Nakiyembe Sheilah has developed a deep understanding of the industry's complexities and nuances.
              </p>
            </div>

            <div className="bg-soft-gray rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">Her success can be attributed to her:</h3>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-medical-blue/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BriefcaseIcon className="w-4 h-4 text-medical-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Strong industry knowledge</p>
                    <p className="text-sm text-slate-600">
                      5 years of experience in medical sales have equipped her with valuable insights and expertise.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-medical-blue/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <UserIcon className="w-4 h-4 text-medical-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Leadership skills</p>
                    <p className="text-sm text-slate-600">
                      As CEO, she has effectively managed and motivated her team to achieve organizational goals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-medical-blue/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <LightBulbIcon className="w-4 h-4 text-medical-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Entrepreneurial spirit</p>
                    <p className="text-sm text-slate-600">
                      Nakiyembe Sheilah has demonstrated a willingness to take calculated risks and innovate in the medical diagnostics field.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-center flex-1">
                <p className="text-2xl font-bold text-medical-blue">5+</p>
                <p className="text-xs text-slate-500">Years Experience</p>
              </div>
              <div className="text-center flex-1 border-l border-gray-200">
                <p className="text-2xl font-bold text-medical-blue">15+</p>
                <p className="text-xs text-slate-500">Hospitals Served</p>
              </div>
              <div className="text-center flex-1 border-l border-gray-200">
                <p className="text-2xl font-bold text-medical-blue">200+</p>
                <p className="text-xs text-slate-500">Products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
