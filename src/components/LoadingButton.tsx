'use client';

interface LoadingButtonProps {
  isLoading: boolean;
  text: string;
  loadingText?: string;
  type?: 'submit' | 'button';
  onClick?: () => void;
  className?: string;
}

export default function LoadingButton({ 
  isLoading, 
  text, 
  loadingText = 'Memproses...', 
  type = 'submit',
  onClick,
  className = ''
}: LoadingButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`relative w-full px-8 py-3 rounded-full text-sm font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
    >
      <span className={`transition-opacity ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {text}
      </span>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
              fill="none"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="ml-2">{loadingText}</span>
        </div>
      )}
    </button>
  );
} 