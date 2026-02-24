import Image from 'next/image';
import { MEDICAL_IMAGES } from '../../constants/images';

const clients = [
  { name: 'Platinum Medical Centre', image: MEDICAL_IMAGES.clients.platinum },
  { name: 'IHK', image: MEDICAL_IMAGES.clients.ihk },
  { name: 'Kampala Hospital', image: MEDICAL_IMAGES.clients.kampala },
  { name: 'Mawano Dental Clinic', image: MEDICAL_IMAGES.clients.mawano },
  { name: 'Al-shafa Modern Hospital Ltd', image: MEDICAL_IMAGES.clients.alshafa },
  { name: 'Infectious Diseases Institute', image: MEDICAL_IMAGES.clients.idi },
  { name: "Doctors' Hospital Sseguku", image: MEDICAL_IMAGES.clients.doctors },
  { name: 'Case Medical Care', image: MEDICAL_IMAGES.clients.care },
  { name: 'Uganda Cancer Institute', image: MEDICAL_IMAGES.clients.cancer },
  { name: 'Ruby Hospital', image: MEDICAL_IMAGES.clients.ruby },
  { name: 'Shine Dental Clinic', image: MEDICAL_IMAGES.clients.shine },
  { name: 'St. Catherine Hospital', image: MEDICAL_IMAGES.clients.catherine },
  { name: 'Nile International Hospital', image: MEDICAL_IMAGES.clients.nile },
  { name: 'Najjerra Hospital', image: MEDICAL_IMAGES.clients.najjerra },
];

export const ClientLogos = () => {
  return (
    <section className="py-16 bg-soft-gray">
      <div className="container-padding max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
          Trusted By
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
          {clients.map((client) => (
            <div
              key={client.name}
              className="group flex items-center justify-center p-4 bg-white rounded-xl 
                       shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative w-24 h-16 md:w-28 md:h-20 grayscale group-hover:grayscale-0 
                            transition-all duration-300 group-hover:scale-105">
                <Image
                  src={client.image}
                  alt={client.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 96px, 112px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};