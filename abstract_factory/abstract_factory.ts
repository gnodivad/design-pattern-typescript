// Abstract Product
interface Button {
  paint(): void;
}

interface Checkbox {
  paint(): void;
}

// Concrete Product
class MacButton implements Button {
  paint(): void {
    console.log('You have created Mac variant button.');
  }
}

class WindowButton implements Button {
  paint(): void {
    console.log('You have created Window variant button.');
  }
}

class MacCheckbox implements Checkbox {
  paint(): void {
    console.log('You have created Mac variant checkbox.');
  }
}

class WindowCheckbox implements Checkbox {
  paint(): void {
    console.log('You have created Window variant checkbox.');
  }
}

// Abstract Factory
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// Concrete Factory
class MacGUIFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton();
  }

  createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}

class WindowGUIFactory implements GUIFactory {
  createButton(): Button {
    return new WindowButton();
  }

  createCheckbox(): Checkbox {
    return new WindowCheckbox();
  }
}

// Client
class Application {
  private button: Button;
  private checkbox: Checkbox;

  constructor(factory: GUIFactory) {
    this.button = factory.createButton();
    this.checkbox = factory.createCheckbox();
  }

  paint(): void {
    this.button.paint();
    this.checkbox.paint();
  }
}

let osEnvironment = ['mac', 'window'][Math.floor(Math.random() * 2)];
let application: Application;
if (osEnvironment === 'mac') {
  application = new Application(new MacGUIFactory());
} else {
  application = new Application(new WindowGUIFactory());
}
application.paint();
