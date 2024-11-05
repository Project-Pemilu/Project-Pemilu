const { Candidate } = require("../models");
const { User } = require("../models");

exports.getCandidates = async (req, res, next) => {
  try {
    let candidates = await Candidate.findAll();
    res.status(200).json(candidates);
  } catch (error) {
    console.log(error, "<<<<error getCandidates");
    next(error);
  }
};

exports.patchVote = async (req, res, next) => {
  const { id } = req.params;
  const { CandidateId } = req.body
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw ({name: "NotFound", message: "User Not Found"});
    }

    if (user.CandidateId) {
        throw ({name: "BadRequest", message: "User Already Vote"});
    }


    user.CandidateId = CandidateId;
    await user.save();


    return res.status(200).json({
      message: "Vote successfully cast",
    });
  } catch (error) {
    console.log(error, "<<<<error patchVote");
    next(error);
  }
};
