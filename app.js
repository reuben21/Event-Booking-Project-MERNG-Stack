const express = require('express');
const bodyParser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');
const app = express();
const mongoose = require('mongoose');

const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index')
app.use(bodyParser.json());


app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphQLSchema,
        rootValue: graphQLResolvers,
        graphiql: true
    })
);

// mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongodb-syifj.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, { useNewUrlParser: true , useUnifiedTopology: true })
//     .then(()=>{
//         app.listen(4000);
//     }).catch(err=>{
//         console.log(err)});
mongoose.connect(`mongodb://localhost:27017/${process.env.MONGO_DB}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(4000);
    }).catch(
    err => {
        console.log(err);
    });
