import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    number: String,
    mail: String,
    name: String,
    surname: String,
    role: String,
    adress: String,
    companyName: String,
    field: String,
    taskId: String,
    status: Boolean
})

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
