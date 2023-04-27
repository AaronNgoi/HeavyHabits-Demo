export const HabitGraphLegend


return (
  <div className="py-3 px-2 w-full">
    <div className="flex flex-wrap">
      {/* Content */}
      <div className="w-full md:w-auto flex">
        {weeks}
      </div>
      {/* Legend */}
      <div className="flex justify-center mt-4">
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
          Completed
        </div>
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
          Day Off
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
          Miss
        </div>
      </div>
    </div>
  </div>
);
