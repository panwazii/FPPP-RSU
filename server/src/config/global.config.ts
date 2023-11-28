import dotenv from "dotenv";
dotenv.config();

const config: any = {
  version: process.env.VERSION,
  port: process.env.PORT || 8080,
  sandbox: process.env.SANDBOX || false,
  cors: { origin: process.env.CORS_ORIGIN },
  security: {
    superadminemail: process.env.SUPER_ADMIN_EMAIL,
    superadminpassword: process.env.SUPER_ADMIN_PASSWORD,
    salt: process.env.SEC_SALT,
    loginDuration: process.env.SEC_LOGIN_DURATION,
  },
  firebase: {
    bucketName: process.env.FIREBASE_BUCKET_NAME,
    projectId: process.env.FIREBASE_PROJECT_ID,
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  },
  googleapi: {
    type: process.env.GOOGLEAPI_TYPE,
    project_id: process.env.GOOGLEAPI_PROJECT_ID,
    private_key_id: process.env.GOOGLEAPI_KEY_ID,
    private_key: (process.env.GOOGLEAPI_KEY)?.replace(/\\n/gm, "\n"),
    client_email: process.env.GOOGLEAPI_CLIENT_EMAIL,
    client_id: process.env.GOOGLEAPI_CLIENT_ID,
    auth_uri: process.env.GOOGLEAPI_AUTH_URI,
    token_uri: process.env.GOOGLEAPI_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLEAPI_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.GOOGLEAPI_CLIENT_X509_CERT_URL,
    universe_domain: process.env.GOOGLEAPI_UNIVERSE_DOMAIN,
  },
  database: {
    dbname: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    driver: process.env.DB_DRIVER,
    sequelizeOptions: {
      timezone: process.env.DB_TIMEZONE || '+07:00',
    },
    // สร้าง database ใหม่ ถ้ามี table อยู่แล้วจะทำการ drop **อย่าลืม backup
    dropAndCreateNew: process.env.DB_DROP_AND_CREAT_NEW || false,
    // ใส่ข้อมูลเริ่มต้นใน database จะทำงานก็ต่อเมื่อ dropAndCreateNew=true เท่านั้น
    insertInitData: process.env.DB_INIT_DATA || true,
    // จะทำงานก็ต่อเมื่อ dropAndCreateNew=false เท่านั้น
    syncOption: {
      // ถ้า alter=true จะทำการ alter table
      alter: process.env.DB_ALTER || false,
    },
    logging: process.env.DB_LOGGING || true,
  },
};
export default config;
