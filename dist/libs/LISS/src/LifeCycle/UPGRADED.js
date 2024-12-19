import { getHostCstrSync, isDefined, whenDefined } from "./DEFINED";
//TODO: upgrade function...
export function isUpgraded(elem) {
    if (!isDefined(elem))
        return false;
    const Host = getHostCstrSync(elem);
    return elem instanceof Host;
}
export async function whenUpgraded(elem) {
    const Host = await whenDefined(elem);
    // already upgraded
    if (elem instanceof Host)
        return elem;
    // h4ck
    if ("_whenUpgraded" in elem) {
        await elem._whenUpgraded;
        return elem;
    }
    const { promise, resolve } = Promise.withResolvers();
    elem._whenUpgraded = promise;
    elem._whenUpgradedResolve = resolve;
    await promise;
    return elem;
}
export async function getHost(elem) {
    await whenDefined(elem);
    if (elem.ownerDocument !== document)
        document.adoptNode(elem);
    customElements.upgrade(elem);
    return elem;
}
export function getHostSync(elem) {
    if (!isDefined(elem))
        throw new Error("Element not defined !");
    if (elem.ownerDocument !== document)
        document.adoptNode(elem);
    customElements.upgrade(elem);
    return elem;
}
export const upgrade = getHost;
export const upgradeSync = getHostSync;
//# sourceMappingURL=UPGRADED.js.map