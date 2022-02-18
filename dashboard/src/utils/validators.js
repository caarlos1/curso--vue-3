/**
 * @param {string} value
 * @returns {string | boolean}
 */
export const validateEmptyAndLength3 = (value) => {
  if (!value) return '*Este campo é obrigatório'

  if (value.length < 3) {
    return '*O mínimo de caractéres desse campo é 3.'
  }

  return true
}

/**
 * @param {string} value
 * @returns {string | boolean}
 */
export const validateEmptyAndEmail = (value) => {
  if (!value) return '*Este campo é obrigatório'

  const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi

  if (!regex.test(value)) {
    return '* Por favor, digite um e-mail válido.'
  }

  return true
}
