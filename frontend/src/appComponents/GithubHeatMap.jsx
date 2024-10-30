import React from 'react';

const GitHubHeatMap = ({ year, contributions = [], heatMapData = [], availableYears }) => {
    const totalContributions = contributions.reduce((sum, week) => sum + week.total, 0);
    const currentYear = new Date().getFullYear();

    // Create a date for January 1st of the current year
    const firstDayOfYear = new Date(currentYear, 0, 1);
    
    // Determine the starting date of the first week that includes January 1st
    const firstWeekStart = new Date(firstDayOfYear);
    firstWeekStart.setDate(firstDayOfYear.getDate() - firstDayOfYear.getDay()); // Adjust to the previous Sunday

    // Get the Unix timestamp (seconds since Jan 1, 1970)
    const firstWeekTimestamp = Math.floor(firstWeekStart.getTime() / 1000);
    
    // Filter the heatMapData to get weeks greater than or equal to the first week timestamp
    const filteredHeatMapData = heatMapData.filter(week => week.week >= firstWeekTimestamp);

    // Check if filteredHeatMapData has less than 52 weeks
    while (filteredHeatMapData.length < 54) {
        // Create a new week object with zero contributions
        const lastWeek = filteredHeatMapData[filteredHeatMapData.length - 1];
        const newWeek = {
            week: lastWeek.week + 604800, // 7 days in seconds (7 * 24 * 60 * 60)
            days: [0, 0, 0, 0, 0, 0, 0], // Zero contributions for each day
            total: 0,
        };
        filteredHeatMapData.push(newWeek);
    }

    // Function to get color intensity
    const getColor = count => {
        if (count === 0) return '#d1d5db'; // light gray for no commits
        const intensity = Math.min(count * 25, 255);
        return `rgba(34, 139, 34, ${intensity / 255})`; // green gradient
    };

    // Function to format the date
    const formatDate = (weekStartTimestamp, dayIndex) => {
        const date = new Date((weekStartTimestamp + dayIndex * 86400) * 1000); // dayIndex * 86400 seconds
        return `${date.toLocaleDateString()} (${date.toLocaleString('default', { weekday: 'long' })})`;
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md w-full min-w-[90%] mx-auto">
            <h2 className="text-xl font-semibold mb-4">{totalContributions} contributions in {year}</h2>

            {/* Year Selector */}
            <div className="flex space-x-2 mb-4">
                {availableYears.map(y => (
                    <button
                        key={y}
                        className={`px-4 py-2 rounded-lg ${y === year ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                        onClick={() => console.log(`Switch to year ${y}`)} // Add your switch year function here
                    >
                        {y}
                    </button>
                ))}
            </div>

            <div className='flex'>
                {/* Weekday Labels */}
                <div className="col-span-1 text-xs mt-3 mx-2 text-gray-400">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>

                {/* Calendar Grid */}
                <div className=" ">
                    {/* Heat Map Rows */}
                    <div className="flex gap-[42px]">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                            <div key={month} className="col-span-4 text-start text-xs text-gray-400">{month}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-54 gap-x-1 col-span-53">
                        {/* Heatmap Data */}
                        {filteredHeatMapData.map((week, weekIdx) => (
                            <React.Fragment key={weekIdx}>
                                <div className="flex flex-col gap-y-1 ">
                                    {week.days.map((day, dayIdx) => (
                                        <div
                                            key={`${weekIdx}-${dayIdx}`}
                                            title={`${day} commits on ${formatDate(week.week, dayIdx)}`} // Updated title
                                            className="w-3 h-3 rounded-sm"
                                            style={{ backgroundColor: getColor(day) }}
                                        />
                                    ))}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center space-x-2 mt-4 text-xs">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map(i => (
                    <div
                        key={i}
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: getColor(i * 10) }}
                    />
                ))}
                <span>More</span>
            </div>
        </div>
    );
};

export default GitHubHeatMap;
