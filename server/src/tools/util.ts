import { Admin } from '../service/firebase';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const bucket = Admin.storage().bucket()

export function numberOrDefault(x: any, val: any) {
    try {
        if (x === null) {
            return val
        }

        const y = Number(x)
        if (!Number.isNaN(y)) {
            return Number(y)
        } else {
            return val
        }
    }
    catch (error) { console.log(error); }
}

export function uploadSinglePicture(fileorinalname: any, mimetype: any, buffer: any) {
    return new Promise((resolve, reject) => {
        try {
            const parser = path.parse(fileorinalname);
            const file_ext = parser.ext.toLowerCase();
            const folder = "picture";
            const fileName = `${folder}/${uuidv4()}${file_ext}`;

            if (file_ext === '.jpg' || file_ext === '.jpeg' || file_ext === '.png' || file_ext === '.webp') {
                const fileUpload = bucket.file(fileName)
                console.log('this filename:', fileName);
                const blobStream = fileUpload.createWriteStream({
                    metadata: {
                        contentType: mimetype,
                    },
                });
                blobStream.on("error", (e: any) => {
                    reject(e);
                });

                blobStream.on("finish", async () => {
                    console.log("success");
                    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${encodeURI(fileName)}`;
                    fileUpload.makePublic().then(() => {
                        resolve(publicUrl);
                    }).catch((e: any) => {
                        reject(e);
                    })
                });

                blobStream.end(buffer);

            } else { reject(Error); }
        } catch (error) { reject(error); }
    })

}

export function uploadSinglePictureV2(fileorinalname: any, mimetype: any, buffer: any) {
    return new Promise((resolve, reject) => {
        try {
            const parser = path.parse(fileorinalname);
            const file_ext = parser.ext.toLowerCase();
            const folder = "picture";
            const fileName = `${folder}/${uuidv4()}${file_ext}`;

            if (file_ext === '.jpg' || file_ext === '.jpeg' || file_ext === '.png' || file_ext === '.webp') {
                const fileUpload = bucket.file(fileName)
                console.log('this filename:', fileName);
                const blobStream = fileUpload.createWriteStream({
                    metadata: {
                        contentType: mimetype,
                    },
                });
                blobStream.on("error", (e: any) => {
                    reject(e);
                });

                blobStream.on("finish", async () => {
                    console.log("success");
                    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${encodeURI(fileName)}`;
                    fileUpload.makePublic().then(() => {
                        resolve({ url: publicUrl, name: fileName });
                    }).catch((e: any) => {
                        reject({ e, url: null, name: null });
                    })
                });

                blobStream.end(buffer);

            } else { reject(Error); }
        } catch (error) { reject(error); }
    })

}

export function idGenerate(x: any, val: any) {
    try {
        if (x === null) {
            return val
        }

        const y = Number(x)
        if (!Number.isNaN(y)) {
            return Number(y)
        } else {
            return val
        }
    }
    catch (error) { console.log(error); }
}

export function getMonthRange(inputDate?: Date): { startOfMonth: Date, startOfNextMonth: Date } {
    const currentDate = inputDate ? new Date(inputDate) : new Date();
    currentDate.setDate(1);
    const startOfMonth = new Date(currentDate);
    currentDate.setMonth(currentDate.getMonth() + 1);
    const startOfNextMonth = new Date(currentDate);
    return {
        startOfMonth,
        startOfNextMonth,
    };
}