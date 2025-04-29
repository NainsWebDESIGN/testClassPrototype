class testItem {
    forLoop(callback) {
        this.data.forEach((item, index, array) => {
            callback(item, index, array);
        });
    }
}
