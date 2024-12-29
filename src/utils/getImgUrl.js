function getImgUrl (name) {
    return new URL(`../assets/${name}.jpg`, import.meta.url)
}

export {getImgUrl}