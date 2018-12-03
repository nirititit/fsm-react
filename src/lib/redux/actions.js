export const SET_USER = "SET_USER";
export function setUser(username){
  return {
    type: SET_USER,
    username
  }
}

export const SET_PERSONS = "SET_PERSONS";
export function setPersons(persons){
  return {
    type: SET_PERSONS,
    persons
  }
}
