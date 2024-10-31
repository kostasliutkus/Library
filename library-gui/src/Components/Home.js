import React from 'react';

const Home = () => {
    return (
        <div className="flex items-center justify-center "style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-black mb-4">
          Welcome to Our Library!
        </h1>
        <p variant="gradient" className="text-3xl text-black mb-4 h-max">
          Explore our offerings
        </p>
      </div>
    </div>
    );
};

export default Home;