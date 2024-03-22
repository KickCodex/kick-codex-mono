export const calculateDiff = (original: Record<string, any>, current: Record<string, any>): Record<string, any> => {
    console.log({ original, current });
    const diff: Record<string, any> = {};
    for (const key in original) {
        if (key !== 'createdAt' && key !== 'updatedAt' && original[key] !== current[key]) {
            diff[key] = { original: original[key], current: current[key] };
        }
    }
    return diff;
};
