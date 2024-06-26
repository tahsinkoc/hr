import mongoose from 'mongoose';

const ConfirmSchema = new mongoose.Schema({
    companyName: String,
    status: Boolean,
    companyUserId: String,
    phone: String,
    mail: String,
    taxId: String
});

const Confirmation = mongoose.model('CompanyConfirmation', ConfirmSchema);

export default Confirmation;