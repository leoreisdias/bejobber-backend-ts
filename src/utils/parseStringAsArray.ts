export default function parseStringAsArray(string: any) {
    return string.split(',').map((service: any) => service.trim());
}