var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	email: String,
	name: String,
	password: String,
	address:String,
	hobbies:String,
	photograph: String

},
{
	timestamps: true,
	versionKey: false,
	toObject: {
		transform: function (doc, ret, options) {
			// ret.id = ret._id;
			// delete ret._id;
			delete ret.__v;
			delete ret.__v;
			return ret;
		}
	}
}),
User = mongoose.model('UserDate', userSchema);

module.exports = User;