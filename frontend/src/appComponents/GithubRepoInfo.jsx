import { useEffect, useState } from 'react';

const GitHubRepoInfo = () => {
   const [commitMessages, setCommitMessages] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const accessToken = import.meta.env.VITE_GITHUB_TOKEN;
   console.log(accessToken)
   const username = 'Sami3160'; // Replace with the GitHub username
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

            // Initialize an array to hold all commit messages
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

   if (error) {
      return <div>Error: {error}</div>;
   }

   return (
      <div className="container p-4 mx-auto">
         <h1 className="mb-4 text-2xl font-bold">Commit Messages for {username}</h1>
         <ul className="pl-6 list-disc">
            {commitMessages.length > 0 ? (
               commitMessages.map((message, index) => (
                  <li key={index}>{message}</li>
               ))
            ) : (
               <li>No commit messages found</li>
            )}
         </ul>
      </div>
   );
};

export default GitHubRepoInfo;