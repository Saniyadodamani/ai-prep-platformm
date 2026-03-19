import mongoose from 'mongoose';
async function run() {
  await mongoose.connect('mongodb://localhost:27017/faang-prep');
  const Dsa = mongoose.model('DsaQuestion', new mongoose.Schema({ company: String, difficulty: String, title: String }, { collection: 'dsa_questions'}));
  const Theory = mongoose.model('TheoryQuestion', new mongoose.Schema({ topic: String, difficulty: String, question: String }, { collection: 'theory_questions'}));
  const SystemDesign = mongoose.model('SystemDesignQuestion', new mongoose.Schema({ difficulty: String, title: String }, { collection: 'systemdesign_questions'}));
  console.log('DSA Total:', await Dsa.countDocuments());
  console.log('Theory Total:', await Theory.countDocuments());
  console.log('System Design Total:', await SystemDesign.countDocuments());
  
  const theoryTopics = await Theory.aggregate([{ $group: { _id: { topic: '$topic' }, count: { $sum: 1 } } }]);
  console.log('Theory Distribution:', theoryTopics);
  
  const dsaTags = await Dsa.aggregate([{ $group: { _id: { company: '$company' }, count: { $sum: 1 } } }]);
  console.log('DSA Distribution:', dsaTags);
  mongoose.connection.close();
}
run().catch(console.error);
