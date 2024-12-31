function getImgUrl (name) {
    return new URL(`../assets/${name}.png`, import.meta.url)
}

export {getImgUrl}