export const calculateDiff = (original: Record<string, any>, current: Record<string, any>): Record<string, any> => {
    const diff: Record<string, any> = {};
    Object.keys(original).forEach(key => {
        if (key !== 'createdAt' && key !== 'updatedAt' && original[key] !== current[key]) {
            diff[key] = { original: original[key], current: current[key] };
        }
    });
    return diff;
};
