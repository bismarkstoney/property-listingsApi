const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error');
const listingRouter = require('./routers/listing');
const reviewRouter = require('./routers/review');

//load env vairables
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/db');
const app = express();
connectDB();
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());

//mout
app.use('/api/v1/listings', listingRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use(errorHandler);
app.listen(PORT, () => {
	console.log(`The server is running on ${PORT}`);
});
