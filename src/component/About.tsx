import Navbar from "./core/Navbar";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-24 mx-5 md:mx-20">
        {/* 1 */}
        <div className="flex flex-col md:flex-row gap-8 my-10 md:my-7">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full md:w-1/2 flex flex-col items-center justify-center">
            <p className="text-5xl md:text-7xl font-bold text-center md:text-center">
              About Codebat
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full md:w-1/2 flex flex-col items-start">
            <p className="text-2xl text-left md:p-10 md:text-left">
              Welcome to Codebat, your number one source for high-quality
              tutorials on various programming and web development topics. Our
              mission is to empower individuals with the knowledge and skills
              they need to excel in the tech industry.
            </p>
          </div>
        </div>
        {/* 2 */}
        <div className="flex flex-col-reverse  md:flex-row gap-8">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full md:w-1/2 flex flex-col items-start">
            <p className="text-2xl text-left md:p-10 md:text-left">
              Codebat was founded in 2024 by Renish J Ponkiya. We started this
              journey with a passion for teaching and a desire to make learning
              accessible to everyone, regardless of their background or
              experience level.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full md:w-1/2 flex flex-col items-center justify-center">
            <p className="text-5xl md:text-7xl font-bold text-center md:text-center">
              Our Story
            </p>
          </div>
        </div>
        {/* 3 */}
        <div className="flex flex-col md:flex-row gap-8 my-10 md:my-7">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full md:w-1/2 flex flex-col items-center justify-center">
            <p className="text-5xl md:text-7xl font-bold text-center md:text-center">
              What We Offer
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full md:w-1/2 flex flex-col items-start">
            <p className="text-2xl text-left  md:pt-10 md:px-10 md:text-left">
              We offer a wide range of tutorials covering topics such as:
            </p>
            <ul className="list-disc py-1 ml-6 text-lg md:px-10">
              <li>Front-End Development</li>
              <li>Backend Development</li>
              <li>Individual Language</li>
              <li>Mobile App Development</li>
            </ul>
            <p className="text-2xl md:pb-10 md:mx-10">
              Our tutorials are designed for learners of all levels, from
              beginners to advanced users.
            </p>
          </div>
        </div>
        {/* 4 */}
        <div className="flex flex-col-reverse md:flex-row gap-8">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full md:w-1/2 flex flex-col items-start">
            <p className="text-2xl text-left md:p-10 md:text-left">
              Our team is made up of dedicated college students who are
              enthusiastic about sharing their knowledge and helping others learn.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full md:w-1/2 flex flex-col items-center justify-center">
            <p className="text-5xl md:text-7xl font-bold text-center md:text-center">
              Student Team
            </p>
          </div>
        </div>
        {/* 5 */}
        <div className="flex flex-col md:flex-row gap-8 my-10 md:my-7">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full md:w-1/2 flex flex-col items-center justify-center">
            <p className="text-5xl md:text-7xl font-bold text-center md:text-center">
              Achievements
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full md:w-1/2 flex flex-col items-start">
            <p className="text-2xl text-left  md:pt-10 md:px-10 md:text-left">
              Since our launch, we have reached several milestones, including:
            </p>
            <ul className="list-disc py-1 ml-6 text-lg md:pb-10 md:px-10">
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
        <div className="flex flex-col-reverse md:flex-row gap-8">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full md:w-1/2 flex flex-col items-start">
            <p className="text-2xl text-left md:p-10 md:text-left">
              We believe in the power of community and collaboration. Join our
              forums, contribute to discussions, and share your learning
              experiences with others.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full md:w-1/2 flex flex-col items-center justify-center">
            <p className="text-5xl md:text-7xl font-bold text-center md:text-center">
              Join Our Community
            </p>
          </div>
        </div>
        {/* 7 */}
        <div className="flex flex-col md:flex-row gap-8 my-10 md:my-7">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full md:w-1/2 flex flex-col items-center justify-center">
            <p className="text-5xl md:text-7xl font-bold text-center md:text-center">
              Contact Us
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full md:w-1/2 flex flex-col items-start">
            <p className="text-2xl text-left md:p-10 md:text-left">
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
