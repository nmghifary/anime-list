import { formatDistanceToNow } from "date-fns";

export const timeAgo = (time: Date) => {
    const relativeTime: string = formatDistanceToNow(time, { addSuffix: true });
    
    return relativeTime;   
}