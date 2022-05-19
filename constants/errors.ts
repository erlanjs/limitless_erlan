

interface ErrorsType {
    [key: string]: string;
}

export const ERRORS: ErrorsType = {
    'ERROR_500': 'Some Error happened on server',
    'LOGIN_USER_404': 'User does not exist',
    'WRONG_PASSWORD': 'Wrong password',
    'EMAIL_NOT_SET': 'User doesnt set email'
}

export const RESET_PASSWORD_ERRORS: ErrorsType = {
    'NOT_FOUND': 'User not found',
    'EXPIRED': 'Время восстановления уже прошло'
}