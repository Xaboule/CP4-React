const todos = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    done: false,
  },
  {
    id: 2,
    title: "Nemo laboriosam earum officia aliquid repudiandae",
    done: true,
  },
  {
    id: 3,
    title:
      "Mollitia, saepe expedita a exercitationem explicabo reiciendis officia eligendi?",
    done: true,
  },
  {
    id: 4,
    title:
      "Officia, alias animi tempore ex similique incidunt provident quam at libero.",
    done: false,
  },
];

export function findAll() {
  return todos;
}

export function findById(id) {
  return todos.find((todo) => todo.id === parseInt(id, 10));
}
