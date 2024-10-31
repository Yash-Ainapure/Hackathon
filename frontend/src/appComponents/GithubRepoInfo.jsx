import { useEffect, useState } from 'react';
import GitHubCommits from './GitHubCommits';
const GitHubRepoInfo = () => {
   const [commitMessages, setCommitMessages] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [apiRateLimit, setApiRateLimit] = useState(null);
   const [commitFrequency, setCommitFrequency] = useState([]);


   const accessToken = import.meta.env.VITE_GITHUB_TOKEN;
   const username = 'Yash-Ainapure'; // Replace with the GitHub username

   const getColorForCount = (count) => {
      if (count > 10) return 'bg-green-600'; // High frequency
      if (count > 5) return 'bg-yellow-500'; // Medium frequency
      if (count > 0) return 'bg-blue-500'; // Low frequency
      return 'bg-gray-200'; // No commits
   };

   useEffect(() => {
      const fetchCommitMessages = async () => {
         try {
            // Fetch the user's repositories
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`, {
               headers: {
                  Authorization: `token ${accessToken}`,
               },
            });

            if (!reposResponse.ok) {
               throw new Error('Failed to fetch repositories');
            }

            const repos = await reposResponse.json();
            console.log('Repositories:', repos); // Log repositories for debugging

            // // Initialize an array to hold all commit messages
            const allCommitMessages = [];

            // Loop through the repositories to get commit messages
            for (const repo of repos) {
               const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits`, {
                  headers: {
                     Authorization: `token ${accessToken}`,
                  },
               });

               if (!commitsResponse.ok) {
                  throw new Error('Failed to fetch commits for repo: ' + repo.name);
               }

               const commits = await commitsResponse.json();
               console.log(`Commits for ${repo.name}:`, commits); // Log commits for debugging

               commits.forEach((commit) => {
                  allCommitMessages.push(commit.commit.message);
               });
            }

            // Fetch commits for each repository
            const commitPromises = repos.map(repo =>
               fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=100`, {
                  headers: {
                     Authorization: `token ${accessToken}`,
                  },
               }).then(response => response.json())
            );

            const commitsData = await Promise.all(commitPromises);


            const commitFrequencyMap = {};

            commitsData.forEach(commits => {
               commits.forEach(commit => {
                  const date = new Date(commit.commit.author.date).toISOString().split('T')[0];
                  commitFrequencyMap[date] = (commitFrequencyMap[date] || 0) + 1;
               });
            });

            const frequencyArray = Object.entries(commitFrequencyMap).map(([date, count]) => ({
               date,
               count,
            }));

            setCommitFrequency(frequencyArray);

            // Fetch API rate limit
            const rateLimitResponse = await fetch('https://api.github.com/rate_limit', {
               headers: {
                  Authorization: `token ${accessToken}`,
               },
            });

            if (!rateLimitResponse.ok) {
               throw new Error('Failed to fetch API rate limit');
            }

            const rateLimitData = await rateLimitResponse.json();
            setApiRateLimit(rateLimitData.rate);


            setCommitMessages(allCommitMessages);
            setLoading(false);
         } catch (err) {
            setError(err.message);
            setLoading(false);
         }
      };

      fetchCommitMessages();
   }, [username, accessToken]);

   if (loading) {
      return <div>Loading...</div>;
   }

   // if (error) {
   //    return <div>Error: {error}</div>;
   // }

   return (
      <div className="container h-screen p-4 mx-auto overflow-scroll scrollbar-hide">
          <GitHubCommits owner="Yash-Ainapure" repo="Hackathon" />
         <div>
            {/* <h1 className="p-2 mb-4 text-2xl font-bold bg-white rounded-lg">Commit Messages from user {username}</h1>
            <ul className="relative px-10 py-4 overflow-scroll list-disc bg-white rounded-lg scrollbar-hide h-80">
               {commitMessages.length > 0 ? (
                  commitMessages.map((message, index) => (
                     <li key={index}>{message}</li>
                  ))
               ) : (
                  <li>No commit messages found</li>
               )}
            </ul>
         </div>
         <div className="container min-h-screen p-4 mx-auto overflow-scroll">
            <h1 className="p-2 mb-4 text-2xl font-bold bg-white rounded-lg">GitHub Stats for {username}</h1> */}

            {/* Contributions Graph */}
            {/* <div className='p-2 bg-white rounded-lg'>
               <h2 className="mt-2 mb-2 text-xl font-semibold">Contributions Graph</h2>
               <div className="flex flex-wrap mb-2">
                  {commitFrequency.map((data, index) => (
                     <div
                        key={index}
                        className={`w-6 h-6 m-1 ${getColorForCount(data.count)}`}
                        title={`${data.date}: ${data.count} commits`}
                     />
                  ))}
               </div>
            </div> */}

            {/* API Rate Limit */}
            {/* <h2 className="mt-6 mb-2 text-xl font-semibold">API Rate Limit Status</h2>
            {apiRateLimit ? (
               <div>
                  <p>Limit: {apiRateLimit.limit}</p>
                  <p>Remaining: {apiRateLimit.remaining}</p>
                  <p>Reset: {new Date(apiRateLimit.reset * 1000).toLocaleTimeString()}</p>
               </div>
            ) : (
               <p>Loading API rate limit...</p>
            )} */}

            {/* Commit Frequency
            <h2 className="mt-6 mb-2 text-xl font-semibold">Commit Frequency</h2>
            <ul className="pl-6 list-disc">
               {commitFrequency.map((data, index) => (
                  <li key={index}>{`${data.date}: ${data.count} commits`}</li>
               ))}
            </ul> */}
         </div>
      </div>
   );
};

export default GitHubRepoInfo;
