
const NoteSkeleton = () => {
  return (
    <div className="rounded-[26px] border border-gray-200 p-6 flex flex-col h-full bg-white">
      <div className="skeleton h-8 w-3/4 mb-4 rounded-lg bg-gray-100"></div>
      
      <div className="space-y-2 flex-1 mb-8">
        <div className="skeleton h-4 w-full rounded bg-gray-100"></div>
        <div className="skeleton h-4 w-full rounded bg-gray-100"></div>
        <div className="skeleton h-4 w-2/3 rounded bg-gray-100"></div>
      </div>

      <div className="mt-auto">
        <div className="flex justify-between items-center mb-4">
           <div className="skeleton h-3 w-20 rounded bg-gray-100"></div>
        </div>
        
        <div className="flex gap-2">
           <div className="skeleton h-6 w-16 rounded-full bg-gray-100"></div>
           <div className="skeleton h-6 w-12 rounded-full bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
};

export default NoteSkeleton;
