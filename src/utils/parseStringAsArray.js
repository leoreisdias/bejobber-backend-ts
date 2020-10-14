module.exports = function parseStringAsArray(string) {
    return string.split(',').map(service => service.trim());
}