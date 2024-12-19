import { getHostCstrSync, isDefined, whenDefined } from "./DEFINED";
export function isReady(elem) {
    if (!isDefined(elem))
        return false;
    const hostCstr = getHostCstrSync(elem);
    return hostCstr.isDepsResolved;
}
export async function whenReady(elem) {
    const hostCstr = await whenDefined(elem);
    await hostCstr.whenDepsResolved;
    return hostCstr.Controler;
}
export function getControlerCstr(elem) {
    // we can't force a ready.
    return whenReady(elem);
}
export function getControlerCstrSync(elem) {
    if (!isReady(elem))
        throw new Error("Element not ready !");
    return getHostCstrSync(elem).Controler;
}
//# sourceMappingURL=READY.js.map