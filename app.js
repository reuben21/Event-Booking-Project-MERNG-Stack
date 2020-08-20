const express = require('express');
const bodyParser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');
const app = express();
const {buildSchema} = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Event = require('./models/event')
const User = require('./models/user')
app.use(bodyParser.json());

const events = [];

app.use(
    '/graphql',
    graphqlHTTP({
        schema: buildSchema(`
        type Event {
          _id: ID!
          title: String!
          description: String!
          price: Float!
          date: String!
        }
        type User {
          _id: ID!
          email: String!
          password: String
        }
        input EventInput {
          title: String!
          description: String!
          price: Float!
          date: String!
        }
        input UserInput {
          email: String!
          password: String!
        }
        type RootQuery {
            events: [Event!]!
        }
        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
        rootValue: {
            events: () => {
                return Event.find()
                    .then(events => {
                        return events.map(event => {
                            return {...event._doc, _id: event.id};
                        });//it has some meta data so we use the map operator
                    })
                    .catch(
                        err => {
                            throw err;
                        })

            },
            createEvent: args => {
              const event = new Event({
                    title: args.eventInput.title,
                    description: args.eventInput.description,
                    price: +args.eventInput.price,
                    date: new Date(args.eventInput.date),
                    creator:'5f3ebea7cfd9ad38d8d21e3c'
                })
                let createdEvent;
                return event
                    .save()
                    .then(result => {
                        createdEvent = { ...result._doc, _id: result._doc._id.toString() };
                         return User.findById('5f3ebea7cfd9ad38d8d21e3c')
                    })
                    .then(
                        user =>{
                            if (!user){
                                throw new Error("User Not Found.")
                            }
                            user.createdEvents.push(event);
                            return user.save()
                        }
                    )
                    .then(
                        result=>{
                            return createdEvent
                }

                    )
                    .catch(err => {
                        console.log(err);
                        throw err;
                    });
            },
            createUser:args=>{
                return User.findOne({
                    email:args.userInput.email
                }).then(user =>{
                    if (user){
                        throw new Error("User Exists Already.")
                    }
                    return bcrypt
                        .hash(args.userInput.password,12)
                })
                      .then(hashedPassword =>{
                        const user = new User({
                            email:args.userInput.email,
                            password:hashedPassword
                        });
                        return user.save();
                    })
                   .then(result =>{
                       return {...result._doc,password:null, _id: result.id}
                   })
                    .catch(
                        err=>{
                            throw err;
                        });

            }
        },
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
        app.listen(4002);
    }).catch(
    err => {
        console.log(err);
    });
