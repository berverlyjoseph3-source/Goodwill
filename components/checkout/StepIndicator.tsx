interface StepIndicatorProps {
  currentStep: 'information' | 'shipping' | 'payment';
}

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const steps = [
    { key: 'information', label: 'Information', number: 1 },
    { key: 'shipping', label: 'Shipping', number: 2 },
    { key: 'payment', label: 'Payment', number: 3 },
  ];

  const getStepIndex = () => {
    switch (currentStep) {
      case 'information': return 1;
      case 'shipping': return 2;
      case 'payment': return 3;
      default: return 1;
    }
  };

  const currentStepIndex = getStepIndex();

  return (
    <div className="flex items-center">
      {steps.map((step, index) => (
        <div key={step.key} className="flex items-center">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${currentStepIndex >= step.number
                  ? 'bg-medical-blue text-white'
                  : 'bg-gray-200 text-slate-600'
                }`}
            >
              {step.number}
            </div>
            <span
              className={`ml-2 text-sm font-medium hidden sm:block
                ${currentStep === step.key
                  ? 'text-medical-blue'
                  : 'text-slate-500'
                }`}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-12 h-0.5 mx-2 sm:mx-4
                ${currentStepIndex > step.number
                  ? 'bg-medical-blue'
                  : 'bg-gray-200'
                }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};