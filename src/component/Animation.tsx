import { TypeAnimation } from 'react-type-animation';

const Animation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Code Your Future, One Tutorial at a Time',
        2000, // wait 1s before replacing "Mice" with "Hamsters"
        'Unlock the World of Coding with Expert Guidance',
        2000,
        'Empowering Developers, One Line of Code at a Time',
        2000,
        'From Zero to Hero: Master Coding with Us',
        2000
      ]}
      wrapper="span"
      speed={10}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
  );
};

export default Animation;