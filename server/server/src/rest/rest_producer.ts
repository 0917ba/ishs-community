const STATUS_CODE = {
    200: 'OK',
    201: 'Created',

    403: 'Forbidden',
    400: 'Bad Request',
    404: 'Not Found',

    500: 'Internal Server Error'
}

function respRest(status: number, content: Object) {
    return {
        status: status,
        message: STATUS_CODE[status as keyof typeof STATUS_CODE],
        content: content
    }
}
function crespRest(status: number) {
    return {
        status: status,
        message: STATUS_CODE[status as keyof typeof STATUS_CODE],
    }
}

export { respRest, crespRest };