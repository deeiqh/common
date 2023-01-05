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
const mongodb_1 = require("mongodb");
const uri = "mongodb://localhost:27017/";
const client = new mongodb_1.MongoClient(uri);
const migrateDocuments = (collection) => __awaiter(void 0, void 0, void 0, function* () {
    yield collection.updateMany({
        _id: {
            $exists: false,
        },
    }, {
        $set: {
            _id: new mongodb_1.ObjectId(),
            name: "Lista",
            emoji: ":p",
            weight: new mongodb_1.Long("0"),
        },
    });
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const db = client.db("migrationdb");
            const users = db.collection("users");
            migrateDocuments(users);
        }
        catch (error) {
            console.log(error);
        }
    });
}
run();
//# sourceMappingURL=main.js.map