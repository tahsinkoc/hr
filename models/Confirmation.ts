import mongoose from 'mongoose';

const ConfirmSchema = new mongoose.Schema({
    companyName: String,
    status: Boolean,
    companyUserId: String,
    phone: String,
    mail: String,
    taxId: String
});

const Confirmation = mongoose.models.companyconfirmation || mongoose.model('companyconfirmation', ConfirmSchema);

export default Confirmation;