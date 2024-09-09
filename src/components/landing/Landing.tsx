const Landing = () => {
  const topics = [
    "Mechanical Operations",
    "Heat Transfer",
    "Process Equipment and Plant Design",
    "Chemical Engineering Thermodynamics",
    "Mass Transfer",
    "Fluid Mechanics"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl md:text-7xl font-bold text-blue-800 mb-12">INDIABIX</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {topics.map((topic) => (
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex items-center justify-center text-center h-40">
            <h2 className="text-xl font-semibold text-gray-800">{topic}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landing;