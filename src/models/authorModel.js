
const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema( {
           
           fname: {type: String, 
                   required: true},

           lname: {type: String, 
                  required: true }, 

           title: {
               type: String,
               enum: ["Mr", "Mrs", "Miss"] ,
               required: true,
               },
           
           email: {type:String,
                   unique: true,
                   required: true,
                   validate: {
                        validator: function(v) {
                          return /^\w+@[a-zA-Z_]+?\.com$/.test(v);
                        },
                        message: data => `${data.value} is not a valid email!`
                      }},

           password: {type: String,
                     required: true},

},

      { timestamps: true });
                                      
       module.exports = mongoose.model('Author', authorSchema)



