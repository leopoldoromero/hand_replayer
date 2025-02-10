import LZString from "lz-string";

export class LocalStorageRepository {
    saveHandHistory = (data: unknown, key: string, compress: boolean) => {
        const jsonString = JSON.stringify(data);
        const dataToStore = compress ? LZString.compressToBase64(jsonString) : jsonString;
        localStorage.setItem(key, dataToStore);
    };
    loadHandHistory = (key: string, isCompress: boolean) => {
        const data = localStorage.getItem(key);
        if (!data) return null;
      
        const jsonString = isCompress ? LZString.decompressFromBase64(data) : data;
        return JSON.parse(jsonString);
    };
}
