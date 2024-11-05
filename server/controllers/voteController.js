const { Candidate } = require("../models");
const { User } = require("../models");

exports.getCandidates = async (req, res, next) => {
  try {
    let candidates = await Candidate.findAll();
    res.status(200).json({ candidates });
  } catch (error) {
    console.log(error, "<<<<error getCandidates");
    next(error);
  }
};

exports.patchVote = async (req, res, next) => {
  const { id } = req.params;
  const { CandidateId } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.CandidateId) {
      return res.status(400).json({ message: "User has already voted" });
    }

    const candidate = await Candidate.findByPk(CandidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    user.CandidateId = CandidateId;
    await user.save();

    await candidate.increment("totalVote");

    return res.status(200).json({
      message: "Vote successfully cast",
      user,
      candidate,
    });
  } catch (error) {
    console.log(error, "<<<<error patchVote");
    next(error);
  }
};
