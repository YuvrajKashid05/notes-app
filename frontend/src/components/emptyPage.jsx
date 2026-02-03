export default function EmptyPage({ onCreate }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <button
        onClick={onCreate}
        className="
          w-[320px] md:w-110 h-50
          rounded-[28px]
          border-2 border-dashed border-gray-300
          flex flex-col items-center justify-center
          text-gray-700
          hover:border-gray-400 hover:bg-gray-50
          transition
        "
        type="button"
      >
        <div className="text-3xl mb-3">+</div>
        <div className="text-3xl font-semibold">Add notes</div>
      </button>
    </div>
  );
}
