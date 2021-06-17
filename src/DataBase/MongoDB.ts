import mongoose from "mongoose";
import { BillSchema } from '../../src/Models/BillSchema';

export class MongoDBD {
    
    constructor() {}
    
    mongoDBURL: string = "mongodb://localhost:27017/provider_database";
    mongoDBConnection: mongoose.Connection | undefined;
    billSchema: mongoose.Schema | undefined;
    [key: string]: any;

    mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true,
        retryWrites: false,
        autoIndex: false,
    }

    setupDb() {
        mongoose.connect(this.mongoDBURL, this.mongooseOptions, () => {
            console.log("MongoDB Connected")
        });
        this.mongoDBConnection = mongoose.connection;
        this.mongoDBConnection.on("error", console.error.bind(console, "MongoDB Connection error"));
        this.billSchema = new mongoose.Schema({
            billedOn: { type: String, required: true },
            amount: { type: Number, required: true }
        });
    }

    createDB(provider: string) {
        const str = provider;
        this[str] = mongoose.model(provider, this.billSchema);
    }

    addToBD(provider: string) {
        const str = provider;
        this[str] = "Value";
    }



}
