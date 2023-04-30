"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mongodb_1 = require("mongodb");
const connection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uri = "mongodb+srv://alexander:S8Wfvi38b7fZY2K@bride.8v2q0kp.mongodb.net/?retryWrites=true&w=majority";
        const client = new mongodb_1.MongoClient(uri, {
            serverApi: {
                version: mongodb_1.ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        yield client.connect();
        const collection = client.db("Bride").collection('guests');
        return collection;
    }
    catch (e) {
        console.log(e);
    }
});
exports.connection = connection;
//# sourceMappingURL=connection.js.map