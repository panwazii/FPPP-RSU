import admin from "firebase-admin";
import config from "../config/global.config";

export const Admin = admin.initializeApp({
    credential: admin.credential.cert(config.googleapi),
    storageBucket: "rsu-cs-hub.appspot.com",
});