export class TJElement {
  private readonly _attributes: Map<string, string> = new Map<string, string>();

  private _type: string = "";

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  public setAttribute(name: string, value: string): void {
    this._attributes.set(name, value);
  }

  public getAttribute(name: string): string | undefined {
    return this._attributes.get(name);
  }

  getHtml(): HTMLElement {
    const element = document.createElement(this.type);
    for (const [key, value] of this._attributes) {
      if (key === "textNode" && value !== "") {
        element.appendChild(document.createTextNode(value));
      } else {
        element.setAttribute(key, value);
      }
    }
    return element;
  }
}

export interface TJElementBuilder {
  build: () => TJElement;
}

export class DivBuilder implements TJElementBuilder {
  private readonly _element: TJElement = new TJElement();

  constructor(id: string = "", className: string = "") {
    this._element.type = "div";
    this._element.setAttribute("id", id);
    this._element.setAttribute("class", className);
  }

  build(): TJElement {
    return this._element;
  }
}

export class SpanBuilder implements TJElementBuilder {
  private readonly _element: TJElement = new TJElement();

  constructor(id: string = "", className: string = "", text: string = "") {
    this._element.type = "span";
    this._element.setAttribute("id", id);
    this._element.setAttribute("class", className);
    this._element.setAttribute("textNode", text);
  }

  build(): TJElement {
    return this._element;
  }
}

export class LinkBuilder implements TJElementBuilder {
  private readonly _element: TJElement = new TJElement();

  constructor(
    id: string = "",
    className: string = "",
    link: string = "",
    target: string = "_blank",
    text: string = ""
  ) {
    this._element.type = "a";
    this._element.setAttribute("id", id);
    this._element.setAttribute("class", className);
    this._element.setAttribute("href", link);
    this._element.setAttribute("textNode", text);
    this._element.setAttribute("target", target);
  }

  build(): TJElement {
    return this._element;
  }
}

export class ImageBuilder implements TJElementBuilder {
  private readonly _element: TJElement = new TJElement();

  constructor(
    id: string = "",
    className: string = "",
    image: string = "",
    alt: string = ""
  ) {
    this._element.type = "img";
    this._element.setAttribute("id", id);
    this._element.setAttribute("class", className);
    this._element.setAttribute("alt", alt);
    const img = new Image();
    img.src = image;
    this._element.setAttribute("src", img.src);
  }

  build(): TJElement {
    return this._element;
  }
}
