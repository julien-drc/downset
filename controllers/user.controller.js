const UserModel = require('../models/user.model')
const ObjectID = require('mongoose').Types.ObjectId

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select('-password')
  res.status(200).json(users)
}

module.exports.userInfo = (req, res) => {
  if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknow : ' + req.params.id)

  UserModel.findById(req.params.id, (err, docs) => {
    if(!err) res.send(docs)
    else console.log('id unknow');
  }).select('-password')
}


module.exports.updateUser =  (req, res) => {
  if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknow : ' + req.params.id)

  try {
     UserModel.findOneAndUpdate(
      {_id: req.params.id},
      {
        $set: {
          bio: req.body.bio
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true},
      (err, docs) => {
        if(!err) return res.send(docs)
        if(err) return res.status(501).send({ message: err})
      }
    )
  } catch (err) {
    return res.status(502).send({ message: err})
  }
}

module.exports.deleteUser = (req, res) => {
  if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknow : ' + req.params.id)

  try {
    UserModel.remove({ _id: req.params.id}).exec()
    res.status(200).json({ message: "Successfully deleted."})
  } catch (err) {
    return res.status(502).send({ message: err})
  }
}
