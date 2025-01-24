// src/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const streamClient = require('../config/streamClient');

// Endpoint to generate a user token for Stream
router.post('/generate-token', async (req, res) => {
    const { userId, userName } = req.body; // Expect userId and userName from the request

    try {
        // Ensure the user exists or create them
        await streamClient.upsertUser({
            id: userId,
            name: userName,
            role: 'user',
        });

        // Generate a token for the user
        const token = streamClient.createToken(userId);
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error generating token:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// src/routes/chatRoutes.js
router.post('/create-channel', async (req, res) => {
    const { userId, projectId ,members} = req.body;

    try {
        if (!userId || !projectId) {
            return res.status(400).json({ message: 'userId and projectId are required' });
        }
        // console.log("Creating channel for Project ID:", projectId, "with User ID:", userId);
        // Create a unique channel for the project, based on projectId
        const channel = streamClient.channel('team', projectId, {
            name: `Project ${projectId}`,
            members: [...members],
            created_by_id: userId,  // Add the creator of the channel initially
        });

        await channel.create();

        res.status(200).json({ channelId: channel.id });
    } catch (error) {
        console.error('Error creating channel:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



module.exports = router;
