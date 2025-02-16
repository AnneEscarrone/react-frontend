
export const validateRequired = (value) => {
    return value.trim() === "" ? "Este campo é obrigatório." : ""
}
  
  export const validateDate = (selectedDate) => {
    const today = new Date().toISOString().split("T")[0]
    if (!selectedDate) return "A data é obrigatória."
    if (selectedDate < today) return "A data não pode ser no passado."
    return ""
}
  
  export const validateEndDate = (startDate, endDate) => {
    if (!endDate) return "A data final é obrigatória."
    if (endDate < startDate) return "A data final deve ser posterior à inicial."
    return ""
}
  