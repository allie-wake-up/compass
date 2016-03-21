'use strict';

import Random from './utils/Random.js';

window.copyPassword = copyPassword;
window.getPassword = getPassword;
window.savePassword = savePassword;

let password = "";
let masterTimeout = null;
let copyTimeout = null;

function copy(txt) {
    const clipboard = document.createElement('textarea');
    clipboard.value = txt;
    document.body.appendChild(clipboard);
    clipboard.select();
    document.execCommand('cut');
    document.body.removeChild(clipboard);
}

function copyPassword(txt) {
    if (copyTimeout) {
        window.clearTimeout(copyTimeout);
    }
    copy(txt);
    copyTimeout = window.setTimeout(() => {
        copyTimeout = null;
        copy(Random.generateString());
    }, 30 * 1000);
}

function getPassword() {
    if (masterTimeout) {
        window.clearTimeout(masterTimeout);
        startTimeout();
    }
    return password;
}

function savePassword(_password) {
    password = _password;
    startTimeout();
}

function startTimeout() {
    masterTimeout = window.setTimeout(() => {
        password = "";
        masterTimeout = null;
    }, 60 * 1000);
}
