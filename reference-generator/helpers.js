module.exports = {
  'json-schema--datatype': dataType,
  ifOneOfRequires: function(array, object, options) {
    if (array) {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (element.required) {
                if (element.required.indexOf(object) >= 0) {
                    return options.fn(this)
                }
            } 
        }
    }
    return options.inverse(this)
  },
 }

/**
 * Returns a descriptive string for a datatype
 * @param value
 * @returns {String} a string like <code>string[]</code> or <code>object[][]</code>
 */
function dataType(value) {
  if (!value) return null
  if (value.anyOf || value.allOf) {
    return ''
  }
  if (!value.type) {
    return 'object'
  }
  if (value.type === 'array') {
    return dataType(value.items || {}) + '[]'
  }
  return value.type
}