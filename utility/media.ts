export const media = (min:number, max:number) => {
    return `calc(${min}px + ${max - min} * ((100vw - 320px) / (1280 - 320)))`;
}