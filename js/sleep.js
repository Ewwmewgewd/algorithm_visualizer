// Sleep for a given amount of ms.
export async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
