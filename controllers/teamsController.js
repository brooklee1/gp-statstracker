const db = require("../models");

// Defining methods for the booksController
module.exports = {
  // findAll: function(req, res) {
  //   db.Team
  //     .find(req.query)
  //     .sort({ date: -1 })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // findAllPop: function(req, res) {
  //   db.Team
  //     .find(req.query)
  //     .populate('Player')
  //     .populate('TeamGameStats')
  //     .sort({ date: -1 })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // findAllPopPlayer: function(req, res) {
  //   db.Team
  //     .find(req.query)
  //     .populate('Player')
  //     .sort({ date: -1 })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // findAllPopTeamStats: function(req, res) {
  //   db.Team
  //     .find(req.query)
  //     .populate('TeamGameStats')
  //     .sort({ date: -1 })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  findByUser: function(req, res) {
    db.User
      .findOne(req.params.id, 'team')
      .populate("teams")
      .then( dbModel => {
          res.status(200).json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Team
      .findById(req.params.id)
      .then(dbModel => {
        res.status(200).json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  findByIdPop: function(req, res) {
    db.Team
      .findById(req.params.id)
      .populate('Team')
      .populate('Player')
      .then(dbModel => {
        res.status(200).json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  findByIdPopPlayer: function(req, res) {
    db.Team
      .findById(req.params.id)
      .populate('Player')
      .then(dbModel => {
        res.status(200).json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  findByIdPopTeamStats: function(req, res) {
    db.Team
      .findById(req.params.id)
      .populate('Team')
      .then(dbModel => {
         res.status(200).json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Team
      .create(req.body)
      .then( (result) => {

          res.status(200).json(result);

          // db.School.findOneAndUpdate(
          //   { "_id": req.body._id }, { $push: { "team": result.id }}
          // );

          db.User.findOneAndUpdate(
            { "_id": req.body._id }, { $push: { "team": result.id }}
          );

        })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Team
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => {
        res.status(200).json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Team
      .findById({ _id: req.params.id })
      .then(dbModel => {
          dbModel.remove()
      })
      .then(dbModel => res.status(200).json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

// const userRights = (Team, user) => {
//   if (!Team.user.equal(user._id)) {
//     return false;
//   }
//   return true;
// };