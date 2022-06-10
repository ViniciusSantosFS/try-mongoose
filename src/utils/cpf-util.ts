class Cpf {
  private cpf
  constructor(cpf: string) {
    this.cpf = cpf
  }

  isValid() {
    const justNumbers = this.cpf.replace(/\D+/g, '')
    if (justNumbers.length !== 11) return false
    if (this.isSequence(justNumbers)) return false

    const partialCpf = justNumbers.slice(0, -2)
    const digit1 = this.generateDigit(partialCpf)
    const digit2 = this.generateDigit(digit1)

    const newCpf = partialCpf + digit1 + digit2
    return newCpf === justNumbers
  }

  private generateDigit(partialCpf: string) {
    const cpfArrayParse = Array.from(partialCpf)
    let regressive = cpfArrayParse.length + 1

    const total = cpfArrayParse.reduce((acc, value) => {
      acc += regressive * Number(value)
      regressive--
      return acc
    }, 0)

    const digit = 11 - (total % 11)
    return digit > 9 ? '0' : String(digit)
  }

  private isSequence(justCpfNumbers: string) {
    return justCpfNumbers[0].repeat(justCpfNumbers.length) === justCpfNumbers
  }
}

export { Cpf }
