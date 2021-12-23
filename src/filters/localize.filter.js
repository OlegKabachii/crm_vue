import store from '../store'
import en from '../locales/en.json'
import nok from '../locales/nok.json'

const locales = {
    'en-En': en,
    'nok-Nok': nok
}

export default function localizeFilter(key) {
    const locale = store.getters.info.locale || 'en-En'
    return locales[locale][key] || `[Localize error]: key ${key} not found`
}
