import dotenv from "dotenv";
dotenv.config();

console.log(process.env.PORT);

const config: any = {
  version: process.env.VERSION,
  port: process.env.PORT || 8080,
  sandbox: process.env.SANDBOX || false,
  security: {
    superadminusername:process.env.SUPER_ADMIN_USERNAME,
    superadminpassword:process.env.SUPER_ADMIN_PASSWORD,
    salt: process.env.SEC_SALT,
    loginDuration: process.env.SEC_LOGIN_DURATION,
  },
  firebase: {
    bucketName: process.env.FIREBASE_BUCKET_NAME,
    projectId: process.env.FIREBASE_PROJECT_ID,
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
