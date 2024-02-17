export const newagestar = async (newstar,oldavg,oldcount) => {
    return (newstar + (oldavg * oldcount)) / (oldcount + 1);
};