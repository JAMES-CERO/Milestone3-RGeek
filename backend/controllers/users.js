import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const getuserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((friendId) => User.findById(friendId))
        )

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, picturePath, occupation, location }) => {
                return { _id, firstName, lastName, picturePath, occupation, location };
            }
        );
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

};

export const addOrRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((existingFriendId) => existingFriendId !== friendId);
            friend.friends = friend.friends.filter((existingFriendId) => existingFriendId !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const updatedUser = await User.findById(id);

        const updatedFriends = await Promise.all(
            updatedUser.friends.map((updatedFriendId) => User.findById(updatedFriendId))
        );

         const formattedFriends = updatedFriends.map(
            ({ _id, firstName, lastName, picturePath, occupation, location }) => {
                return { _id, firstName, lastName, picturePath, occupation, location };
            }
        );

        res.status(200).json(formattedFriends);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};