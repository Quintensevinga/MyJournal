const { Journal } = require('./model');

const createJournal = async(ctx) => {
  try {
    const { title, coverColor } = ctx.request.body;

    const journal = new Journal({
      title,
      coverColor
    })

    console.log(journal);
    await journal.save();

    ctx.status = 201;
    ctx.body = { message: 'Journal created' };
  } catch (error) {
    ctx.body = { error: 'Error while creating a journal' };
  }
};

const getAllJournals = async (ctx) => {
  try {
    const journals = await Journal.find();
    ctx.body = journals;
  } catch (error) {
    ctx.status = 500; 
    ctx.body = { error: 'Failed getting journals' };
  }
}


module.exports = { createJournal, getAllJournals };

