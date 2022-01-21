function fileloader(element, res) {
    if (element instanceof HTMLInputElement) {
        const file = element.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsText(file, 'UTF-8');
            reader.onload = function (txt) {
                res(txt.target.result);
            }
        }
    }
}