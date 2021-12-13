export default function currencyFilter(value, currency = 'NOK') {
    return new Intl.NumberFormat('en', {
        style: 'currency',
        currency
    }).format(value)
}