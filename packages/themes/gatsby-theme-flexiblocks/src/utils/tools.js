import { decode } from 'js-base64';
import { format } from 'date-fns'


export function decodeId(id) {
    const decoded = decode(id);
    const numb = parseInt(decoded.split(":")[1], 10);
    return numb
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy");
};