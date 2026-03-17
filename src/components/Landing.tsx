import Footer from './Footer';
import Hero from './Hero';
import { NavBar } from './NavBar';
import Login from './Login';
import Register from './Register';
import { useState, useEffect } from 'react';

const images = [
  "/hero-screenshot1.png",
  "/hero-screenshot2.png",
  "/hero-screenshot3.png",
  "/hero-screenshot4.png",
];

const Landing = () => {
  const [current, setCurrent] = useState('');
  const [index, setIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (current) {
      case 'login':
        return <Login />;
      case 'register':
        return <Register setCurrent={setCurrent} />;
      default:
        return (
          <div className="flex flex-col items-center">
            <Hero setCurrent={setCurrent} />
            <div className="mt-6 w-full max-w-2xl h-72 overflow-hidden rounded-2xl shadow-lg">
              <img
                src={images[index]}
                alt="App Screenshot"
                className="w-full h-full object-cover transition-all duration-700"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-2 mx-auto max-w-7xl">
      <NavBar setCurrent={setCurrent} />
      <div className="flex flex-1 justify-center items-center">
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
