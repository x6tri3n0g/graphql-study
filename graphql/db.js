export const people = [
    {
        id: '0',
        name: 'hyun',
        age: 27,
        gender: 'male',
    },
    {
        id: '1',
        name: 'young',
        age: 25,
        gender: 'female',
    },
    {
        id: '2',
        name: 'kidong',
        age: 27,
        gender: 'male',
    },
    {
        id: '3',
        name: 'sungyun',
        age: 27,
        gender: 'male',
    },
    {
        id: '4',
        name: 'hijin',
        age: 24,
        gender: 'female',
    },
    {
        id: '5',
        name: 'minki',
        age: 26,
        gender: 'male',
    },
];

export const getById = (id) => {
    const filteredPeople = people.filter((person) => person.id === String(id));
    return filteredPeople[0];
};
