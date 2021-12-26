function inputdefault(val, defval) {
    return isNaN(parseFloat(val)) ? defval : parseFloat(val);
}