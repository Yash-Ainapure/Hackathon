// import { useEffect, useState } from 'react';
// import { StreamChat } from 'stream-chat';
// import axios from 'axios';
// import { Chat, Channel, MessageList, MessageInput } from 'stream-chat-react';
// import 'stream-chat-react/dist/css/v2/index.css'
// const ChatComponent = () => {
//   const [client, setClient] = useState(null);
//   const user = JSON.parse(localStorage.getItem('user-object')); // Assumes user-object has userId and userName
//   const [channel, setChannel] = useState(null);
//   const project = JSON.parse(localStorage.getItem(localStorage.getItem('defaultProjectId')));
//   const projectId = project._id;

//   useEffect(() => {
//     const initStreamChat = async () => {
//       try {
//         // Fetch token from backend
//         const response = await axios.post('http://localhost:3000/api/chat/generate-token', {
//           userId: user._id,
//           userName: user.name,
//         });

//         const chatClient = StreamChat.getInstance('8hrqmmu5ht95'); // Replace with your actual API key

//         // Connect user to Stream Chat
//         await chatClient.connectUser(
//           { id: user._id, name: user.name },
//           response.data.token
//         );

//         setClient(chatClient);

//         //channel join 
//         console.log("Current Project :- ",project._id);
//         const members = projectMembers.map(member => member._id);
//         const responseChannel  = await axios.post('http://localhost:3000/api/chat/create-channel', {
//          userId: user._id,
//          projectId: projectId,
//          members, // Make sure project._id is available
//        });
 
//        const { channelId } = responseChannel.data;
//        setChannel(channelId);
//        await channel.watch(); // Join the channel

//       } catch (error) {
//         console.error('Error initializing Stream Chat:', error);
//       }
//     };

//     initStreamChat();

//     return () => {
//       if (client) client.disconnectUser();
//     };
//   }, []);

//   return client ? (
//     <Chat client={client} theme="messaging light">
//       <Channel channel={channel}>
//         <MessageList />
//         <MessageInput />
//       </Channel>
//     </Chat>
//   ) : (
//     <p>Loading chat...</p>
//   );
// };

// export default ChatComponent;

import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import axios from 'axios';
import { Chat, Channel, MessageList, MessageInput } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

const ChatComponent = () => {
  const [client, setClient] = useState(null);
  const user = JSON.parse(localStorage.getItem('user-object')); // Assumes user-object has userId and userName
  const [channel, setChannel] = useState(null);
  const project = JSON.parse(localStorage.getItem(localStorage.getItem('defaultProjectId')));
  const projectId = project._id;
  const [projectMembers, setProjectMembers] = useState([]); // Added state for project members

   

  useEffect(() => {
   const initStreamChat = async () => {
     try {
      if (client) {
         await client.disconnectUser();
       }
       // Fetch token from backend
       const response = await axios.post('http://localhost:3000/api/chat/generate-token', {
         userId: user._id,
         userName: user.name,
       });
 
       const chatClient = StreamChat.getInstance('8hrqmmu5ht95'); // Replace with your actual API key
 
       // Connect user to Stream Chat
       await chatClient.connectUser(
         { id: user._id, name: user.name },
         response.data.token
       );
 
       setClient(chatClient);
 
       // Fetch project members
       const projectResponse = await axios.get(`http://localhost:3000/api/projects/${projectId}/members`);
       
       
       const members = [...projectResponse.data.members.map(member => member._id)];  // Create members list
       console.log('Project Members : ',members);
       // Create channel with project members
       const responseChannel = await axios.post('http://localhost:3000/api/chat/create-channel', {
         userId: user._id,
         projectId: projectId,
         members, // Send members list (including the current user)
       });
       console.log('Response.Data :- ',responseChannel);
       
       const { channelId } = responseChannel.data;
 
       // Initialize Stream Chat channel
       const createdChannel = chatClient.channel('team', channelId);
       await createdChannel.watch(); // Join the channel
       setChannel(createdChannel);
 
     } catch (error) {
       console.error('Error initializing Stream Chat:', error);
     }
   };
 
   initStreamChat();
 
   return () => {
      if (client) {
        client.disconnectUser();  // Disconnect user when leaving or logging out
      }
    };
 }, [user._id, projectId]);  // Removed projectMembers from dependencies
  // Added dependencies for re-fetching members

  return client ? (
    <Chat client={client} theme="messaging light">
      {channel && (
        <Channel channel={channel}>
          <MessageList />
          <MessageInput />
        </Channel>
      )}
    </Chat>
  ) : (
    <p>Loading chat...</p>
  );
};

export default ChatComponent;

