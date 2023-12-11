import AdminModel, { AdminAttribute } from '../database/models/admins.model';
import bcrypt from 'bcrypt';
import config from '../config/global.config';

let entries: AdminAttribute[];

async function hashPassword() {
    return await bcrypt.hash(String(config.security.adminPassword), Number(config.security.hashRounds))
}

hashPassword().then(hash => {
    const password = hash.toString()
    entries = [
        {
            email: config.security.adminEmail,
            password: password,
            fname: "Super",
            lname: "Admin",
            type: "SUPERADMIN"
        },
        {
            email: "admin1@test.com",
            password: password,
            fname: "St",
            lname: "Admin",
            type: "ADMIN"
        },
        {
            email: "admin2@test.com",
            password: password,
            fname: "Nd",
            lname: "Admin",
            type: "ADMIN"
        }
    ];
})

export const initAdminSeed = () => AdminModel.bulkCreate(entries);
