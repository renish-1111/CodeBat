import Navbar from "./core/Navbar";

const About = () => {
  return (
    <div className="bg-tut-bg ">
      <Navbar />
      <div className="pt-24 px-5 xl:px-20">
        {/* 1 */}
        <div className="flex flex-col xl:flex-row gap-8 my-10 xl:my-7">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full xl:w-1/2 flex flex-col items-center justify-center">
            <p className="text-5xl xl:text-7xl font-bold text-center xl:text-center">
              About Codebat
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full xl:w-1/2 flex flex-col items-start">
            <p className="text-2xl text-left xl:p-10 xl:text-left">
              Welcome to Codebat, your number one source for high-quality
              tutorials on various programming and web development topics. Our
              mission is to empower individuals with the knowledge and skills
              they need to excel in the tech industry.
            </p>
          </div>
        </div>
        {/* 2 */}
        <div className="flex flex-col-reverse  xl:flex-row gap-8">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full xl:w-1/2 flex flex-col items-start">
            <p className="text-2xl text-left xl:p-10 xl:text-left">
              Codebat was founded in 2024 by Renish J Ponkiya. We started this
              journey with a passion for teaching and a desire to make learning
              accessible to everyone, regardless of their background or
              experience level.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full xl:w-1/2 flex flex-col items-center justify-center">
            <p className="text-5xl xl:text-7xl font-bold text-center xl:text-center">
              Our Story
            </p>
          </div>
        </div>
        {/* 3 */}
        <div className="flex flex-col xl:flex-row gap-8 my-10 xl:my-7">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full xl:w-1/2 flex flex-col items-center justify-center">
            <p className="text-5xl xl:text-7xl font-bold text-center xl:text-center">
              What We Offer
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full xl:w-1/2 flex flex-col items-start">
            <p className="text-2xl text-left  md:pt-10 md:px-10 xl:text-left">
              We offer a wide range of tutorials covering topics such as:
            </p>
            <ul className="list-disc py-1 ml-6 text-lg xl:px-10">
              <li>Front-End Development</li>
              <li>Backend Development</li>
              <li>Individual Language</li>
              <li>Mobile App Development</li>
            </ul>
            <p className="text-2xl xl:pb-10 xl:mx-10">
              Our tutorials are designed for learners of all levels, from
              beginners to advanced users.
            </p>
          </div>
        </div>
        {/* 4 */}
        <div className="flex flex-col-reverse xl:flex-row gap-8">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full xl:w-1/2 flex flex-col items-start">
            <p className="text-2xl text-left xl:p-10 xl:text-left">
              Our team is made up of dedicated college students who are
              enthusiastic about sharing their knowledge and helping others learn.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full xl:w-1/2 flex flex-col items-center justify-center">
            <p className="text-5xl xl:text-7xl font-bold text-center xl:text-center">
              Student Team
            </p>
          </div>
        </div>
        {/* 5 */}
        <div className="flex flex-col xl:flex-row gap-8 my-10 xl:my-7">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full xl:w-1/2 flex flex-col items-center justify-center">
            <p className="text-5xl xl:text-7xl font-bold text-center xl:text-center">
              Achievements
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full xl:w-1/2 flex flex-col items-start">
            <p className="text-2xl text-left  xl:pt-10 xl:px-10 xl:text-left">
              Since our launch, we have reached several milestones, including:
            </p>
            <ul className="list-disc py-1 ml-6 text-lg xl:pb-10 xl:px-10">
              <li>Publishing over 7 tutorials</li>
              <li>Building a community of 500+ learners</li>
              <li>Receiving the XYZ Award for Educational Excellence</li>
              <li>Partnering with industry experts to enhance content quality</li>
              <li>Achieving a 95% positive feedback rate from users</li>
              <li>Expanding our tutorial library to cover emerging technologies</li>
            </ul>
          </div>
        </div>
        {/* 6 */}
        <div className="flex flex-col-reverse xl:flex-row gap-8">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full xl:w-1/2 flex flex-col items-start">
            <p className="text-2xl text-left xl:p-10 xl:text-left">
              We believe in the power of community and collaboration. Join our
              forums, contribute to discussions, and share your learning
              experiences with others.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full xl:w-1/2 flex flex-col items-center justify-center">
            <p className="text-5xl xl:text-7xl font-bold text-center xl:text-center">
              Join Our Community
            </p>
          </div>
        </div>
        {/* 7 */}
        <div className="flex flex-col xl:flex-row gap-8 py-10 xl:py-7">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full xl:w-1/2 flex flex-col items-center justify-center">
            <p className="text-5xl xl:text-7xl font-bold text-center xl:text-center">
              Contact Us
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full xl:w-1/2 flex flex-col items-start">
            <p className="text-2xl text-left xl:p-10 xl:text-left">
              If you have any questions, feedback, or suggestions, feel free to
              reach out to us at contact@codebat.com or connect with us on social
              media.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;