export function str2bytes (str: string) {
    const  bytes = new Uint8Array(str.length);
    for (let i=0; i<str.length; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes;
}
