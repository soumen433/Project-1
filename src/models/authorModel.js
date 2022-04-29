
const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema( {
           
           fname: 
                 {type: String, 
                   required: true,
                   trim: true,
                   minlength: 3,
                   maxlength:20},

           lname: {type: String, 
                  required: true ,
                   trim: true,
                  minlength:3,
                  maxlength: 20}, 

           title: {
               type: String,
               enum: ["Mr", "Mrs", "Miss"] ,
               required: true,
               },
           
           email: {type:String,
                   unique: true,
                   required: true,
                  //match: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
                

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



