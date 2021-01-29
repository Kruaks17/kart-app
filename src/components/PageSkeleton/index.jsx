import styled, {keyframes} from 'styled-components';
import Container  from '../Container';

export const pulseAnimation = keyframes`
  0% {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.05, 1.05, 1.05);
  }

  100% {
    transform: scale3d(1, 1, 1);
  }
}
`;
const PageSkeleton = styled(Container)`

    height: 500px;
    border-radius: 1rem; 
    animation: ${pulseAnimation} 0.5s linear infinite;
`;
export default PageSkeleton;