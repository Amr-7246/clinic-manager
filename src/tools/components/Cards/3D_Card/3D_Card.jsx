import { Tilt } from 'react-tilt';
import { SectionWrapper } from '.';
import { services } from './Techs';

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[250px] w-full">
    {/* <motion.div variants={fadeIn('top', 'spring', index * 0.5, 0.75)} className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card" > */}
    <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card" >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="!bg-[var(--black)] rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img src={icon} alt="web-development" className="w-16 h-16 object-contain" loading="lazy" />
        <h3 className="!text-[var(--text)] text-[20px] font-bold text-center">{title}</h3>
      </div>
    </div>
  </Tilt>
);

const About = () => {

  return (
    <>
      <div className="mt-20 flex flex-wrap justify-center gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

const WrappedAbout = SectionWrapper(About, 'about');

export default WrappedAbout;
