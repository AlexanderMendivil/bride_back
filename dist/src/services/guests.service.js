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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmails = exports.confirmInvite = exports.deleteGuest = exports.updateGuest = exports.addGuests = exports.getOneGuest = exports.getGuests = void 0;
const connection_1 = require("../../DBConnection/connection");
const nodemailer_1 = __importDefault(require("nodemailer"));
const getGuests = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const connect = yield ((_a = (0, connection_1.connection)()) === null || _a === void 0 ? void 0 : _a.connect());
    const collection = connect === null || connect === void 0 ? void 0 : connect.db('Bride').collection('guests');
    const guests = yield (collection === null || collection === void 0 ? void 0 : collection.find({}).toArray());
    connect === null || connect === void 0 ? void 0 : connect.close();
    return guests;
});
exports.getGuests = getGuests;
const getOneGuest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const connect = yield ((_b = (0, connection_1.connection)()) === null || _b === void 0 ? void 0 : _b.connect());
    const collection = connect === null || connect === void 0 ? void 0 : connect.db('Bride').collection('guests');
    const guest = yield (collection === null || collection === void 0 ? void 0 : collection.findOne({ id }));
    connect === null || connect === void 0 ? void 0 : connect.close();
    return guest;
});
exports.getOneGuest = getOneGuest;
const addGuests = (guest) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const connect = yield ((_c = (0, connection_1.connection)()) === null || _c === void 0 ? void 0 : _c.connect());
    const collection = connect === null || connect === void 0 ? void 0 : connect.db('Bride').collection('guests');
    const insertedGuest = yield (collection === null || collection === void 0 ? void 0 : collection.insertOne(guest));
    connect === null || connect === void 0 ? void 0 : connect.close();
    return insertedGuest;
});
exports.addGuests = addGuests;
const updateGuest = (guest) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const connect = yield ((_d = (0, connection_1.connection)()) === null || _d === void 0 ? void 0 : _d.connect());
    const collection = connect === null || connect === void 0 ? void 0 : connect.db('Bride').collection('guests');
    const update = { $set: guest };
    const updatedGuest = yield (collection === null || collection === void 0 ? void 0 : collection.updateOne({ id: guest.id }, update));
    connect === null || connect === void 0 ? void 0 : connect.close();
    return updatedGuest;
});
exports.updateGuest = updateGuest;
const deleteGuest = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const connect = yield ((_e = (0, connection_1.connection)()) === null || _e === void 0 ? void 0 : _e.connect());
    const collection = connect === null || connect === void 0 ? void 0 : connect.db('Bride').collection('guests');
    const insertedGuest = yield (collection === null || collection === void 0 ? void 0 : collection.deleteMany({ id: { $in: ids } }));
    connect === null || connect === void 0 ? void 0 : connect.close();
    return insertedGuest;
});
exports.deleteGuest = deleteGuest;
const confirmInvite = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const connect = yield ((_f = (0, connection_1.connection)()) === null || _f === void 0 ? void 0 : _f.connect());
    const collection = connect === null || connect === void 0 ? void 0 : connect.db('Bride').collection('guests');
    const guest = yield (collection === null || collection === void 0 ? void 0 : collection.findOne({ id: id }));
    if (guest) {
        const update = { $set: Object.assign(Object.assign({}, guest), { status }) };
        const updatedGuest = yield (collection === null || collection === void 0 ? void 0 : collection.updateOne({ id: guest.id }, update));
        connect === null || connect === void 0 ? void 0 : connect.close();
        return updatedGuest;
    }
});
exports.confirmInvite = confirmInvite;
const sendEmails = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const connect = yield ((_g = (0, connection_1.connection)()) === null || _g === void 0 ? void 0 : _g.connect());
    const collection = connect === null || connect === void 0 ? void 0 : connect.db('Bride').collection('guests');
    var transporter = nodemailer_1.default.createTransport({
        service: `${process.env.EMAIL_SERVICE}`,
        auth: {
            user: `${process.env.EMAIL_INVITE}`,
            pass: `${process.env.EMAIL_PASSWORD}`
        }
    });
    const guests = yield (collection === null || collection === void 0 ? void 0 : collection.find({ id: { $in: ids } }).toArray());
    if (guests) {
        for (let guest of guests) {
            let mailOptions = {
                from: `${process.env.EMAIL_INVITE}`,
                to: `${guest.email}`,
                subject: 'Has recibido una invitación para la boda de Andrea y José Inés!',
                text: `Hola! el motivo de este correo es la invitación a la boda, en el siguiente link podras ver la invitación: ${process.env.PROD_LINK}/slideshow/${guest.id} no olvides  confirmar tu assitencia al final :)`
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    }
    connect === null || connect === void 0 ? void 0 : connect.close();
});
exports.sendEmails = sendEmails;
//# sourceMappingURL=guests.service.js.map