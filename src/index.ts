const inquirer = require("inquirer");
const consola = require("consola");

enum Action {
  ADD = "add",
  REMOVE = "remove",
  QUIT = "quit",
  LIST = "list",
}

enum Variant {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
}

type inquirerAnswers = {
  action: Action;
};

class Message {
  constructor(private content: string) {}
  public show() {
    console.log(this.content);
  }
  public capitalize() {
    const upperText: string =
      this.content.charAt(0).toUpperCase() + this.content.slice(1);
    console.log(upperText);
  }
  public toUpperCase() {
    console.log(this.content.toUpperCase());
  }
  public toLowerCase() {
    console.log(this.content.toLowerCase());
  }
  static showColorized(options: Variant, text: string) {
    if (options === Variant.SUCCESS) {
      consola.success(text);
    } else if (options === Variant.ERROR) {
      consola.error(text);
    } else if (options === Variant.INFO) {
      consola.info(text);
    }
  }
}
interface User {
  name: string;
  age: number;
}

class UsersData implements User {
  name: string;
  age: number;
  data: User[] = [];

  showAll() {
    Message.showColorized(Variant.INFO, "Users data:");
    if (this.data.length > 0) {
      console.table(this.data);
    } else {
      Message.showColorized(Variant.ERROR, "No data...");
    }
  }
  add(obj: User) {
    if (
      typeof obj.name === "string" &&
      typeof obj.age === "number" &&
      obj.name.length > 0 &&
      obj.age > 0
    ) {
      this.data.push(obj);
      Message.showColorized(Variant.SUCCESS, "User added!");
    } else {
      Message.showColorized(Variant.ERROR, "Invalid data...");
    }
  }
  remove(userName: string) {
    if (typeof userName === "string" && userName.length > 0) {
      this.data = this.data.filter((user) => user.name !== userName);
      Message.showColorized(Variant.SUCCESS, "User removed!");
    } else {
      Message.showColorized(Variant.ERROR, "User not found...");
    }
  }
}

const startApp = () => {
  inquirer
    .prompt([
      {
        name: "action",
        type: "input",
        message: "How can I help you?",
      },
    ])
    .then(async (answers: inquirerAnswers) => {
      switch (answers.action) {
        case Action.LIST:
          users.showAll();
          break;
        case Action.ADD:
          const user = await inquirer.prompt([
            {
              name: "name",
              type: "input",
              message: "Enter name",
            },
            {
              name: "age",
              type: "number",
              message: "Enter age",
            },
          ]);
          users.add(user);
          break;
        case Action.REMOVE:
          const name = await inquirer.prompt([
            {
              name: "name",
              type: "input",
              message: "Enter name",
            },
          ]);
          users.remove(name.name);
          break;
        case Action.QUIT:
          Message.showColorized(Variant.INFO, "Bye bye!");
          return;
        default:
          Message.showColorized(Variant.ERROR, "Not found command...");
      }

      startApp();
    });
};

const msg = new Message("heLlo world!");
const users = new UsersData();
console.log("\n");
console.info("???? Welcome to the UsersApp!");
console.log("====================================");
Message.showColorized(Variant.INFO, "Available actions");
console.log("\n");
console.log("list – show all users");
console.log("add – add new user to the list");
console.log("remove – remove user from the list");
console.log("quit – quit the app");
console.log("\n");
startApp();
