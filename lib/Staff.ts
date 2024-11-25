export function isStaff(id: string | undefined): boolean {
    if (!id) {
        return false
    }
    
    return staffIDs.includes(id);
}

export const staffIDs = [
    "952777630078341121",
    "645181493844377611"
];