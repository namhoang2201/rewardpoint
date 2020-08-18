export const saveGiftCardInfo = (name, value) => {
    if(!window.bbsGiftCardInfo) {
        window.bbsGiftCardInfo = {}
    }

    window.bbsGiftCardInfo[name] = value
}   