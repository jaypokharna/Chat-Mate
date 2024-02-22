import User from "../models/user.model.js";
import Conversation from "../models/converstation.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // Find conversations where the logged-in user is a participant
        const conversations = await Conversation.find({ participants: loggedInUserId });

        // Extract participant IDs from all conversations
        const participantIds = conversations.reduce((ids, conv) => {
            return ids.concat(conv.participants);
        }, []);

        // Remove duplicates and the logged-in user ID
        const uniqueParticipantIds = [...new Set(participantIds.filter(id => id !== loggedInUserId))];

        // Find users based on the participant IDs

        const filteredUsers = await User.find({ _id: { $in: uniqueParticipantIds,$ne : loggedInUserId } }).select('-password');

        return res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in user controller - ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
