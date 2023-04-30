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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const guests_service_1 = require("./services/guests.service");
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/guest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const guests = yield (0, guests_service_1.getGuests)();
    res.send(guests);
}));
app.post('/guest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, guests_service_1.addGuests)(req.body);
    res.send(result);
}));
app.put('/guest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, guest } = req.body;
    const result = yield (0, guests_service_1.updateGuest)(email, guest);
    res.send(result);
}));
app.delete('/guest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const result = yield (0, guests_service_1.deleteGuest)(email);
    res.send(result);
}));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    return console.log(`Express is listening at http://localhost:${port}`);
}));
//# sourceMappingURL=app.js.map