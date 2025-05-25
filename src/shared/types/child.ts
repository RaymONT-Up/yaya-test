export interface IParent {
  id: number
  phone: string
}
export interface Child {
  id: number
  first_name: string
  last_name: string
  birthday: string
  parent?: IParent
}
