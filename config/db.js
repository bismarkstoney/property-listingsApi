const mongoose = require('mongoose');
const DB = process.env.LOCAL_DATABASE;

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(DB, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useFindAndModify: false,

			useUnifiedTopology: true,
		});
		console.log(`The is running on ${conn.connection.host}`);
	} catch (error) {
		console.log(error);
	}
};
module.exports = connectDB;
