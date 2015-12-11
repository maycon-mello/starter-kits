var data = [];
export class Contact {
  constructor(id, name, age) {
    this.id = id.toString();
    this.name = name;
    this.age = age;
  }
}

data.push(new Contact(1, 'carlão', 25));
data.push(new Contact(2, 'catarina', 28));
data.push(new Contact(3, 'cabrita', 18));
data.push(new Contact(4, 'carla', 19));


function  canPushIt(contact, args) {
  if (args.id && contact.id !== args.id) {
    return false;
  }
  if (args.name && contact.name.indexOf(args.name) < 0) {
    return false;
  }
  if (args.age && contact.age !== args.age) {
    return false;
  }
  return true;
}

export  function findContact(args) {
  console.log("findContact called with these args: ");
  console.log(args);
  console.log("===========================");

  let result = [];
  data.forEach(function(contact) {
    if(canPushIt(contact, args)) {
      result.push(contact);
    }
  });
  return result;
}

export function getContact(id) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      return data[i];
    }
  }
}
