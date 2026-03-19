import mongoose from 'mongoose';
async function run() {
  await mongoose.connect('mongodb://127.0.0.1:27017/faang-prep');
  const Theory = mongoose.model('TheoryQuestion', new mongoose.Schema({ topic: String, difficulty: String, question: String }, { collection: 'theory_questions'}));
  const topics = await Theory.aggregate([{ $group: { _id: { topic: '$topic' }, count: { $sum: 1 } } }]);
  console.log(JSON.stringify(topics, null, 2));
  mongoose.connection.close();
}
run().catch(console.error);
