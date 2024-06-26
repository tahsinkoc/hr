import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URL || 'mongodb://localhost:27017/hr';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

declare global {
    var mongoose: {
        conn: any;
        promise: any;
    };
}

export { }


let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts: any = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
