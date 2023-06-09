const Sequelize = require('sequelize');
const db = require('../database.js');

/*
Sequelize model for the event table in the database.
*/




const Event = db.define('event', {
    idevent: {                                      //primary key, id of the event
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Name: { type: Sequelize.STRING, allowNull: false },    //name of the event
    iduser: { type: Sequelize.INTEGER, allowNull: false },  //foreign key, id of the user to whom the event belongs
    Weight: { type: Sequelize.INTEGER, allowNull: false },  //weight of the event
    Date: { type: Sequelize.DATE, allowNull: false },      //date of the event
    idcategory: { type: Sequelize.INTEGER, allowNull: false },  //foreign key, id of the category to which the event belongs
}, {
    timestamps: false
})


//sql hook triggered after the creation of an event , it updates the user's mood and makes sure it is in the range [-100,100]
Event.addHook('afterCreate', async (event, options) => {
    try {
      const user = await event.getUser();                 //get the user to whom the event belongs
      let newMood = user.dataValues.Mood + event.Weight;  //calculate the new mood

      if (newMood > 100) {                              //make sure the mood is in the range [-100,100]
        newMood = 100;
      } else if (newMood < -100) {
        newMood = -100;
      }

      await user.update({ Mood: newMood });

    } catch (error) {
      console.error('Failed to update user\'s mood:', error);
    }
  });


//sql hook triggered before the deletion of an event , it updates the user's mood and makes sure it is in the range [-100,100]
Event.addHook('beforeDestroy' , async (event, options) => {
  try {
    const user = await event.getUser();                 //get the user to whom the event belongs
      let newMood = user.dataValues.Mood- event.Weight; //calculate the new mood
      if (newMood > 100) {                            //make sure the mood is in the range [-100,100]
        newMood = 100;
      } else if (newMood < -100) {
        newMood = -100;
      }
      await user.update({ Mood: newMood });
  } catch (error) {
    console.error('Failed to update user\'s mood:', error);
  }
});


// function formatDate(date) {
//   var d = new Date(date),
//       month = '' + (d.getMonth() + 1),
//       day = '' + d.getDate(),
//       year = d.getFullYear();

//   if (month.length < 2) 
//       month = '0' + month;
//   if (day.length < 2) 
//       day = '0' + day;
//   console.log(+([year, month, day].join('')));
//   return +([year, month, day].join(''));
// }



module.exports = Event;