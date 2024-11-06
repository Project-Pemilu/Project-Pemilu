const { Candidate } = require('../models');
const { User } = require('../models');

exports.getCandidates = async (req, res, next) => {
  try {
    let candidates = await Candidate.findAll({
      order: [['id', 'ASC']],
    });
    res.status(200).json(candidates);
  } catch (error) {
    console.log(error, '<<<<error getCandidates');
    next(error);
  }
};

exports.patchVote = async (req, res, next) => {
  const { id } = req.params;
  const { CandidateId } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw { name: 'NotFound', message: 'User not Found' };
    }

    if (user.CandidateId) {
      throw { name: 'BadRequest', message: 'User has Already Voted' };
    }

    const candidate = await Candidate.findByPk(CandidateId);
    if (!candidate) {
      throw { name: 'NotFound', message: 'Candidate Not Found' };
    }

    user.CandidateId = CandidateId;
    await user.save();

    await candidate.increment('totalVote');

    return res.status(200).json({
      message: 'Vote successfully cast',
    });
  } catch (error) {
    console.log(error, '<<<<error patchVote');
    next(error);
  }
};
