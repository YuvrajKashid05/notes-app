
const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-gray-900 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <span className="ml-4 text-gray-500 font-medium">Loading...</span>
    </div>
  );
};

export default Loading;
