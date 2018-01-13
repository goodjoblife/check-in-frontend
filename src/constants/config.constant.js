let tmpStr = process.env.REACT_APP_API_ENDPOINT || 'https://test3.markchen.space';
if (tmpStr.charAt(tmpStr.length - 1) === '/') {
    tmpStr = tmpStr.slice(0, tmpStr.length - 1);
}
export const apiEndpoint = tmpStr;
export const botMessengerUrl = process.env.REACT_APP_BOT_MESSENGER_URL || 'https://www.messenger.com/t/check.in.machine.test';
