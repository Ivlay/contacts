import Box from '@mui/material/Box';

interface ButtonLoaderProps {
  isLoading: boolean;
}

const ButtonLoader: React.FC<ButtonLoaderProps> = ({ isLoading }) => {
  return (
    isLoading ? (
      <Box
        position="absolute"
        right={15}
        top={3}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          className="lds-rolling"
        >
          <circle 
            cx="50"
            cy="50"
            fill="none"
            stroke="#ffffff"
            strokeWidth="10"
            r="35"
            strokeDasharray="164.93361431346415 56.97787143782138"
            transform="rotate(227.818 50 50)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              calcMode="linear"
              values="0 50 50;360 50 50"
              keyTimes="0;1"
              dur="2s"
              begin="0s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </Box>
    ) : null
  );
}

export default ButtonLoader;
