//1. Import Dependencies
    // mongoose, model
const mongoose = require('../utils/connections')
const Character = require('./character')
const db = mongoose.connection

//2. seed route
    //SEED
//     router.get('/seed', (req, res) => {
//         const startCrew = [
//             { name: "Monkey D Rufy", affiliation: "Straw Hat Pirates", rank: "Captain", devilFruit: true, reward: 3000000000, alive: true},
//             { name: "Roronoa Zoro", affiliation: "Straw Hat Pirates", rank: "Vice-Captain", devilFruit: false, reward: 1111000000, alive: true},
//             { name: "Nami", affiliation: "Straw Hat Pirates", rank: "Navigator", devilFruit: false, reward: 366000000, alive: true},
//             { name: "Usopp", affiliation: "Straw Hat Pirates", rank: "Sniper", devilFruit: false, reward: 500000000, alive: true},
//             { name: "Sanji", affiliation: "Straw Hat Pirates", rank: "Cook", devilFruit: false, reward: 1032000000, alive: true},
//             { name: "Chopper", affiliation: "Straw Hat Pirates", rank: "Doctor", devilFruit: true, reward: 1000, alive: true},
//             { name: "Nico Robin", affiliation: "Straw Hat Pirates", rank: "Scholar", devilFruit: true,  reward: 930000000, alive: true},
//             { name: "Franky", affiliation: "Straw Hat Pirates", rank: "Shipwright", devilFruit: false, reward: 394000000, alive: true},
//             { name: "Brook", affiliation: "Straw Hat Pirates", rank: "Musician", devilFruit: true, reward: 383000000, alive: false},
//         ]
//         Character.deleteMany({})
//         .then(() => {
//             Character.create(startCrew)
//                 .then(data => {
//                     res.json(data)
//                 })
//                 .catch(err => console.log('The following error occurred: \n', err))
//         })
// })

    //open db -> seed function -> close db

db.on('open', () =>{
    const startCrew = [
        { name: "Monkey D Rufy", affiliation: "Straw Hat Pirates", rank: "Captain", devilFruit: true, reward: 3000000000, alive: true},
        { name: "Roronoa Zoro", affiliation: "Straw Hat Pirates", rank: "Vice-Captain", devilFruit: false, reward: 1111000000, alive: true},
        { name: "Nami", affiliation: "Straw Hat Pirates", rank: "Navigator", devilFruit: false, reward: 366000000, alive: true},
        { name: "Usopp", affiliation: "Straw Hat Pirates", rank: "Sniper", devilFruit: false, reward: 500000000, alive: true},
        { name: "Sanji", affiliation: "Straw Hat Pirates", rank: "Cook", devilFruit: false, reward: 1032000000, alive: true},
        { name: "Chopper", affiliation: "Straw Hat Pirates", rank: "Doctor", devilFruit: true, reward: 1000, alive: true},
        { name: "Nico Robin", affiliation: "Straw Hat Pirates", rank: "Scholar", devilFruit: true,  reward: 930000000, alive: true},
        { name: "Franky", affiliation: "Straw Hat Pirates", rank: "Shipwright", devilFruit: false, reward: 394000000, alive: true},
        { name: "Brook", affiliation: "Straw Hat Pirates", rank: "Musician", devilFruit: true, reward: 383000000, alive: false},
    ]
    Character.deleteMany({owner: null})
    .then(() => {
        Character.create(startCrew)
            .then(data => {
                console.log("Created characters: \n", data)
                db.close()
            })
            .catch(err => {
                console.log(err)
                db.close()
            })
    })
    .catch(err=>{
        console.log(err)
        db.close()
    })
})

