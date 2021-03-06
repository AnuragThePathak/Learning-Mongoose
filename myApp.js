var mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).catch((err) => { return console.error(err) })

const { Schema } = mongoose

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model("Person", personSchema)

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Anurag", age: 21,
    favoriteFoods: ["Chicken", "Egg"]
  })

  person.save((err, data) => {
    if (err) return console.error(err)
    done(null, data)
  })
}

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err)

    done(null, data)
  })
}

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err)

    done(null, data)
  })
}

const findOneByFood = (food, done) => {
  Person.findOne({ food: food }, (err, data) => {
    if (err) return console.error(err)

    done(null, data)
  })
}

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err)
    done(null, data)
  })
}

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger"

  Person.findById(personId, (err, person) => {
    if (err) return console.error(err)

    person.favoriteFoods.push(foodToAdd)

    person.save((err, updatedPerson) => {
      if (err) return console.error(err)

      done(null, updatedPerson)
    })
  })
}

const findAndUpdate = (personName, done) => {
  const ageToSet = 20

  Person.findOneAndUpdate({ name: personName }, { $set: { age: ageToSet } },
    { new: true },
    (err, data) => {
      if (err) return console.error(err)

      done(null, data)
    })
}

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.error(err)

    done(null, data)
  })
}

const removeManyPeople = (done) => {
  const nameToRemove = "Mary"

  Person.deleteMany(({ name: nameToRemove }, (err, data) => {
    if (err) return console.error(err)

    done(null, data)
  }))
}

const queryChain = (done) => {
  const foodToSearch = "burrito"

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: "asc" })
    .limit(2)
    .select("-age")
    .exec((err, data) => done(err, data))
}

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person
exports.createAndSavePerson = createAndSavePerson
exports.findPeopleByName = findPeopleByName
exports.findOneByFood = findOneByFood
exports.findPersonById = findPersonById
exports.findEditThenSave = findEditThenSave
exports.findAndUpdate = findAndUpdate
exports.createManyPeople = createManyPeople
exports.removeById = removeById
exports.removeManyPeople = removeManyPeople
exports.queryChain = queryChain
