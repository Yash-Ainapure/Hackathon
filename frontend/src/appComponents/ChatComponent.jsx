import { useEffect, useMemo, useState } from "react"
import { io } from "socket.io-client"
import { useProject } from './ProjectContext';
import axios from 'axios';

const ChatComponent = () => {
   const { project } = useProject();
   const [messages, setMessages] = useState([]);
   const [onlineUsers, setOnlineUsers] = useState([
      { id: 1, name: 'Pawan Malgavi', isOnline: true },
      { id: 2, name: 'Harsh Patil', isOnline: true },
      { id: 3, name: 'Aryan Patil', isOnline: false },
      // Add more users as needed
   ]);
   const [projectMembers, setProjectMembers] = useState([]);
   const socket = useMemo(() => io("http://localhost:3000"), [])

   useEffect(() => {
      socket.on("connect", () => {
         console.log("connected", socket.id)
      });
      socket.on("welcome", (s) => {
         console.log(s)
      })
      socket.on("receive-message", (data) => {
         data.isSender = false;
         setMessages((prevMessages) => [...prevMessages, data]);
      })

      return () => {
         socket.disconnect();
      };
   }, []);


   const fetchOnlineMembers = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/projects/fetchProjectMembers', {
          projectId: project._id,
        });
        console.log("Project Members:", response.data);
        setProjectMembers(response.data);
      } catch (error) {
        console.error("Error fetching project members:", error);
      }
    };
  
    useEffect(() => {
      if (project) {
         fetchOnlineMembers();
      }
    }, [project]);
    const user = JSON.parse(localStorage.getItem('user-object'));

    useEffect(() => {
      // Convert projectMembers to the format expected by the DataGrid
      // console.log("Project members updated:",projectMembers.members)
      const members = projectMembers.members
      // console.log("member:",members)
      if (members && members.length > 0) {
  
        const newActiveList = members.map((member, index) => ({
          id: index + 1, // Use member ID or index as ID
          name: member.name,
          isOnline: (user.name  == member.name),
        }));

        console.log("New newActiveList:", newActiveList);
        setOnlineUsers(newActiveList); // Update rows state
      }
    }, [projectMembers]);

   const handleSendMessage = (message) => {
      message.isSender = true;
      setMessages([...messages, message]);
      socket.emit("message", message)

   };
   return (
      <div className="min-h-screen ">
         <div className="flex overflow-scroll h-[680px]">
            <div className="w-1/5 p-4 bg-white shadow-lg">
               <UserList users={onlineUsers} />
            </div>
            <div className="flex flex-col w-3/4 p-4 bg-gray-200">
               <ChatWindow messages={messages} />
               <MessageInput onSendMessage={handleSendMessage} />
            </div>
         </div>
      </div>
   )
}

const MessageInput = ({ onSendMessage }) => {
   const [input, setInput] = useState('');

   const handleSend = () => {
      if (input.trim()) {
         const newMessage = {
            text: input,
            timestamp: Date.now(),
            isSender: true, // Set to true for now, can be controlled by user logic
         };
         onSendMessage(newMessage);
         setInput('');
      }
   };

   return (
      <div className="flex mt-4">
         <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
            placeholder="Type a message..."
         />
         <button
            onClick={handleSend}
            className="px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600"
         >
            Send
         </button>
      </div>
   );
};


const MessageBubble = ({ message }) => {
   return (
      <div className={`flex ${message.isSender ? 'justify-end' : 'justify-start'}`}>
         <div className={`max-w-xs p-3 rounded-lg shadow-md ${message.isSender ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}>
            <p className="text-sm">{message.text}</p>
            <span className="block mt-1 text-xs text-gray-400">
               {new Date(message.timestamp).toLocaleTimeString()}
            </span>
         </div>
      </div>
   );
};


const ChatWindow = ({ messages }) => {
   return (
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
         {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
         ))}
      </div>
   );
};

const UserList = ({ users }) => {
   return (
      <div>
         <h2 className="mb-4 text-lg font-semibold">Online Users</h2>
         <ul className="space-y-2">
            {users.map((user) => (
               <li
                  key={user.id}
                  className={`p-2 rounded-lg ${user.isOnline ? 'bg-green-100' : 'bg-red-100'} shadow-sm`}
               >
                  {user.name}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default ChatComponent