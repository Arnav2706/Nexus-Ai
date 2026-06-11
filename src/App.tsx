import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden text-white flex flex-col items-center justify-center">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-hero-glow opacity-60 pointer-events-none" />
      
      {/* Content */}
      <div className="z-10 text-center space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Nexus <span className="text-primary">AI</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-md mx-auto">
          Personal Conference Intelligence Agent
        </p>
      </div>
    </div>
  );
}

export default App;
