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
exports.deleteGuest = exports.updateGuest = exports.addGuests = exports.getGuests = void 0;
const connection_1 = require("../../DBConnection/connection");
const getGuests = () => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield (0, connection_1.connection)();
    return yield (collection === null || collection === void 0 ? void 0 : collection.find({}).toArray());
});
exports.getGuests = getGuests;
const addGuests = (guest) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield (0, connection_1.connection)();
    const insertedGuest = yield (collection === null || collection === void 0 ? void 0 : collection.insertOne(guest));
    return insertedGuest;
});
exports.addGuests = addGuests;
const updateGuest = (email, guest) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield (0, connection_1.connection)();
    const update = { $set: guest };
    const updatedGuest = yield (collection === null || collection === void 0 ? void 0 : collection.updateOne({ email: email }, update));
    return updatedGuest;
});
exports.updateGuest = updateGuest;
const deleteGuest = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield (0, connection_1.connection)();
    const insertedGuest = yield (collection === null || collection === void 0 ? void 0 : collection.deleteOne({ email: email }));
    return insertedGuest;
});
exports.deleteGuest = deleteGuest;
//# sourceMappingURL=guests.service.js.map