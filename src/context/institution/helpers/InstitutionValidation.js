
export const validateRequired = (value) => {
    return value.trim() === "" ? "Este campo é obrigatório." : ""
}
  