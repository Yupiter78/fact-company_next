export function isOutdated(date) {
    console.log(
        `${Date.now() - date} > ${10 * 60 * 1000}:`,
        Date.now() - date > 10 * 60 * 1000
    );
    return Date.now() - date > 10 * 60 * 1000;
}
