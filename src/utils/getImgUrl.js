function getImgUrl(name) {
    if (name && (name.startsWith('http://') || name.startsWith('https://'))) {
        return name;
    }

    return `/books/${name}`;
}

export { getImgUrl }