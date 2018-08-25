const initialState = {};

if (localStorage.length > 0) {
    for (let i = 0, len = localStorage.length; i < len; i += 1) {
        let str = localStorage.key(i).match(/\w+/g)[1];
        if (str === 'found') {
            initialState[str] = '';
        } else {
            initialState[str] = JSON.parse(localStorage.getItem(localStorage.key(i)));
        }
    }
}

export default initialState;
