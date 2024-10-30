// GitHubActivity.jsx
import React, { useEffect, useState } from 'react';
import GitHubHeatMap from './GitHubHeatMap';

const GitHubActivity = ({ owner, repo }) => {
    const [activeTab, setActiveTab] = useState('commits');
    const [commits, setCommits] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [heatMapData, setHeatMapData] = useState([]);
    const [totalContributions, setTotalContributions] = useState(0);

    // Fetches commits data
    const fetchCommits = async () => {
        setIsLoading(true);
        const perPage = 10;
        try {
            const response = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/commits?page=${page}&per_page=${perPage}`
            );
            const data = await response.json();
            setCommits(prevCommits => [...prevCommits, ...data]);
            setHasMore(data.length > 0);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching commits:', error);
            setIsLoading(false);
        }
    };

    // Fetches heat map data (weekly commit activity for the past year)
    const fetchHeatMapData = async () => {
        try {
            const response = await fetch(
               `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`
            );
            const data = await response.json();
            
            // Sum total contributions and set heat map data
            const totalContributions = data.reduce((sum, week) => sum + week.total, 0);
            setTotalContributions(totalContributions);
            setHeatMapData(data);
        } catch (error) {
            console.error('Error fetching heat map data:', error);
        }
    };

    useEffect(() => {
        if (activeTab === 'commits') {
            fetchCommits();
        } else if (activeTab === 'heatmap') {
            fetchHeatMapData();
        }
    }, [page, activeTab]);

    // Handler for Load More button in Commits tab
    const loadMoreCommits = () => setPage(prevPage => prevPage + 1);

    // Tab button styling
    const tabClass = isActive =>
        isActive
            ? "px-4 py-2 text-blue-600 border-b-2 border-blue-600"
            : "px-4 py-2 text-gray-600";

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto">
            <div className="flex border-b border-gray-300 mb-4">
                <button
                    onClick={() => setActiveTab('commits')}
                    className={tabClass(activeTab === 'commits')}
                >
                    Commits
                </button>
                <button
                    onClick={() => setActiveTab('heatmap')}
                    className={tabClass(activeTab === 'heatmap')}
                >
                    Heat Map
                </button>
            </div>

            {/* Commits Tab */}
            {activeTab === 'commits' && (
                <div>
                    <ul className="space-y-4">
                        {commits.map(commit => (
                            <li key={commit.sha} className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                                <img
                                    src={commit.author?.avatar_url}
                                    alt="Author Avatar"
                                    className="w-12 h-12 rounded-full border border-gray-300"
                                />
                                <div className="flex-1">
                                    <a href={commit.html_url} target="_blank" rel="noopener noreferrer">
                                        <h4 className="text-lg font-medium text-gray-800">
                                            {commit.commit.author.name} <span className="text-gray-500">({commit.author?.login})</span>
                                        </h4>
                                    </a>
                                    <p className="text-gray-600 mt-1">{commit.commit.message}</p>
                                    <small className="text-gray-400">{new Date(commit.commit.author.date).toLocaleString()}</small>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {hasMore && (
                        <div className="text-center mt-4">
                            <button
                                onClick={loadMoreCommits}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Loading...' : 'Load More'}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Heat Map Tab */}
            {activeTab === 'heatmap' && (
                <GitHubHeatMap
                    year={new Date().getFullYear()}
                    contributions={heatMapData}
                    heatMapData={heatMapData}
                    availableYears={[new Date().getFullYear()]} // Hardcoded for simplicity
                />
            )}
        </div>
    );
};

export default GitHubActivity;