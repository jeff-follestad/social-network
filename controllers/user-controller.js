const { User, Thought, Reaction } = require('../models');

const userController = {
  //get all users
  getAllUsers(req, res) {
    User.find({})
      .select('=_v')
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  },
  //get user by ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate([
        { path: 'thoughts', select: "-__v" },
        { path: 'friends', select: "-__v" }
      ])
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //create User
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },
     //add friend
     addFriend({ params }, res) {
      User.findOneAndUpdate(
          {_id: params.userId},
          { $push: { friends: params.friendId } },
          { new: true, runValidators: true}
      )
      .then(dbUserData => {
          if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this ID!' });
              return;
          }
          res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },


  //update user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  //delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        //remove user from friends array
        User.updateMany(
          { _id: { $in: dbUserData.friends } },
          { $pull: { friends: params.id } }
        )
          .then(() => {
            //remove comments from user
            Thought.deleteMany({ username: dbUserData.username })
              .then(() => {
                res.json({ message: "Successfully deleted user" });
              })
              .catch(err => res.status(400).json(err));
          })
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(400).json(err));
  },




