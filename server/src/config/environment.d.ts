export { }
declare global {
    namespace NodeJS {
        interface ProcessEnv {

            // General
            VERSION: String;
            PORT?: Number;
            SANDBOX: Boolean;

            // Security
            SEC_SALT: String;
            SEC_LOGIN_DURATION: String;

            // Firebase
            FIREBASE_BUCKET_NAME: String;
            FIREBASE_PROJECT_ID: String;

            // Database
            DB_NAME: String;
            DB_USER: String;
            DB_PASSWORD: String;
            DB_HOST: String;
            DB_PORT?: Number;
            DB_DRIVER: String;
            DB_TIMEZONE: String;
            DB_DROP_AND_CREAT_NEW: Boolean;
            DB_ALTER: Boolean;
            DB_LOGGING: Boolean;
        }
    }
}

