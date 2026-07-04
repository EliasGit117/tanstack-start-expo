export interface User {
  id: string
  name: string
  email: string
  role: string
  bio: string
}

// Static demo data shared by the list and detail screens on every platform.
export const USERS: User[] = [
  {
    id: '1',
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    role: 'Engineer',
    bio: 'Wrote the first algorithm intended to be carried out by a machine.',
  },
  {
    id: '2',
    name: 'Grace Hopper',
    email: 'grace@example.com',
    role: 'Admiral',
    bio: 'Invented one of the first compilers and popularized machine-independent languages.',
  },
  {
    id: '3',
    name: 'Alan Turing',
    email: 'alan@example.com',
    role: 'Mathematician',
    bio: 'Formalized the concepts of algorithm and computation with the Turing machine.',
  },
  {
    id: '4',
    name: 'Margaret Hamilton',
    email: 'margaret@example.com',
    role: 'Director',
    bio: 'Led the team that wrote the onboard flight software for the Apollo missions.',
  },
]

export function getUser(id: string): User | undefined {
  return USERS.find((u) => u.id === id)
}
