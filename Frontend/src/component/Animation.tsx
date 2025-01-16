import { TypeAnimation } from 'react-type-animation';

interface textTime {
  sequence: any[];
}

const Animation = (props:textTime) => {
  return (
    <TypeAnimation
      sequence={props.sequence}
      wrapper="span"
      speed={10}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
  );
};

export default Animation;