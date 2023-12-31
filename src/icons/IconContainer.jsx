import Svg from 'react-native-svg'
import { COLORS } from '../utils/theme'

export const IconContainer = ({ size = 32, color = COLORS.black, children, ...restOfProps }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='w-6 h-6'
    width={size}
    height={size}
    color={color}
    {...restOfProps}
  >
    {children}
  </Svg>
)
