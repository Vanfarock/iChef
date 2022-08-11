class User {
  name: string

  constructor(name: string) {
    this.name = name
  }
}

test('it should be ok', () => {
  const user = new User('test')

  expect(user.name).toEqual('test')
})
