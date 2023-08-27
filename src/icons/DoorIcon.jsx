import { G, Path, Circle } from 'react-native-svg'

export const DoorIcon = () => (
  <>
    <G fill='none' fillRule='evenodd' transform='translate(4 1)'>
      <Path
        d='m2.5 2.5h2v14h-2c-1.1045695 0-2-.8954305-2-2v-10c0-1.1045695.8954305-2 2-2zm4.70224688-1.98665742 4.00000002 1.5c.7806074.29272779 1.2977531 1.03896923 1.2977531 1.87265836v11.22799816c0 .8336891-.5171457 1.5799305-1.2977531 1.8726583l-4.00000002 1.5c-1.03424065.3878403-2.18706499-.1361708-2.57490524-1.1704115-.08420779-.2245541-.12734164-.4624229-.12734164-.7022468v-14.22799816c0-1.1045695.8954305-2 2-2 .2398239 0 .47769277.04313385.70224688.12734164z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Circle cx={6.5} cy={9.5} fill='currentColor' r={1} />
    </G>
  </>
)
