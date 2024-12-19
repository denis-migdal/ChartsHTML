import { isUpgraded, upgrade, upgradeSync, whenUpgraded } from "./UPGRADED";
import { isReady, whenReady } from "./READY";
export function isInitialized(elem) {
    if (!isUpgraded(elem))
        return false;
    return elem.isInitialized;
}
export async function whenInitialized(elem) {
    const host = await whenUpgraded(elem);
    return await host.whenInitialized;
}
export async function getControler(elem) {
    const host = await upgrade(elem);
    await whenReady(host);
    //TODO: initializeSync vs initialize ?
    if (!host.isInitialized)
        return host.initialize();
    return host.controler;
}
export function getControlerSync(elem) {
    const host = upgradeSync(elem);
    if (!isReady(host))
        throw new Error("Dependancies not ready !");
    if (!host.isInitialized)
        return host.initialize();
    return host.controler;
}
export const initialize = getControler;
export const initializeSync = getControlerSync;
//# sourceMappingURL=INITIALIZED.js.map