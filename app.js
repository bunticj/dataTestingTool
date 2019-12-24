const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();

const userRoutes = require('./api/routes/users');
const reqRoutes = require('./api/routes/requests');
const respRoutes = require('./api/routes/responses');
const axiosRoutes = require('./api/routes/axiosRequests'); 
const checkRespRoutes = require('./api/routes/checkResponses');
const tagLabelRoutes = require('./api/routes/tag-label');
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//middlewares
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors({
    origin: true
}));

app.use('/', userRoutes);
app.use('/requests', reqRoutes);
app.use('/responses',respRoutes);
app.use('/sendrequest',axiosRoutes);
app.use('/checkresponse',checkRespRoutes);
app.use('/',tagLabelRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    console.log(error);

    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;