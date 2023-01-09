// Sleep for a given amount of ms.
export async function sleep(ms) {
    const time_at_start = Date.now();
    await sleep_promise(ms);
    return Date.now() - time_at_start;
}

function sleep_promise(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
