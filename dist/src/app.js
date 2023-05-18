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
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const guests_service_1 = require("./services/guests.service");
const auth_service_1 = require("./services/auth.service");
const auth_middleware_1 = require("./middleware/auth.middleware");
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post('/login', auth_service_1.login);
app.post('/signup', auth_service_1.signUp);
app.get('/guest', auth_middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const guests = yield (0, guests_service_1.getGuests)();
    res.send(guests);
}));
app.post('/guest', auth_middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, guests_service_1.addGuests)(req.body);
    res.send(result);
}));
app.put('/guest', auth_middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const guest = req.body;
    const result = yield (0, guests_service_1.updateGuest)(guest);
    res.send(result);
}));
app.delete('/guest', auth_middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.body;
    const result = yield (0, guests_service_1.deleteGuest)(ids);
    res.send(result);
}));
app.put('/invite', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, status } = req.body;
    const result = yield (0, guests_service_1.confirmInvite)(id, status);
    res.send(result);
}));
app.post('/invite', auth_middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body;
    const result = yield (0, guests_service_1.sendEmails)(ids);
    res.send(result);
}));
app.post('/OneGuest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const guest = yield (0, guests_service_1.getOneGuest)(req.body.id);
    res.send(guest);
}));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Express is listening at http://localhost:${port}`);
}));
//# sourceMappingURL=app.js.map