import M from "materialize-css";

export default {
    bind(el, {value}) {
        M.Tooltip.init(el, {html: value}, null)
    },
    unbind(el) {
        const tooltip = M.Tooltip.getInstance(el)
        if (tooltip && tooltip.destroy) {
            tooltip.destroy()
        }
    }
}
